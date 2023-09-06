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

  const convertAndFormatText = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)(\.\s|\s|$)/g;
    const paragraphs = text.split('\n'); // Split by single line breaks
  
    return paragraphs.map((paragraph, index) => {
      const isLastParagraph = index === paragraphs.length - 1;
  
      if (/^\d+\.\s/.test(paragraph)) {
        // Handle numerical lists
        return (
          <div
            key={index}
            style={{
              marginTop: '10px',
              marginBottom: isLastParagraph ? '0' : '10px', // No margin for last paragraph
            }}
          >
            {paragraph}
          </div>
        );
      } else {
        const parts = paragraph.split(urlRegex);
        return (
          <div
            key={index}
            style={{
              marginBottom: isLastParagraph ? '0' : '20px', // No margin for last paragraph
            }}
          >
            {parts.map((part, partIndex) =>
              urlRegex.test(part) ? (
                <a
                  key={partIndex}
                  href={part.trim().replace(/\.$/, '')}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {part.trim().replace(/\.$/, '')}
                </a>
              ) : (
                <React.Fragment key={partIndex}>{part}</React.Fragment>
              )
            )}
          </div>
        );
      }
    });
  };
  

  const handleStartChat = () => {
      setShowChat(true);
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

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
        const formattedResponse = convertAndFormatText(response);

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
<div className="landing-page">
  <div className="disclaimer">
    <h1>Welcome to the AI Support Bot</h1>
    <p>
      Discover fast and context-rich answers with our AI-powered Support Bot! The beta version is available now for company-wide testing.
    </p>
    <p>
    Currently, the bot is referencing product, implementation, and select Confluence pages as context. If you have any documentation that you wish the bot to use, please reach out to get it added.
    </p>
    <div className="highlights">
      <div className="highlight">
        <span className="good-list">🚀 What the Bot Excels At:</span>
        <ul>
          <li>Instant Access to Summarized Documentation</li>
          <li>Thorough Explanations of Tools & Features</li>
        </ul>
      </div>
      <div className="highlight">
        <span className="not-good-list">⚠️ Where We're Improving:</span>
        <ul>
          <li>Persistent Message Processing</li>
          <li>Occasional Character Limit Constraints</li>
        </ul>
      </div>
    </div>
    <div className="highlight recent-updates">
        <span className="update-list">🔔 Recent Updates:</span>
        <ul>
          <li>Introduction of an <b>Intent Classifier</b> to capture nuance in your query</li>
          <li>Enhanced <b>Decision-Making</b> Based on <b>Command</b>, <b>Question</b>, or <b>Conversational</b> langauge</li>
          <li>Updated Documentation for New Products: <b>Catalog Toolkit, Governance, Archie Bot, BB Bots</b></li>
          <li>UI Improvements: <b>Response Formatting</b>, Sending messages using the <b>"Enter"</b> key</li>
        </ul>
      </div>
    <p>
      Encounter unexpected responses? Share your feedback with Jack Compton on Slack. Help us enhance the bot by sharing your questions and responses!
    </p>
    <p>
      Happy chatting! 😄
    </p>
  </div>
    <button className="start-chat-button" onClick={handleStartChat}>
      Start Chat
    </button>
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
            <form onSubmit={handleSendMessage}>
              <div className="textbox-container">
                <input
                  type="text"
                  className="textbox"
                  placeholder="Send a message"
                  value={inputText}
                  onChange={handleInputChange}
                  ref={inputRef}
                />
                <button className="send-button" type="submit">
                  Send
                </button>
              </div>
            </form>
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
