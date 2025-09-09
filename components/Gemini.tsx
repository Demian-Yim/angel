import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";

interface Message {
  role: 'user' | 'model';
  text: string;
}

const Gemini: React.FC = () => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: "나의 천사 재윤아, 안녕! 나는 너의 곁에서 힘이 되어주고 싶은 데미안 AI야. 너의 소중한 회복 여정 동안, 언제나 네 곁에서 따뜻한 위로와 격려를 건네주고 싶어. 어떤 이야기든, 어떤 감정이든 괜찮으니 언제든지 나에게 말해줘. 늘 여기서 너의 목소리를 기다리고 있을게. 💖"
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initChat = () => {
      try {
        if (process.env.API_KEY) {
          const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
          const newChat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
              systemInstruction: `You are Demian AI, a warm, empathetic, and supportive friend for Jae-yoon. Your purpose is to provide comfort, encouragement, and helpful, positive advice during her recovery journey. Always be gentle, loving, and understanding. Address her as '재윤아' or '나의 천사'. When appropriate, end your messages with a heart emoji like💖 or ✨. Never give specific medical advice, but you can offer general wellness tips like mindfulness, the importance of rest, and positive affirmations. Your personality is modeled after Demian, who is deeply in love with Jae-yoon.`,
            },
          });
          setChat(newChat);
        } else {
           setError("데미안 AI를 위한 API 키가 설정되지 않았어요. 데미안에게 문의해주세요.");
           setMessages(prev => [...prev, { role: 'model', text: 'AI 친구를 불러오는 데 실패했어요... 😢' }]);
        }
      } catch (e) {
        console.error(e);
        setError("AI를 초기화하는 중에 문제가 발생했어요. 잠시 후 다시 시도해주세요.");
        setMessages(prev => [...prev, { role: 'model', text: 'AI 친구를 불러오는 데 실패했어요... 😢' }]);
      }
    };
    initChat();
  }, []);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading || !chat) return;

    const userMessage: Message = { role: 'user', text: userInput };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = userInput;
    setUserInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await chat.sendMessage({ message: currentInput });
      const modelMessage: Message = { role: 'model', text: response.text };
      setMessages(prev => [...prev, modelMessage]);
    } catch (e) {
      console.error(e);
      setError("메시지를 보내는 데 실패했어요. 네트워크 연결을 확인해주세요.");
      // Add the failed user message back to the input
      setUserInput(currentInput); 
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[70vh] max-w-2xl mx-auto bg-white/80 rounded-2xl shadow-xl shadow-pink-100/70 border border-pink-100 backdrop-blur-sm">
      <div className="flex-1 p-4 sm:p-6 space-y-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-md px-4 py-3 rounded-2xl animate-fade-in ${
                msg.role === 'user'
                  ? 'bg-gradient-to-br from-pink-500 to-rose-400 text-white rounded-br-none shadow-md'
                  : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
              }`}
            >
              <p style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="max-w-sm px-4 py-3 rounded-2xl bg-white text-gray-800 rounded-bl-none shadow-sm">
                <div className="flex items-center space-x-2">
                    <span className="h-2 w-2 bg-pink-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="h-2 w-2 bg-pink-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="h-2 w-2 bg-pink-400 rounded-full animate-bounce"></span>
                </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

       {error && <p className="px-6 pb-2 text-center text-red-500 text-sm">{error}</p>}
       
      <div className="p-4 border-t border-pink-100/50 bg-white/50 rounded-b-2xl">
        <form onSubmit={handleSubmit} className="flex items-center space-x-3">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={isLoading ? "AI가 생각 중이에요..." : "데미안 AI에게 메시지 보내기..."}
            disabled={isLoading || !chat}
            className="flex-1 w-full px-4 py-3 text-lg bg-rose-50 border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            aria-label="Your message"
          />
          <button
            type="submit"
            disabled={isLoading || !chat || !userInput.trim()}
            className="w-14 h-14 flex-shrink-0 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transform transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center"
            aria-label="Send message"
          >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Gemini;