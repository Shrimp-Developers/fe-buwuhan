import React from "react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-600 mb-2">404</h1>
                <p className="text-black mb-6">Page Not Found</p>
                <a href="/"
                   className="bg-gray-600 text-white font-bold px-6 py-3 rounded-lg hover:opacity-90 transition-all duration-200 inline-block"
                >
                    Go Back Home
                </a>
            </div>
        </div>
    )
};