import React from "react";

import background from "../assets/background.jpg";

export default function BackgroundImage({ children }) {
    return (
        <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden px-2">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-70"
                style={{ backgroundImage: `url(${background})` }}
            />
            {/* Blur Overlay */}
            <div className="absolute inset-0 backdrop-blur-sm" />

            {/* Foreground Content */}
            <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden px-2">
                {children}
            </div>
        </div>
    );
}
