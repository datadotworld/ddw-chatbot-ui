import React, { useState, useRef, useEffect } from 'react';
import './styles/core.css';
import { askQuestion } from './services/api.js';

const App = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [showChat, setShowChat] = useState(false); // State to control chat visibility
  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const convertLinks = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)(\.\s|\s|$)/g;
    const parts = text.split(urlRegex);

    return parts.map((part, index) =>
      urlRegex.test(part) ? (
        <a
          key={index}
          href={part.trim().replace(/\.$/, '')}
          target="_blank"
          rel="noopener noreferrer"
        >
          {part.trim().replace(/\.$/, '')}
        </a>
      ) : (
        <React.Fragment key={index}>{part}</React.Fragment>
      )
    );
  };

  const handleApiKeyChange = (e) => {
    setApiKey(e.target.value);
  };

  const handleStartChat = () => {
    if (apiKey.trim() !== '') {
      setShowChat(true);
    }
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSendMessage = async () => {
    if (inputText.trim() !== '') {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: inputText, type: 'question' },
      ]);

      setInputText('');
      inputRef.current.focus();

      try {
        setLoading(true);
        setLoadingMessage('');

        const response = await askQuestion(inputText, apiKey);
        const formattedResponse = convertLinks(response);

        setMessages((prevMessages) => [
          ...prevMessages,
          { text: formattedResponse, type: 'response' },
        ]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        setLoadingMessage('');
      }
    }
  };

  return (
    <div className="App">
      <h1 className="logo"></h1>
      {!showChat ? (
        <div>
          <div class="disclaimer">
            <p>
              Welcome to version 1.0 of the alpha test for our AI Support Bot! Currently, we only use the product documentation page as reference (more coming soon).
            </p>
            <p>
              <span class="good-list">Some things the bot is REALLY good at:</span>
            </p>
            <ul class="good-list">
              <li>Getting you the documentation fast and with context</li>
              <li>Providing thorough explanations of our tools and features</li>
            </ul>
            <p>
              <span class="not-good-list">Some things the bot is NOT good at (yet):</span>
            </p>
            <ul class="not-good-list">
              <li>Remembering questions (messages are individually processed)</li>
              <li>Staying under the character limit (sometimes the bot will cut itself off)</li>
            </ul>
            <p>
              Got weird answers? Tell Jack Compton on Slack. Share your question and the bot's response to help us improve!
              Thanks for your help as we make this app even cooler. 
            </p>
            <p>
            Happy chatting! 😄
            </p>
          </div>
          <div className="api-key-container">
            <input
              type="text"
              className="api-key-input"
              placeholder="Enter your OpenAI API key"
              value={apiKey}
              onChange={handleApiKeyChange}
            />
            <button className="start-chat-button" onClick={handleStartChat}>
              Start Chat
            </button>
          </div>
        </div>
      ) : (
        <div className="chat-container" ref={chatContainerRef}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${
                message.type === 'question' ? 'question' : 'response'
              }`}
            >
              {message.text}
            </div>
          ))}
          <div className="textbox-container">
            <input
              type="text"
              className="textbox"
              placeholder="Send a message"
              value={inputText}
              onChange={handleInputChange}
              ref={inputRef}
            />
            <button className="send-button" onClick={handleSendMessage}>
              Send
            </button>
          </div>
          {loading && (
            <div className="loading-message">
              <span className="loading-dot"></span>
              <span className="loading-dot"></span>
              <span className="loading-dot"></span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
