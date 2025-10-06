import React from 'react';

const LoadingSpinner: React.FC = () => (
  <div className="flex flex-col items-center justify-center space-y-4 text-center">
    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-cyan-400"></div>
    <p className="text-cyan-300 font-semibold tracking-wider text-lg">Generating Your Look...</p>
    <p className="text-sm text-slate-400 max-w-xs">
      Our AI is stitching together your virtual outfit. This can take a few moments.
    </p>
  </div>
);

const Placeholder: React.FC = () => (
    <div className="flex flex-col items-center justify-center space-y-4 text-slate-500 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="font-semibold">Your virtual try-on will appear here.</p>
    </div>
);

interface ResultDisplayProps {
  isLoading: boolean;
  generatedImage: string | null;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ isLoading, generatedImage }) => {
  return (
    <div className="w-full md:w-1/3 flex flex-col p-6 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl">
      <h2 className="text-xl font-bold text-cyan-300 tracking-wider mb-4 text-center">AI Generated Result</h2>
      <div className="flex-1 flex items-center justify-center bg-slate-900/50 rounded-lg overflow-hidden">
        {isLoading ? (
          <LoadingSpinner />
        ) : generatedImage ? (
          <img src={generatedImage} alt="AI Generated Try-On" className="w-full h-full object-contain" />
        ) : (
          <Placeholder />
        )}
      </div>
    </div>
  );
};
