import React, { useState, useRef, useEffect } from 'react';
import './chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "👋 Hello! I’m your assistant. Ask me about your projects, payments, freelancers or deadlines.",
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const quickActions = [
    'Show my active projects',
    'Check payment status',
    'Find available freelancers',
    'View project deadlines'
  ];

  const handleQuickAction = (action) => {
    setInputMessage(action);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await fetch('http://localhost:5000/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.text }),
      });

      const data = await response.json();

      setTimeout(() => {
        const botMessage = {
          id: Date.now() + 1,
          text: data.response,
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString(),
        };

        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 800);
    } catch (err) {
      const errorMessage = {
        id: Date.now() + 1,
        text: "⚠️ Sorry, couldn't reach the assistant. Please try again.",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, errorMessage]);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div>
      {!isOpen && (
        <button className="chatbot-toggle" onClick={() => setIsOpen(true)}>💬</button>
      )}

      {isOpen && (
        <div className="chatbot-wrapper">
          <div className="chatbot-header">
            <span>HiveNimble Assistant</span>
            <button onClick={() => setIsOpen(false)}>✖</button>
          </div>

          <div className="chatbot-body">
            {messages.map((msg) => (
              <div key={msg.id} className={`message ${msg.sender}`}>
                <div className="message-bubble">{msg.text}</div>
                <div className="timestamp">{msg.timestamp}</div>
              </div>
            ))}

            {isTyping && (
              <div className="message bot">
                <div className="message-bubble typing">
                  <span>.</span><span>.</span><span>.</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef}></div>
          </div>

          {messages.length <= 2 && (
            <div className="quick-actions">
              {quickActions.map((text, idx) => (
                <button key={idx} onClick={() => handleQuickAction(text)}>
                  {text}
                </button>
              ))}
            </div>
          )}

          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
