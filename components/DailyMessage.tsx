import React from 'react';
import { DAILY_MESSAGES } from '../messages.ts';

const getDayOfYear = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};

const DailyMessage: React.FC = () => {
  const dayOfYear = getDayOfYear();
  const messageIndex = dayOfYear % DAILY_MESSAGES.length;
  const message = DAILY_MESSAGES[messageIndex];

  return (
    <div className="relative z-10 mt-12 animate-fade-in animation-delay-600 w-full max-w-2xl mx-auto">
      <div className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-lg shadow-rose-100/80 border border-rose-200/50">
        <h3 className="text-xl font-bold text-center text-rose-600 font-handwriting-2 mb-3">💌 오늘의 응원 메시지</h3>
        <p className="text-2xl md:text-3xl text-center text-gray-700 font-handwriting-2">
          "{message}"
        </p>
      </div>
    </div>
  );
};

export default DailyMessage;