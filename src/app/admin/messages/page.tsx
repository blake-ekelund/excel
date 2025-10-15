'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send, Search } from 'lucide-react';

// Mock data — replace with Supabase later
const mockConversations = [
  {
    id: 1,
    client: 'Jordan Smith',
    project: 'Sales Dashboard',
    lastMessage: 'Just uploaded the latest file!',
    unread: true,
    messages: [
      { id: 1, sender: 'client', text: 'Hey, I uploaded the new version.', time: '9:02 AM' },
      { id: 2, sender: 'team', text: 'Got it, reviewing now!', time: '9:05 AM' },
    ],
  },
  {
    id: 2,
    client: 'Alex Chen',
    project: 'Inventory Tracker',
    lastMessage: 'Everything looks perfect. Thanks!',
    unread: false,
    messages: [
      { id: 1, sender: 'team', text: 'We finished your formulas.', time: '3:20 PM' },
      { id: 2, sender: 'client', text: 'Everything looks perfect. Thanks!', time: '3:45 PM' },
    ],
  },
];

export default function AdminMessagesPage() {
  const [conversations, setConversations] = useState(mockConversations);
  const [activeChat, setActiveChat] = useState(mockConversations[0]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const msg = {
      id: activeChat.messages.length + 1,
      sender: 'team',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedChat = {
      ...activeChat,
      messages: [...activeChat.messages, msg],
      lastMessage: msg.text,
      unread: false,
    };

    setConversations((prev) =>
      prev.map((c) => (c.id === activeChat.id ? updatedChat : c))
    );
    setActiveChat(updatedChat);
    setNewMessage('');
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] bg-white border border-emerald-100 rounded-2xl overflow-hidden shadow-sm">
      {/* Left Sidebar: Conversations */}
      <aside className="w-72 border-r border-emerald-100 bg-emerald-50/50 flex flex-col">
        <div className="p-4 border-b border-emerald-100">
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg font-semibold text-emerald-700">Messages</h2>
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-8 pr-3 py-2 text-sm rounded-md border border-neutral-300 focus:ring-1 focus:ring-emerald-500 outline-none"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => (
            <motion.div
              key={conv.id}
              whileHover={{ backgroundColor: 'rgba(240,253,244,1)' }}
              className={`px-4 py-3 border-b border-emerald-100 cursor-pointer transition ${
                activeChat.id === conv.id ? 'bg-emerald-100' : ''
              }`}
              onClick={() => setActiveChat(conv)}
            >
              <p className="font-medium text-sm text-emerald-700">{conv.client}</p>
              <p className="text-xs text-neutral-600 truncate">{conv.project}</p>
              <p className="text-xs text-neutral-500 truncate">{conv.lastMessage}</p>
              {conv.unread && (
                <span className="inline-block mt-1 text-[10px] text-emerald-700 font-medium bg-emerald-200 px-2 py-[2px] rounded-full">
                  New
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-emerald-100 bg-emerald-50/50">
          <div>
            <h3 className="text-lg font-semibold text-emerald-700">{activeChat.client}</h3>
            <p className="text-sm text-neutral-600">{activeChat.project}</p>
          </div>
          <button className="text-sm text-emerald-600 font-medium hover:underline">
            View Project
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
          {activeChat.messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex ${
                msg.sender === 'team' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm shadow-sm ${
                  msg.sender === 'team'
                    ? 'bg-emerald-600 text-white rounded-br-none'
                    : 'bg-emerald-50 text-neutral-800 rounded-bl-none'
                }`}
              >
                <p>{msg.text}</p>
                <p
                  className={`text-[10px] mt-1 ${
                    msg.sender === 'team'
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
            placeholder="Type a message..."
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
    </div>
  );
}
