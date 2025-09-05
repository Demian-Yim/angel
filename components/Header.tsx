import React from 'react';
import type { Section } from '../types.ts';

interface HeaderProps {
  sections: Section[];
  activeSection: string;
  onNavClick: (sectionId: string) => void;
  innerRef: React.Ref<HTMLElement>;
}

const Header = ({ sections, activeSection, onNavClick, innerRef }: HeaderProps) => {
  return (
    <header 
      ref={innerRef}
      className="sticky top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl shadow-sm transition-all duration-300"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
             <a href="#hero" onClick={(e) => { e.preventDefault(); onNavClick('hero'); }} className="font-handwriting text-4xl bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-rose-500 font-bold">
              For My Angel
            </a>
          </div>
          <nav className="hidden md:flex md:items-center md:space-x-2 lg:space-x-6">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => onNavClick(section.id)}
                className={`relative px-3 py-2 text-lg font-medium transition-colors duration-300 group ${
                  activeSection === section.id
                    ? 'text-pink-600'
                    : 'text-gray-600 hover:text-pink-500'
                }`}
              >
                {section.navTitle}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out ${activeSection === section.id ? 'scale-x-100' : ''}`}></span>
              </button>
            ))}
             <a 
              href="https://x.gd/Ctoxq" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-5 py-2 text-base font-bold text-white bg-gradient-to-r from-pink-500 to-rose-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              마음확장 가이드
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;