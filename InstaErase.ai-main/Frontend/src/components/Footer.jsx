import React from 'react';
import { assets, FOOTER_CONSTANTS } from '../assets/assets';

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Logo + Name */}
        <div className="flex items-center gap-4">
          <img
            src={assets.logo}
            alt="logo"
            width={48}
            className="rounded-full border border-gray-200 shadow-sm"
          />
          <span className="text-xl font-bold text-gray-900 tracking-wide">
            Mrityunjay Gupta
          </span>
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-500 text-center md:text-left">
          &copy; {new Date().getFullYear()} InstaErase.ai. All rights reserved.
        </p>

        {/* Social Icons */}
        <div className="flex gap-5">
          {FOOTER_CONSTANTS.map((item, index) => (
            <a
              href={item.url}
              key={index}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full shadow hover:bg-gray-200 transition-transform transform hover:scale-110"
            >
              <img src={item.logo} alt={item.name || 'logo'} width={20} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
