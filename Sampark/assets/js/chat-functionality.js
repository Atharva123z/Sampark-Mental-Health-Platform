// Chat functionality
class ChatForum {
  constructor() {
    this.currentChat = 'sarah-volunteer';
    this.currentLanguage = localStorage.getItem("selectedLanguage") || "en";
    this.emergencyMode = localStorage.getItem('emergencyMode') === 'true';
  }

  initializeEventListeners() {
    // Language selector
    document.getElementById('languageSelect').addEventListener('change', (e) => {
      this.currentLanguage = e.target.value;
      localStorage.setItem("selectedLanguage", e.target.value);
      this.updateLanguage();
    });

    // Chat item selection
    document.querySelectorAll('.chat-item').forEach(item => {
      item.addEventListener('click', (e) => {
        this.selectChat(e.currentTarget);
      });
    });

    // Tab switching
    document.querySelectorAll('.chat-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        this.switchTab(e.currentTarget);
      });
    });

    // Message input
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');

    messageInput.addEventListener('input', () => {
      sendBtn.disabled = !messageInput.value.trim();
    });

    messageInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });

    sendBtn.addEventListener('click', () => {
      this.sendMessage();
    });

    // Panic button
    document.getElementById('panicButton').addEventListener('click', () => {
      this.handlePanicButton();
    });

    // Search functionality
    document.getElementById('chatSearchInput').addEventListener('input', (e) => {
      this.searchChats(e.target.value);
    });

    // Action buttons
    document.getElementById('reportBtn').addEventListener('click', () => {
      this.showAlert('Report functionality would be implemented here.');
    });

    document.getElementById('videoCallBtn').addEventListener('click', () => {
      this.showAlert('Video calling feature coming soon!');
    });
  }

  initializeAutoResize() {
    const messageInput = document.getElementById('messageInput');
    
    messageInput.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = Math.min(this.scrollHeight, 100) + 'px';
    });
  }

  selectChat(chatItem) {
    // Remove active class from all items
    document.querySelectorAll('.chat-item').forEach(item => {
      item.classList.remove('active');
    });
    
    // Add active class to selected item
    chatItem.classList.add('active');
    
    // Remove unread badge
    const unreadBadge = chatItem.querySelector('.unread-badge');
    if (unreadBadge) {
      unreadBadge.style.display = 'none';
    }
    
    // Update chat header
    const chatName = chatItem.querySelector('.chat-name').childNodes[0].textContent.trim();
    const chatAvatar = chatItem.querySelector('.chat-avatar');
    
    document.getElementById('currentChatName').textContent = chatName;
    document.getElementById('currentChatAvatar').innerHTML = chatAvatar.innerHTML;
    
    // Close mobile chat sidebar
    if (window.innerWidth <= 768) {
      document.getElementById('chatSidebar').classList.remove('mobile-open');
    }
    
    this.loadChatMessages(chatItem.dataset.chat);
  }

  loadChatMessages(chatId) {
    const messagesArea = document.getElementById('messagesArea');
    
    // Sample message loading based on chat type
    const messageTemplates = {
      'sarah-volunteer': this.getSarahMessages(),
      'alex-volunteer': this.getAlexMessages(),
      'maya-volunteer': this.getMayaMessages(),
      'support-ai': this.getAIMessages()
    };
    
    messagesArea.innerHTML = messageTemplates[chatId] || this.getDefaultMessages();
    messagesArea.scrollTop = messagesArea.scrollHeight;
  }

  switchTab(tab) {
    // Remove active class from all tabs
    document.querySelectorAll('.chat-tab').forEach(t => {
      t.classList.remove('active');
    });
    
    // Add active class to clicked tab
    tab.classList.add('active');
    
    // Filter chat list based on tab
    const tabType = tab.dataset.tab;
    this.filterChatList(tabType);
  }

  filterChatList(type) {
    const chatItems = document.querySelectorAll('.chat-item');
    
    chatItems.forEach(item => {
      const chatId = item.dataset.chat;
      let shouldShow = false;
      
      switch(type) {
        case 'volunteers':
          shouldShow = chatId.includes('volunteer');
          break;
        case 'groups':
          shouldShow = chatId.includes('group');
          break;
        case 'ai':
          shouldShow = chatId.includes('ai');
          break;
        default:
          shouldShow = true;
      }
      
      item.style.display = shouldShow ? 'flex' : 'none';
    });
  }

  sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const messageText = messageInput.value.trim();
    
    if (!messageText) return;
    
    // Add user message to chat
    this.addMessageToChat('user', messageText);
    
    // Clear input
    messageInput.value = '';
    messageInput.style.height = 'auto';
    document.getElementById('sendBtn').disabled = true;
    
    // Simulate volunteer response after delay
    setTimeout(() => {
      this.simulateVolunteerResponse(messageText);
    }, 1000 + Math.random() * 2000);
  }

  addMessageToChat(type, text, avatar = null) {
    const messagesArea = document.getElementById('messagesArea');
    const messageDiv = document.createElement('div');
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    let avatarContent = '';
    let messageClass = type;
    
    if (type === 'user') {
      avatarContent = 'You';
    } else if (type === 'volunteer') {
      avatarContent = avatar || 'S';
    }
    
    messageDiv.className = `message ${messageClass}`;
    messageDiv.innerHTML = `
      <div class="message-avatar" style="background: var(--message-${type});">${avatarContent}</div>
      <div class="message-content">
        <div class="message-text">${text}</div>
        <div class="message-time">${timeStr}</div>
      </div>
    `;
    
    messagesArea.appendChild(messageDiv);
    messagesArea.scrollTop = messagesArea.scrollHeight;
  }

  searchChats(query) {
    const chatItems = document.querySelectorAll('.chat-item');
    
    chatItems.forEach(item => {
      const chatName = item.querySelector('.chat-name').textContent.toLowerCase();
      const chatPreview = item.querySelector('.chat-preview').textContent.toLowerCase();
      const searchTerm = query.toLowerCase();
      
      const matches = chatName.includes(searchTerm) || chatPreview.includes(searchTerm);
      item.style.display = matches ? 'flex' : 'none';
    });
  }

  handlePanicButton() {
    // Show immediate crisis resources
    const crisisMessage = this.currentLanguage === 'en' ? 
      "🚨 CRISIS RESOURCES:\n\n• National Suicide Prevention Lifeline: 988\n• Crisis Text Line: Text HOME to 741741\n• International Crisis Lines: befrienders.org\n\nYou are not alone. Help is available 24/7." :
      "🚨 संकट संसाधन:\n\n• राष्ट्रीय आत्महत्या रोकथाम लाइफलाइन: 988\n• संकट टेक्स्ट लाइन: HOME भेजें 741741\n\nआप अकेले नहीं हैं। 24/7 मदद उपलब्ध है।";
    
    alert(crisisMessage);
    
    // Add crisis message to current chat
    this.addMessageToChat('system', 'Crisis support resources have been sent to you. Please reach out for immediate help if needed.');
  }

  updateLanguage() {
    const t = translations[this.currentLanguage];
    
    // Update page elements
    document.getElementById('page-title').textContent = t.pageTitle;
    document.getElementById('sidebarLogo').textContent = t.sidebarLogo;
    document.getElementById('sidebarPortal').textContent = t.sidebarPortal;
    
    // Update navigation
    document.getElementById('navDashboard').textContent = t.navDashboard;
    document.getElementById('navMindfulness').textContent = t.navMindfulness;
    document.getElementById('navResources').textContent = t.navResources;
    document.getElementById('navSupportChat').textContent = t.navSupportChat;
    document.getElementById('navAppointments').textContent = t.navAppointments;
    document.getElementById('navProgress').textContent = t.navProgress;
    document.getElementById('navSettings').textContent = t.navSettings;
    document.getElementById('navLogout').textContent = t.navLogout;
    
    // Update chat interface
    document.getElementById('volunteersTab').textContent = t.volunteersTab;
    document.getElementById('groupsTab').textContent = t.groupsTab;
    document.getElementById('aiTab').textContent = t.aiTab;
    document.getElementById('safetyNotice').textContent = t.safetyNotice;
    document.getElementById('crisisBanner').innerHTML = t.crisisBanner;
    document.getElementById('chatSearchInput').placeholder = t.chatSearchPlaceholder;
    document.getElementById('messageInput').placeholder = t.messageInputPlaceholder;
    document.getElementById('panicButton').innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${t.panic}`;
    
    // Set language selector
    document.getElementById('languageSelect').value = this.currentLanguage;
  }

  showAlert(message) {
    // Create a better alert system
    const alertDiv = document.createElement('div');
    alertDiv.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, var(--accent-gradient-start), var(--accent-gradient-end));
      color: white;
      padding: 15px 20px;
      border-radius: 12px;
      box-shadow: 0 8px 25px var(--shadow-color);
      z-index: 3000;
      font-weight: 500;
      max-width: 300px;
    `;
    alertDiv.textContent = message;
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
      if (alertDiv.parentNode) {
        alertDiv.remove();
      }
    }, 3000);
  }
}
