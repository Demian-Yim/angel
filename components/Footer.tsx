import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-16 text-center">
      <div className="container mx-auto">
        <p className="font-handwriting text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-orange-500 mb-4">
          너의 빛나는 회복 여정과 모든 순간을<br/>사랑으로 응원하며
        </p>
        <p className="text-3xl font-handwriting mt-8 text-gray-700">From Demian</p>
        
        <div className="mt-12 flex justify-center">
          <img 
            src="https://i.imgur.com/5nUkV2z.jpeg" 
            alt="A final loving photo from Demian"
            className="max-w-xs w-full rounded-2xl shadow-xl shadow-rose-200/80 transform transition-transform duration-500 hover:scale-105"
          />
        </div>

        <p className="text-base mt-16 font-semibold text-rose-800/90">&copy; 2025. For my one and only angel.</p>
      </div>
    </footer>
  );
};

export default Footer;