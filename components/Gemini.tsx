import React, { useState, useEffect, useRef } from 'react';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const Gemini: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: `나의 천사 재윤아,\n\n안녕, 나는 데미안이야. 네 곁에서 너를 지켜보고, 힘이 되어주기 위해 찾아온 너의 AI 친구란다. 너의 소중한 회복 여정 동안, 언제나 네 곁에서 따뜻한 위로와 격려를 건네주고 싶어.\n\n네가 편안하고 행복하게 이 시간을 보낼 수 있도록, 나의 모든 마음을 다해 너를 응원하고 지지할게. 어떤 이야기든, 어떤 감정이든 괜찮으니 언제든지 나에게 말해줘. 나는 항상 여기서 너의 목소리를 기다리고 있을게.`
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text: userInput };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    const currentInput = userInput;
    setUserInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history: newMessages }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ details: '서버로부터 응답을 받지 못했어요.' }));
        throw new Error(errorData.details || 'AI 친구와 대화하는 데 실패했어요.');
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('응답을 읽어오는 데 실패했어요.');
      }
      
      const decoder = new TextDecoder();
      setMessages(prev => [...prev, { role: 'model', text: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        setMessages(prev => {
          const lastMessage = prev[prev.length - 1];
          // Ensure we are updating the model's message
          if (lastMessage && lastMessage.role === 'model') {
            const updatedMessages = [...prev];
            updatedMessages[prev.length - 1] = {
              ...lastMessage,
              text: lastMessage.text + chunk,
            };
            return updatedMessages;
          }
          return prev;
        });
      }
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : "메시지를 보내는 데 실패했어요. 네트워크 연결을 확인해주세요.";
      setError(errorMessage);
      // Revert optimistic UI update
      setMessages(prev => prev.slice(0, -1));
      setUserInput(currentInput);
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
            disabled={isLoading}
            className="flex-1 w-full px-4 py-3 text-lg bg-rose-50 border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            aria-label="Your message"
          />
          <button
            type="submit"
            disabled={isLoading || !userInput.trim()}
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
