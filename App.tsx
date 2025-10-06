import React, { useState, useCallback } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { ResultDisplay } from './components/ResultDisplay';
import { generateTryOnImage } from './services/geminiService';
import type { ImageData } from './types';

const fileToImageData = (file: File): Promise<ImageData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      // Gemini API expects the raw base64 string, not the data URL
      const base64 = dataUrl.split(',')[1];
      resolve({
        base64,
        mimeType: file.type,
        dataUrl,
      });
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

const Header: React.FC = () => (
    <header className="text-center py-6 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-cyan-300">
                AI Virtual Try-On
            </span>
        </h1>
        <p className="mt-2 text-slate-400 max-w-2xl mx-auto">
            Upload a photo of yourself and a garment to see how it looks on you, powered by Gemini.
        </p>
    </header>
);

const App: React.FC = () => {
    const [userImage, setUserImage] = useState<ImageData | null>(null);
    const [garmentImage, setGarmentImage] = useState<ImageData | null>(null);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleImageSelect = useCallback(async (file: File, type: 'user' | 'garment') => {
        try {
            const imageData = await fileToImageData(file);
            if (type === 'user') {
                setUserImage(imageData);
            } else {
                setGarmentImage(imageData);
            }
        } catch (err) {
            setError('Failed to read the selected file.');
            console.error(err);
        }
    }, []);
    
    const handleGenerate = useCallback(async () => {
        if (!userImage || !garmentImage) {
            setError('Please upload both a person and a garment image.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setGeneratedImage(null);

        try {
            const result = await generateTryOnImage(userImage, garmentImage);
            setGeneratedImage(result);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : String(err);
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }, [userImage, garmentImage]);

    const isGenerateDisabled = !userImage || !garmentImage || isLoading;

    return (
        <div className="min-h-screen flex flex-col p-4 md:p-8">
            <Header />
            
            <main className="flex-1 flex flex-col md:flex-row gap-6 md:gap-8 justify-center items-stretch">
                <div className="w-full md:w-2/3 flex flex-col md:flex-row gap-6 md:gap-8">
                    <ImageUploader 
                        title="1. Upload Your Photo"
                        iconType="user"
                        onImageSelect={(file) => handleImageSelect(file, 'user')}
                        imageDataUrl={userImage?.dataUrl ?? null}
                        onClear={() => setUserImage(null)}
                    />
                    <ImageUploader 
                        title="2. Upload Garment"
                        iconType="garment"
                        onImageSelect={(file) => handleImageSelect(file, 'garment')}
                        imageDataUrl={garmentImage?.dataUrl ?? null}
                        onClear={() => setGarmentImage(null)}
                    />
                </div>
                
                <ResultDisplay 
                    isLoading={isLoading}
                    generatedImage={generatedImage}
                />
            </main>

            <footer className="py-6 mt-6 text-center">
                 {error && (
                    <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg relative max-w-3xl mx-auto mb-4" role="alert">
                        <strong className="font-bold">Error: </strong>
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}
                <button
                    onClick={handleGenerate}
                    disabled={isGenerateDisabled}
                    className="px-10 py-4 font-bold text-lg text-white rounded-full bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-300 shadow-lg shadow-cyan-600/30 transform hover:scale-105"
                >
                    {isLoading ? 'Generating...' : 'Generate Try-On'}
                </button>
            </footer>
        </div>
    );
};

export default App;
