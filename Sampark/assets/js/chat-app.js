// Message templates and app initialization
ChatForum.prototype.getSarahMessages = function() {
  return `
    <div class="message system">
      <div class="message-content">
        <div class="message-text">🌟 You're now connected with Sarah Chen, a trained volunteer. This conversation is confidential and secure.</div>
      </div>
    </div>
    <div class="message volunteer">
      <div class="message-avatar" style="background: var(--message-volunteer);">S</div>
      <div class="message-content">
        <div class="message-text">Hi there! I'm Sarah, and I'm here to listen and support you. How are you feeling today? 😊</div>
        <div class="message-time">10:30 AM</div>
      </div>
    </div>
    <div class="message volunteer">
      <div class="message-avatar" style="background: var(--message-volunteer);">S</div>
      <div class="message-content">
        <div class="message-text">I'm here to listen whenever you need to talk. What's on your mind?</div>
        <div class="message-time">Just now</div>
      </div>
    </div>
  `;
};

ChatForum.prototype.getAlexMessages = function() {
  return `
    <div class="message system">
      <div class="message-content">
        <div class="message-text">🌟 You're now connected with Alex Rodriguez, a peer volunteer. This is a safe space to share.</div>
      </div>
    </div>
    <div class="message volunteer">
      <div class="message-avatar" style="background: var(--message-volunteer);">A</div>
      <div class="message-content">
        <div class="message-text">Hey! I'm Alex, a student volunteer. I understand what it's like to go through tough times in college. How are you doing?</div>
        <div class="message-time">1 hour ago</div>
      </div>
    </div>
  `;
};

ChatForum.prototype.getMayaMessages = function() {
  return `
    <div class="message system">
      <div class="message-content">
        <div class="message-text">🌟 You're now connected with Dr. Maya Patel, a licensed counselor. This conversation is completely confidential.</div>
      </div>
    </div>
    <div class="message volunteer">
      <div class="message-avatar" style="background: var(--message-volunteer);">M</div>
      <div class="message-content">
        <div class="message-text">Hello, I'm Dr. Maya Patel. I'm here to provide professional support. Remember, small steps count too. What would you like to talk about today?</div>
        <div class="message-time">3 hours ago</div>
      </div>
    </div>
  `;
};

ChatForum.prototype.getAIMessages = function() {
  return `
    <div class="message system">
      <div class="message-content">
        <div class="message-text">🤖 You're now chatting with TechHealth AI. I'm available 24/7 and can provide immediate support and resources.</div>
      </div>
    </div>
    <div class="message volunteer">
      <div class="message-avatar" style="background: var(--accent-gradient-start);"><i class="fas fa-robot"></i></div>
      <div class="message-content">
        <div class="message-text">Hi! I'm here to help you 24/7. I can provide coping strategies, breathing exercises, and connect you with human support when needed. How can I assist you today?</div>
        <div class="message-time">Always available</div>
      </div>
    </div>
  `;
};

ChatForum.prototype.getDefaultMessages = function() {
  return `
    <div class="message system">
      <div class="message-content">
        <div class="message-text">🌟 Welcome to TechHealth Support Chat. You're in a safe, confidential space.</div>
      </div>
    </div>
  `;
};

ChatForum.prototype.simulateVolunteerResponse = function(userMessage) {
  const responses = [
    "I hear you, and I want you to know that your feelings are valid. Can you tell me more about what's going on?",
    "Thank you for sharing that with me. It sounds like you're going through a difficult time. I'm here to listen.",
    "That must be really challenging for you. You're not alone in this. What do you think might help you feel a bit better right now?",
    "I appreciate you opening up about this. It takes courage to reach out. How long have you been feeling this way?",
    "Your feelings matter, and I'm glad you're talking about them. Sometimes just expressing what we're going through can help.",
    "That sounds overwhelming. Let's take this one step at a time. What feels like the most pressing thing right now?",
    "I can understand why that would be stressful. You're doing the right thing by reaching out for support.",
    "Thank you for trusting me with this. Remember, it's okay to not be okay sometimes. What usually helps you cope?"
  ];
  
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  this.addMessageToChat('volunteer', randomResponse, 'S');
};

// Sidebar toggle functions
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('mobile-open');
}

function toggleChatSidebar() {
  document.getElementById('chatSidebar').classList.toggle('mobile-open');
}

// Initialize chat forum
document.addEventListener('DOMContentLoaded', () => {
  const chatForum = new ChatForum();
  
  // Initialize all functionality
  chatForum.initializeEventListeners();
  chatForum.updateLanguage();
  chatForum.initializeAutoResize();
  
  // Handle emergency mode
  if (chatForum.emergencyMode) {
    // Auto-connect to crisis counselor
    const crisisChat = document.querySelector('[data-chat="maya-volunteer"]');
    if (crisisChat) {
      chatForum.selectChat(crisisChat);
    }
    
    // Show emergency banner
    document.body.insertAdjacentHTML('afterbegin', `
      <div style="
        background: linear-gradient(135deg, #E74C3C, #C0392B);
        color: white;
        padding: 15px;
        text-align: center;
        font-weight: 600;
        position: sticky;
        top: 0;
        z-index: 1002;
      ">
        🚨 EMERGENCY MODE ACTIVATED - You're connected to crisis support
        <button onclick="this.parentElement.style.display='none'" style="
          background: none;
          border: none;
          color: white;
          margin-left: 15px;
          cursor: pointer;
          font-size: 1.2rem;
        ">✕</button>
      </div>
    `);
    
    localStorage.removeItem('emergencyMode'); // Clear after handling
  }
  
  // Auto-scroll messages area on new messages
  const messagesArea = document.getElementById('messagesArea');
  if (messagesArea) {
    messagesArea.scrollTop = messagesArea.scrollHeight;
  }
});

// Handle window resize
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    document.getElementById('sidebar').classList.remove('mobile-open');
    document.getElementById('chatSidebar').classList.remove('mobile-open');
  }
});
