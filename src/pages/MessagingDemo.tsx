import React, { useState, useEffect, useRef } from 'react';
import { getUsers } from '../services/authService';

const getWorker = () => {
  // Find the first worker in the users list
  const users = getUsers();
  return users.find(u => u.type === 'worker') || { name: 'Worker', id: 1 };
};

const getMessages = () => {
  try {
    const msgs = localStorage.getItem('employerToWorkerMessages');
    return msgs ? JSON.parse(msgs) : [];
  } catch {
    return [];
  }
};

const MessagingDemo = () => {
  const worker = getWorker();
  const [messages, setMessages] = useState(getMessages());
  const [input, setInput] = useState('');
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom on new message
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = {
      from: 'Employer',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    const updated = [...messages, newMsg];
    setMessages(updated);
    localStorage.setItem('employerToWorkerMessages', JSON.stringify(updated));
    setInput('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-1/4 border-r p-4 bg-gray-50">
          <h3 className="font-bold mb-4">Conversations</h3>
          <ul>
            <li className="p-2 rounded bg-blue-100 mb-2 cursor-pointer">
              <div className="flex justify-between items-center">
                <span className="font-medium">{worker.name}</span>
              </div>
              <div className="text-xs text-gray-500">Profile: {(worker as any).profession || 'Worker'}</div>
            </li>
          </ul>
        </div>
        {/* Chat Window */}
        <div className="w-2/4 p-6 flex flex-col">
          <h3 className="font-bold mb-4">Chat with {worker.name}</h3>
          <div ref={chatRef} className="flex-1 bg-gray-100 rounded p-4 mb-4 overflow-y-auto">
            {messages.length === 0 && (
              <div className="text-gray-400 text-center">No messages yet. Start the conversation!</div>
            )}
            {messages.map((msg: any, i: number) => (
              <div key={i} className={`mb-2 ${msg.from === 'Employer' ? 'text-right' : 'text-left'}`}> 
                <div className={`inline-block px-3 py-2 rounded-lg ${msg.from === 'Employer' ? 'bg-blue-500 text-white' : 'bg-white border'}`}>
                  <span className="block font-semibold text-xs mb-1">{msg.from}</span>
                  <span>{msg.text}</span>
                  <span className="block text-xs text-gray-400 mt-1">{msg.time}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              className="flex-1 border rounded px-3 py-2"
              placeholder="Type a message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSend}>Send</button>
          </div>
        </div>
        {/* Notifications */}
        <div className="w-1/4 border-l p-4 bg-gray-50">
          <h3 className="font-bold mb-4">Notifications</h3>
          <ul>
            <li className="mb-3 p-2 bg-yellow-50 rounded">
              <div className="text-sm">New application received from {worker.name}</div>
              <div className="text-xs text-gray-500">5 min ago</div>
            </li>
            <li className="mb-3 p-2 bg-yellow-50 rounded">
              <div className="text-sm">Project deadline approaching for "Mall Renovation"</div>
              <div className="text-xs text-gray-500">1 hr ago</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MessagingDemo; 