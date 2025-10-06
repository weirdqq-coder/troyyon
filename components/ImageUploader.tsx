import React, { useRef } from 'react';

interface IconProps {
    className?: string;
}

const UserIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
);

const GarmentIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        <path d="M6 3.75l4.5 6-4.5 6" transform="matrix(-1 0 0 1 22 0)"/>
        <path d="M6 3.75c0-1.5 1.5-2.25 3-2.25h6c1.5 0 3 .75 3 2.25" />
    </svg>
);


interface ImageUploaderProps {
  title: string;
  iconType: 'user' | 'garment';
  onImageSelect: (file: File) => void;
  imageDataUrl: string | null;
  onClear: () => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ title, iconType, onImageSelect, imageDataUrl, onClear }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };

  const Icon = iconType === 'user' ? UserIcon : GarmentIcon;

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl h-full space-y-4">
      <h2 className="text-xl font-bold text-cyan-300 tracking-wider">{title}</h2>
      <div className="relative w-full h-64 border-2 border-dashed border-slate-600 rounded-lg flex items-center justify-center group overflow-hidden">
        {imageDataUrl ? (
          <>
            <img src={imageDataUrl} alt={title} className="w-full h-full object-contain" />
            <button
              onClick={onClear}
              className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-500/80"
              aria-label="Clear image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </>
        ) : (
          <div className="text-center text-slate-500">
            <Icon className="h-16 w-16 mx-auto" />
            <p className="mt-2">Tap to upload</p>
          </div>
        )}
      </div>
       <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      <div className="flex space-x-4 w-full">
        <button onClick={() => fileInputRef.current?.click()} className="flex-1 text-center py-2 px-4 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
          From Gallery
        </button>
        <button onClick={() => {
          if(fileInputRef.current) {
            fileInputRef.current.setAttribute('capture', 'user');
            fileInputRef.current.click();
            fileInputRef.current.removeAttribute('capture');
          }
        }} className="flex-1 text-center py-2 px-4 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
          Use Camera
        </button>
      </div>
    </div>
  );
};
