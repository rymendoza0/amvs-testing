import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, User, Bot } from 'lucide-react';
import { sendMessageToGemini } from '../services/gemini';
import { ChatMessage } from '../types';

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: "Hello. I am Aria, your personal AMVS concierge. How may I assist you in your property search today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    let fullResponse = "";
    const responseMsgIndex = messages.length + 1; // Anticipated index

    try {
      // Add placeholder for streaming response
      setMessages(prev => [...prev, { role: 'model', text: "", timestamp: new Date() }]);
      
      const stream = await sendMessageToGemini(userMsg.text);
      
      for await (const chunk of stream) {
        fullResponse += chunk;
        setMessages(prev => {
          const newMsgs = [...prev];
          // Update the last message (the placeholder)
          newMsgs[newMsgs.length - 1].text = fullResponse;
          return newMsgs;
        });
      }
    } catch (error) {
       console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[350px] md:w-[400px] h-[500px] bg-white rounded-lg shadow-2xl border border-stone-200 flex flex-col overflow-hidden animate-fade-in-up transition-all">
          {/* Header */}
          <div className="bg-stone-900 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-gold-500 rounded-full">
                 <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-serif font-medium text-sm">AMVS Concierge</h3>
                <p className="text-[10px] text-stone-400 uppercase tracking-wider">Aria AI • Online</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-stone-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-stone-50 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                  ${msg.role === 'user' ? 'bg-stone-200 text-stone-600' : 'bg-gold-100 text-gold-600'}
                `}>
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`
                  max-w-[75%] p-3 rounded-lg text-sm leading-relaxed
                  ${msg.role === 'user' 
                    ? 'bg-stone-900 text-white rounded-tr-none' 
                    : 'bg-white text-stone-800 shadow-sm border border-stone-100 rounded-tl-none'}
                `}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && messages[messages.length - 1]?.text === "" && (
               <div className="flex gap-3">
                 <div className="w-8 h-8 rounded-full bg-gold-100 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-gold-600" />
                 </div>
                 <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm border border-stone-100">
                    <div className="flex space-x-1 h-4 items-center">
                        <div className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce delay-75"></div>
                        <div className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce delay-100"></div>
                        <div className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce delay-150"></div>
                    </div>
                 </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-stone-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about properties..."
                className="flex-1 bg-stone-50 border-none rounded-md px-4 py-2 text-sm focus:ring-1 focus:ring-gold-400 outline-none"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim()}
                className="p-2 bg-stone-900 text-white rounded-md hover:bg-gold-500 transition-colors disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300
          ${isOpen ? 'bg-stone-800 text-stone-400 rotate-90 scale-90' : 'bg-stone-900 text-white hover:bg-gold-500 hover:scale-105'}
        `}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>
    </div>
  );
};