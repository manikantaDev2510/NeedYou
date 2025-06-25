import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="border-t bg-white text-gray-700">
            <div className="container mx-auto px-4 py-6 flex flex-col items-center gap-4 lg:flex-row lg:justify-between">
                {/* Copyright */}
                <p className="text-sm text-center lg:text-left">
                    © {new Date().getFullYear()} All Rights Reserved.
                </p>

                {/* Social Media Icons */}
                <div className="flex gap-5 text-2xl justify-center">
                    <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                        className="text-gray-600 hover:text-blue-600 transition"
                    >
                        <FaFacebook />
                    </a>
                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        className="text-gray-600 hover:text-pink-500 transition"
                    >
                        <FaInstagram />
                    </a>
                    <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="text-gray-600 hover:text-blue-700 transition"
                    >
                        <FaLinkedin />
                    </a>
                </div>
            </div>
        </footer>
    );
};