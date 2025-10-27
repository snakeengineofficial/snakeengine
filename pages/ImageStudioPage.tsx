import React, { useState } from 'react';
import { generateImageFromPrompt } from '../services/geminiService';
import { AiStudioIcon } from '../components/Icons'; // Reusing an icon for visual flair

const ImageStudioPage: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim()) {
            setError("Please enter a prompt to generate an image.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setImageUrl(null);

        try {
            const url = await generateImageFromPrompt(prompt);
            setImageUrl(url);
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="flex flex-col w-full h-full bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg shadow-slate-300/30 overflow-hidden">
            <header className="p-4 border-b border-gray-200/80 bg-white/50 flex-shrink-0">
                <h1 className="text-lg font-semibold text-gray-800">Image Generation Studio</h1>
                <p className="text-sm text-gray-500">Create stunning visuals with AI.</p>
            </header>
            
            <div className="flex-1 flex flex-col p-4 md:p-6 overflow-y-auto">
                {/* Image Display Area */}
                <div className="flex-1 flex items-center justify-center bg-slate-100 rounded-xl mb-6 relative aspect-square">
                    {isLoading && (
                         <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center rounded-xl z-10">
                            <div className="w-12 h-12 border-4 border-t-blue-500 border-white rounded-full animate-spin"></div>
                            <p className="mt-4 text-white font-medium">Generating your vision...</p>
                        </div>
                    )}
                    {error && (
                        <div className="text-center text-red-600 p-4">
                            <p className="font-semibold">Generation Failed</p>
                            <p className="text-sm">{error}</p>
                        </div>
                    )}
                    {!isLoading && imageUrl && (
                        <img src={imageUrl} alt={prompt} className="w-full h-full object-contain rounded-xl" />
                    )}
                    {!isLoading && !imageUrl && !error && (
                        <div className="text-center text-gray-500">
                             <AiStudioIcon className="w-16 h-16 mx-auto text-gray-400" />
                             <p className="mt-2">Your generated image will appear here.</p>
                             <p className="text-xs text-gray-400">Enter a prompt below to get started.</p>
                        </div>
                    )}
                </div>

                {/* Prompt Input Area */}
                <form onSubmit={handleGenerate} className="flex-shrink-0">
                    <div className="relative">
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="e.g., A majestic lion wearing a crown, photorealistic"
                            className="w-full p-3 pr-32 text-sm text-gray-800 bg-gray-100 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                            rows={2}
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !prompt.trim()}
                            className="absolute top-1/2 right-2 transform -translate-y-1/2 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 bg-blue-500 rounded-md disabled:bg-gray-400 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            aria-label="Generate image"
                        >
                            {isLoading ? 'Generating...' : 'Generate'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ImageStudioPage;
