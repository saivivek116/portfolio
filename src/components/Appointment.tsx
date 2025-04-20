 
"use client";

import { useState } from 'react';

interface AppointmentButtonProps {
    className?: string;
}

const AppointmentButton = ({ className = '' }: AppointmentButtonProps) => {
    const [showCalendly, setShowCalendly] = useState(false);

    return (
        <>
            {!showCalendly ? (
                <button
                    onClick={() => setShowCalendly(true)}
                    className={`w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg 
                    transition-colors duration-300 flex items-center justify-center ${className}`}
                >
                    <span className="mr-2">Book a Meeting</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                </button>
            ) : (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg w-full max-w-4xl h-[80vh] relative">
                        <button
                            onClick={() => setShowCalendly(false)}
                            className="absolute top-2 right-2 z-10 bg-white rounded-full p-1 shadow-md"
                            aria-label="Close calendar"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>

                        {/* Direct iframe embed instead of using Calendly's JS API */}
                        <iframe
                            src="https://calendly.com/saivivek116/meetup"
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            title="Schedule appointment"
                            allow="fullscreen; camera; microphone; autoplay; encrypted-media; picture-in-picture"
                            style={{ borderRadius: '8px' }}
                        ></iframe>
                    </div>
                </div>
            )}
        </>
    );
};

export default AppointmentButton;