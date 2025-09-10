import React, { ReactNode } from 'react';

interface ContentBlockProps {
  title: string;
  children: ReactNode;
  innerRef: React.Ref<HTMLElement>;
}

const ContentBlock = ({ title, children, innerRef }: ContentBlockProps) => {
  return (
    <section ref={innerRef} className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
           <h2 className="font-handwriting text-5xl md:text-6xl font-bold text-pink-700 inline-block">
            {title}
          </h2>
          <div className="mt-4 h-1 w-24 mx-auto bg-gradient-to-r from-pink-400 to-rose-400 rounded-full"></div>
        </div>
        
        <div className="bg-white/60 p-8 sm:p-10 rounded-2xl shadow-xl shadow-pink-100/70 text-gray-700 text-lg leading-relaxed space-y-6 backdrop-blur-sm">
          {children}
        </div>
      </div>
    </section>
  );
};

export default ContentBlock;