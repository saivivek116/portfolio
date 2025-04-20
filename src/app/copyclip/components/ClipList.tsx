import { useMemo, useState } from "react";


// Simple URL validation function
const isValidUrl = (string: string) => {
    if (typeof string !== 'string') return false;
    try {
        const url = new URL(string);
        // Check if it starts with http:// or https:// for basic web URL validation
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (err) {
        console.log(err);
        return false;
    }
};

interface Clip {
    id: string;
    content: string;
}

interface ClipsListProps {
    clips: Clip[];
    handleDeleteClip: (id: string) => void;
}

const ClipsList = ({ clips, handleDeleteClip }: ClipsListProps) => {
    const [copiedIndex, setCopiedIndex] = useState(-1);

    const copyToClipboard = (text: string, index: number) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                console.log('Copied:', text);
                setCopiedIndex(index);
                setTimeout(() => setCopiedIndex(-1), 1500); // Reset after 1.5s
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
                // Handle error (e.g., show an error message)
            });
    };

    const clip_items = useMemo(() => {
        return clips.map((clip, index) => {
            const isUrl = isValidUrl(clip.content); // Check if the clip is a URL
            return (
                <div
                    key={clip.id}
                    className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md hover:bg-yellow-100 dark:hover:bg-gray-700 transition-all duration-200"
                >
                    {/* Content Area (Text) */}
                    <div className="flex-grow mr-4 min-w-0">
                        <p
                            className="text-gray-800 dark:text-gray-200 break-words cursor-pointer truncate"
                            title={clip.content}
                            onClick={() => copyToClipboard(clip.content, index)}
                        >
                            {clip.content}
                        </p>
                    </div>

                    {/* Action Buttons Area */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                        {/* Copy Button */}
                        <button
                            onClick={() => copyToClipboard(clip.content, index)}
                            className={`px-4 py-1 rounded text-sm transition duration-150 ease-in-out ${copiedIndex === index
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500'
                                }`}
                        >
                            {copiedIndex === index ? 'Copied!' : 'Copy'}
                        </button>

                        {/* Open URL Button (Conditional) */}
                        {isUrl && (
                            <button
                                onClick={() => window.open(clip.content, '_blank', 'noopener,noreferrer')}
                                className="px-3 py-1 bg-sky-500 text-white rounded text-sm hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-1 dark:focus:ring-offset-gray-800 flex items-center justify-center"
                                title="Open link in new tab"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                </svg>
                            </button>
                        )}

                        {/* Delete Button */}
                        <button
                            onClick={() => handleDeleteClip(clip.id)}
                            className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1 dark:focus:ring-offset-gray-800"
                            title="Delete clip"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            );
        });
    }, [clips]);

    return clip_items;
}

export default ClipsList;