'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageSquare } from 'lucide-react';

export default function ChatPage() {
  // --- Mock message data (replace with Supabase later)
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'team',
      text: 'Hi Jordan! Thanks for uploading your spreadsheet — we’re reviewing it now.',
      time: '9:12 AM',
    },
    {
      id: 2,
      sender: 'client',
      text: 'Awesome, thank you! Please double-check the macros — they’ve been slow lately.',
      time: '9:18 AM',
    },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const msg = {
      id: messages.length + 1,
      sender: 'client',
      text: newMessage,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setMessages([...messages, msg]);
    setNewMessage('');

    // 🔹 TODO: send message to Supabase (messages table)
  };

  return (
    <main className="flex flex-col h-[calc(100vh-8rem)] bg-emerald-50/40 border border-emerald-100 rounded-2xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-emerald-100">
        <div className="flex items-center gap-3">
          <MessageSquare className="w-5 h-5 text-emerald-600" />
          <h1 className="text-lg font-semibold text-emerald-700">Messages</h1>
        </div>
        <p className="text-xs text-neutral-500">Project: Sales Dashboard</p>
      </div>

      {/* Message Feed */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 bg-white">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={`flex ${
              msg.sender === 'client' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm shadow-sm ${
                msg.sender === 'client'
                  ? 'bg-emerald-600 text-white rounded-br-none'
                  : 'bg-emerald-50 text-neutral-800 rounded-bl-none'
              }`}
            >
              <p>{msg.text}</p>
              <p
                className={`text-[10px] mt-1 ${
                  msg.sender === 'client'
                    ? 'text-emerald-100'
                    : 'text-neutral-500'
                }`}
              >
                {msg.time}
              </p>
            </div>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <form
        onSubmit={handleSend}
        className="flex items-center gap-3 border-t border-emerald-100 bg-white px-6 py-4"
      >
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          rows={1}
          className="flex-1 resize-none rounded-md border border-neutral-300 px-3 py-2 text-sm focus:ring-1 focus:ring-emerald-500 outline-none"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-emerald-600 text-white font-semibold text-sm shadow hover:bg-emerald-700 transition"
        >
          <Send className="w-4 h-4 mr-1" /> Send
        </button>
      </form>
    </main>
  );
}
