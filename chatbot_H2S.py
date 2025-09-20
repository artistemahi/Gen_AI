from flask import Flask, request, jsonify, render_template_string
import numpy as np
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import spacy

app = Flask(__name__)
model = SentenceTransformer('all-MiniLM-L6-v2')

try:
    nlp = spacy.load("en_core_web_sm")
except:
    import os
    os.system("python -m spacy download en_core_web_sm")
    nlp = spacy.load("en_core_web_sm")

KB_ITEMS = [
    {"question": "How to improve Python skills?", "answer": "Practice coding daily, contribute to open source, and build projects."},
    {"question": "What are in-demand careers in AI?", "answer": "Machine Learning Engineer, Data Scientist, MLOps Engineer, AI Product Manager."},
    {"question": "How to prepare for interviews?", "answer": "Research the company, practice common questions, and prepare STAR stories."},
    {"question": "What is corporate social responsibility?", "answer": "It is the ethical responsibility of businesses to contribute to society and environment."}
]

KB_EMBEDDINGS = model.encode([item["question"] for item in KB_ITEMS])

HOBBY_CAREER_MAP = {
    "music": ["Sound Engineer", "Music Therapist", "Composer"],
    "art": ["Graphic Designer", "Animator", "Art Director"],
    "sports": ["Coach", "Sports Analyst", "Physiotherapist"],
    "technology": ["Software Developer", "Data Scientist", "AI Engineer"],
    "writing": ["Content Writer", "Editor", "Journalist"]
}

