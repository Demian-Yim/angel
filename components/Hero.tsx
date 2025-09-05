import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 pt-24 pb-12 overflow-hidden">
      
      <div className="relative w-full max-w-4xl flex items-center justify-center h-[500px] mb-12">
        {/* Image 1 */}
        <div 
          className="absolute z-10 w-60 h-80 sm:w-72 sm:h-96 md:w-80 md:h-[26rem] bg-white p-3 pb-8 rounded-xl shadow-2xl shadow-rose-200/80 transform -rotate-12 transition-all duration-500 hover:-rotate-6 hover:scale-105 animate-float"
          style={{ left: '10%', top: '5%' }}
        >
           <img 
            src="https://i.imgur.com/7n7k9TM.jpeg" 
            alt="Jae-yoon and Demian" 
            className="w-full h-full object-cover rounded-md"
          />
        </div>

        {/* Image 2 */}
        <div 
          className="absolute z-20 w-64 h-80 sm:w-80 sm:h-[25rem] md:w-96 md:h-[28rem] bg-white p-4 pb-10 rounded-xl shadow-2xl shadow-pink-300/80 transform rotate-6 transition-all duration-500 hover:rotate-2 hover:scale-105 animate-float" 
          style={{ animationDelay: '1s', right: '10%', bottom: '5%' }}
        >
          <img 
            src="https://i.imgur.com/QhZRqRJ.jpeg" 
            alt="Demian and Jae-yoon" 
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      </div>
      
      <div className="relative z-10 animate-fade-in animation-delay-400 mt-8">
        <h1 className="font-display text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-rose-500 mb-4">
          To My Dearest Angel, 재윤
        </h1>
        <p className="text-xl md:text-2xl text-rose-800/80 font-medium">
          너와 함께하는 모든 순간이 나의 가장 큰 예술이야.
        </p>
      </div>

       <div className="absolute bottom-10 text-2xl animate-bounce">
          <svg className="w-8 h-8 text-pink-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
    </section>
  );
};

export default Hero;