HTML_PAGE = """
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Career Assistant</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      background: #f7f7f8;
      color: #202123;
      line-height: 1.6;
      height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .sidebar {
      width: 260px;
      background: #202123;
      color: white;
      display: flex;
      flex-direction: column;
      padding: 0;
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      z-index: 1000;
      border-right: 1px solid #565869;
    }

    .sidebar-header {
      padding: 18px 12px;
      border-bottom: 1px solid #565869;
    }

    .new-chat-btn {
      width: 100%;
      padding: 12px;
      background: transparent;
      border: 1px solid #565869;
      color: white;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .new-chat-btn:hover {
      background: #40414f;
    }

    .mode-selector {
      padding: 12px;
      border-bottom: 1px solid #565869;
    }

    .mode-btn {
      width: 100%;
      padding: 8px 12px;
      margin: 4px 0;
      background: transparent;
      border: none;
      color: #c5c5d2;
      border-radius: 6px;
      cursor: pointer;
      font-size: 13px;
      text-align: left;
      transition: all 0.2s;
    }

    .mode-btn:hover {
      background: #40414f;
      color: white;
    }

    .mode-btn.active {
      background: #10a37f;
      color: white;
    }

    .main-content {
      margin-left: 260px;
      display: flex;
      flex-direction: column;
      height: 100vh;
    }

    .header {
      background: white;
      border-bottom: 1px solid #e5e5e5;
      padding: 16px 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    .header h1 {
      font-size: 20px;
      font-weight: 600;
      color: #202123;
    }

    .chat-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      max-width: 768px;
      margin: 0 auto;
      width: 100%;
      padding: 0 24px;
    }

    .messages-container {
      flex: 1;
      overflow-y: auto;
      padding: 24px 0;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .message {
      display: flex;
      gap: 16px;
      max-width: 100%;
    }

    .message-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 14px;
    }

    .user-avatar {
      background: #10a37f;
      color: white;
    }

    .assistant-avatar {
      background: #ab68ff;
      color: white;
    }

    .message-content {
      flex: 1;
      padding-top: 6px;
    }

    .user-message {
      background: transparent;
    }

    .assistant-message {
      background: transparent;
    }

    .message-text {
      font-size: 16px;
      line-height: 1.7;
      white-space: pre-wrap;
      word-wrap: break-word;
    }

    .welcome-message {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: 1;
      text-align: center;
      color: #8e8ea0;
      max-width: 320px;
      margin: 0 auto;
      padding: 24px;
    }

    .welcome-title {
      font-size: 32px;
      font-weight: 600;
      color: #202123;
      margin-bottom: 16px;
    }

    .welcome-subtitle {
      font-size: 16px;
      margin-bottom: 32px;
    }

    .input-container {
      padding: 24px;
      background: white;
      border-top: 1px solid #e5e5e5;
    }

    .input-wrapper {
      max-width: 768px;
      margin: 0 auto;
      position: relative;
      background: white;
      border: 1px solid #d9d9e3;
      border-radius: 12px;
      padding: 12px 48px 12px 16px;
      box-shadow: 0 0 15px rgba(0,0,0,0.1);
      transition: all 0.2s;
    }

    .input-wrapper:focus-within {
      border-color: #10a37f;
      box-shadow: 0 0 0 2px rgba(16, 163, 127, 0.2);
    }

    #userInput {
      width: 100%;
      border: none;
      outline: none;
      font-size: 16px;
      line-height: 1.5;
      resize: none;
      background: transparent;
      max-height: 200px;
      min-height: 24px;
    }

    #userInput::placeholder {
      color: #8e8ea0;
    }

    .send-button {
      position: absolute;
      right: 12px;
      bottom: 12px;
      width: 32px;
      height: 32px;
      border: none;
      background: #10a37f;
      border-radius: 6px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
      color: white;
    }

    .send-button:hover:not(:disabled) {
      background: #0d8a6b;
    }

    .send-button:disabled {
      background: #d9d9e3;
      cursor: not-allowed;
    }

    .typing-indicator {
      display: none;
      padding: 16px 0;
    }

    .typing-dots {
      display: flex;
      gap: 4px;
      align-items: center;
    }

    .typing-dots span {
      width: 6px;
      height: 6px;
      background: #8e8ea0;
      border-radius: 50%;
      animation: typing 1.4s infinite ease-in-out;
    }

    .typing-dots span:nth-child(1) { animation-delay: -0.32s; }
    .typing-dots span:nth-child(2) { animation-delay: -0.16s; }
    .typing-dots span:nth-child(3) { animation-delay: 0s; }

    @keyframes typing {
      0%, 80%, 100% { transform: scale(0.8); opacity: 0.3; }
      40% { transform: scale(1.2); opacity: 1; }
    }

    /* Mobile Responsive */
    @media (max-width: 768px) {
      .sidebar {
        transform: translateX(-100%);
        transition: transform 0.3s ease;
      }
      
      .main-content {
        margin-left: 0;
      }
      
      .chat-container {
        padding: 0 16px;
      }
      
      .messages-container {
        padding: 16px 0;
      }
      
      .input-container {
        padding: 16px;
      }
      
      .welcome-title {
        font-size: 24px;
      }
    }

    /* Gemini-inspired accents */
    .gradient-text {
      background: linear-gradient(45deg, #10a37f, #ab68ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .feature-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin-top: 24px;
      max-width: 600px;
    }

    .feature-card {
      background: white;
      border: 1px solid #e5e5e5;
      border-radius: 12px;
      padding: 20px;
      cursor: pointer;
      transition: all 0.2s;
      text-align: left;
    }

    .feature-card:hover {
      border-color: #10a37f;
      box-shadow: 0 2px 12px rgba(0,0,0,0.1);
    }

    .feature-card h3 {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 8px;
      color: #202123;
    }

    .feature-card p {
      font-size: 14px;
      color: #8e8ea0;
      line-height: 1.4;
    }
  </style>
</head>
<body>
  <div class="sidebar">
    <div class="sidebar-header">
      <button class="new-chat-btn" onclick="clearChat()">
        <span>+</span> New Chat
      </button>
    </div>
    
    <div class="mode-selector">
      <button class="mode-btn active" onclick="setMode('chat')" id="chatBtn">
        💬 Chat Mode
      </button>
      <button class="mode-btn" onclick="setMode('match')" id="matchBtn">
        🎯 Career Matcher
      </button>
      <button class="mode-btn" onclick="setMode('skillgap')" id="skillGapBtn">
    📊 Skill Gap Analyzer
  </button>
   
    </div>
  </div>

  <div class="main-content">
    <div class="header">
      <h1 class="gradient-text">Career Assistant</h1>
    </div>

    <div class="chat-container">
      <div class="messages-container" id="messagesContainer">
        <div class="welcome-message" id="welcomeMessage">
          <div class="welcome-title gradient-text">How can I help you today?</div>
          <div class="welcome-subtitle">Get personalized career advice and discover opportunities based on your interests</div>
          
          <div class="feature-cards">
            <div class="feature-card" onclick="sendSampleMessage('How can I improve my Python skills?')">
              <h3>Skill Development</h3>
              <p>Get advice on improving your technical skills</p>
            </div>
            <div class="feature-card" onclick="sendSampleMessage('What are trending careers in AI?')">
              <h3>Career Trends</h3>
              <p>Discover in-demand careers and opportunities</p>
            </div>
            <div class="feature-card" onclick="sendSampleMessage('I love music')">
              <h3>Interest Matching</h3>
              <p>Find careers that match your hobbies and interests</p>
            </div>
            <div class="feature-card" onclick="sendSampleMessage('How to prepare for interviews?')">
              <h3>Interview Prep</h3>
              <p>Get tips for acing your next job interview</p>
            </div>
          </div>
        </div>
      </div>

      <div class="typing-indicator" id="typingIndicator">
        <div class="message">
          <div class="message-avatar assistant-avatar">AI</div>
          <div class="message-content">
            <div class="typing-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="input-container">
      <div class="input-wrapper">
        <textarea id="userInput" placeholder="Message Career Assistant..." rows="1" onkeydown="handleKeyPress(event)"></textarea>
        <button class="send-button" id="sendBtn" onclick="sendMessage()">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M.5 1.163A1 1 0 0 1 1.97.28l12.868 6.837a1 1 0 0 1 0 1.766L1.969 15.72A1 1 0 0 1 .5 14.836V10.33a1 1 0 0 1 .816-.983L8.5 8 1.316 6.653A1 1 0 0 1 .5 5.67V1.163Z" fill="currentColor"/>
          </svg>
        </button>
      </div>
    </div>
  </div>

  <script>
    let mode = 'chat';
    let isTyping = false;
    let messageHistory = [];

    function setMode(selected) {
  mode = selected;

  // Remove active from all
  document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));

  // Add active only to the clicked one
  document.getElementById(
    selected === 'chat' ? 'chatBtn' :
    selected === 'match' ? 'matchBtn' :
    'skillGapBtn'
  ).classList.add('active');

  // Mode message
  const modeText = selected === 'chat'
    ? 'Chat Mode'
    : selected === 'match'
      ? 'Career Matcher'
      : 'Skill Gap Analyzer';

  if (messageHistory.length > 0) {
    addAssistantMessage(`Switched to ${modeText}. How can I help you?`);
  }
}


    function clearChat() {
      messageHistory = [];
      const container = document.getElementById('messagesContainer');
      container.innerHTML = `
        <div class="welcome-message" id="welcomeMessage">
          <div class="welcome-title gradient-text">How can I help you today?</div>
          <div class="welcome-subtitle">Get personalized career advice and discover opportunities based on your interests</div>
          
          <div class="feature-cards">
            <div class="feature-card" onclick="sendSampleMessage('How can I improve my Python skills?')">
              <h3>Skill Development</h3>
              <p>Get advice on improving your technical skills</p>
            </div>
            <div class="feature-card" onclick="sendSampleMessage('What are trending careers in AI?')">
              <h3>Career Trends</h3>
              <p>Discover in-demand careers and opportunities</p>
            </div>
            <div class="feature-card" onclick="sendSampleMessage('I love music')">
              <h3>Interest Matching</h3>
              <p>Find careers that match your hobbies and interests</p>
            </div>
            <div class="feature-card" onclick="sendSampleMessage('How to prepare for interviews?')">
              <h3>Interview Prep</h3>
              <p>Get tips for acing your next job interview</p>
            </div>
          </div>
        </div>
      `;
      document.getElementById('userInput').focus();
    }

    function sendSampleMessage(message) {
      document.getElementById('userInput').value = message;
      sendMessage();
    }

    function addUserMessage(message) {
      hideWelcome();
      const container = document.getElementById('messagesContainer');
      const messageDiv = document.createElement('div');
      messageDiv.className = 'message user-message';
      messageDiv.innerHTML = `
        <div class="message-avatar user-avatar">You</div>
        <div class="message-content">
          <div class="message-text">${message}</div>
        </div>
      `;
      container.appendChild(messageDiv);
      scrollToBottom();
      messageHistory.push({ type: 'user', content: message });
    }

    function addAssistantMessage(message) {
      hideWelcome();
      const container = document.getElementById('messagesContainer');
      const messageDiv = document.createElement('div');
      messageDiv.className = 'message assistant-message';
      messageDiv.innerHTML = `
        <div class="message-avatar assistant-avatar">AI</div>
        <div class="message-content">
          <div class="message-text">${message}</div>
        </div>
      `;
      container.appendChild(messageDiv);
      scrollToBottom();
      messageHistory.push({ type: 'assistant', content: message });
    }

    function hideWelcome() {
      const welcome = document.getElementById('welcomeMessage');
      if (welcome) {
        welcome.style.display = 'none';
      }
    }

    function showTypingIndicator() {
      const indicator = document.getElementById('typingIndicator');
      indicator.style.display = 'block';
      scrollToBottom();
    }

    function hideTypingIndicator() {
      const indicator = document.getElementById('typingIndicator');
      indicator.style.display = 'none';
    }

    function scrollToBottom() {
      const container = document.getElementById('messagesContainer');
      container.scrollTop = container.scrollHeight;
    }

    function autoResizeTextarea() {
      const textarea = document.getElementById('userInput');
      textarea.style.height = '24px';
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
    }

    function handleKeyPress(event) {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
      }
      autoResizeTextarea();
    }

    async function sendMessage() {
  const input = document.getElementById('userInput');
  const message = input.value.trim();
  if (!message) return;

  addUserMessage(message);
  input.value = '';

  let endpoint = '/api/ask'; // default for chat
  if (mode === 'match') endpoint = '/api/match';
  if (mode === 'skillgap') endpoint = '/api/skillgap';

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });

    const data = await response.json();
    addAssistantMessage(data.reply || "No response from server.");
  } catch (error) {
    addAssistantMessage("⚠️ Error connecting to server.");
    console.error(error);
  }
}


    // Auto-resize textarea on input
    document.getElementById('userInput').addEventListener('input', autoResizeTextarea);
    
    // Focus input on page load
    document.addEventListener('DOMContentLoaded', function() {
      document.getElementById('userInput').focus();
    });
  </script>
</body>
</html>
"""

def get_best_answer(query):
    query_emb = model.encode([query])
    sims = cosine_similarity(query_emb, KB_EMBEDDINGS)[0]
    idx = int(np.argmax(sims))
    return KB_ITEMS[idx]["answer"]

def hobby_match(hobby):
    hobby = hobby.lower()
    for key in HOBBY_CAREER_MAP:
        if key in hobby:
            return f"Based on your interest in {key}, possible careers are: {', '.join(HOBBY_CAREER_MAP[key])}."
    return "I couldn't find a direct match, but exploring related industries could be valuable."

@app.route("/")
def home():
    return render_template_string(HTML_PAGE)

@app.route("/api/ask", methods=["POST"])
def api_ask():
    data = request.json
    query = data.get("query", "")
    answer = get_best_answer(query)
    return jsonify({"answer": answer})

@app.route("/api/match", methods=["POST"])
def api_match():
    data = request.json
    query = data.get("query", "")
    answer = hobby_match(query)
    return jsonify({"answer": answer})

if __name__ == "__main__":
    app.run(debug=True)