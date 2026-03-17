// Dashboard functionality and interactions

// Mobile sidebar toggle
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('mobile-open');
}

// Panic button functionality
document.getElementById('panicButton').addEventListener('click', function() {
  // Create emergency modal or redirect to crisis support
  const confirmed = confirm("You've pressed the emergency button. Do you need immediate crisis support?");
  if (confirmed) {
    // Redirect to chat forum with emergency mode
    localStorage.setItem('emergencyMode', 'true');
    window.location.href = 'chat-forum.html?emergency=true';
  }
});

// Activity tracking system
class ActivityTracker {
  constructor() {
    this.activities = {
      breathing: parseInt(localStorage.getItem('breathing') || '0'),
      journaling: parseInt(localStorage.getItem('journaling') || '0'),
      mindfulness: parseInt(localStorage.getItem('mindfulness') || '0'),
      coping: parseInt(localStorage.getItem('coping') || '0'),
      meditation: parseInt(localStorage.getItem('meditation') || '0')
    };
    
    this.streak = parseInt(localStorage.getItem('dayStreak') || '0');
    this.stressLevel = parseInt(localStorage.getItem('stressLevel') || '5');
    
    this.updateDisplay();
  }

  updateDisplay() {
    // Update activity progress displays
    document.getElementById('breathing-progress').textContent = `${this.activities.breathing} Completed`;
    document.getElementById('journaling-progress').textContent = `${this.activities.journaling} Completed`;
    document.getElementById('mindfulness-progress').textContent = `${this.activities.mindfulness} Completed`;
    document.getElementById('coping-progress').textContent = `${this.activities.coping} Practiced`;
    document.getElementById('meditation-progress').textContent = `${this.activities.meditation} Attended`;
    
    // Update stats
    document.getElementById('streak-value').textContent = this.streak;
    document.getElementById('stress-level').textContent = this.stressLevel;
    
    // Update achievement based on total activities
    const totalActivities = Object.values(this.activities).reduce((sum, count) => sum + count, 0);
    let achievement = "Getting Started!";
    
    if (totalActivities >= 50) achievement = "Wellness Master! 🏆";
    else if (totalActivities >= 25) achievement = "Making Progress! 🌟";
    else if (totalActivities >= 10) achievement = "Well on Your Way! 📈";
    else if (totalActivities >= 5) achievement = "Building Habits! 💪";
    
    document.getElementById('achievement-text').textContent = achievement;
  }

  incrementActivity(activity) {
    if (this.activities.hasOwnProperty(activity)) {
      this.activities[activity]++;
      localStorage.setItem(activity, this.activities[activity].toString());
      this.updateDisplay();
      
      // Show success message
      this.showActivityFeedback(activity);
    }
  }

  showActivityFeedback(activity) {
    const messages = {
      breathing: "Great breathing exercise! 🌬️",
      journaling: "Wonderful journaling session! ✍️",
      mindfulness: "Mindful moment completed! 🧘",
      coping: "Coping skill practiced! 💪",
      meditation: "Meditation session finished! 🕉️"
    };

    // Create and show feedback message
    const feedback = document.createElement('div');
    feedback.className = 'activity-feedback';
    feedback.textContent = messages[activity];
    feedback.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, var(--accent-gradient-start), var(--accent-gradient-end));
      color: white;
      padding: 20px 30px;
      border-radius: 15px;
      font-weight: 600;
      font-size: 1.1rem;
      box-shadow: 0 10px 30px rgba(78, 205, 196, 0.3);
      z-index: 2000;
      animation: fadeInScale 0.3s ease-out;
    `;

    document.body.appendChild(feedback);

    // Remove after 2 seconds
    setTimeout(() => {
      if (feedback.parentNode) {
        feedback.style.animation = 'fadeOutScale 0.3s ease-out';
        setTimeout(() => feedback.remove(), 300);
      }
    }, 2000);
  }
}

// Activity click handler
function startActivity(activityType) {
  // Simulate activity completion (in real app, this would open the activity)
  const confirmStart = confirm(`Start ${activityType} activity?`);
  if (confirmStart) {
    // Simulate activity completion after a short delay
    setTimeout(() => {
      tracker.incrementActivity(activityType);
    }, 1000);
  }
}

// Stress level updater
function updateStressLevel() {
  const newLevel = prompt("Rate your current stress level (1-10):");
  if (newLevel && !isNaN(newLevel) && newLevel >= 1 && newLevel <= 10) {
    tracker.stressLevel = parseInt(newLevel);
    localStorage.setItem('stressLevel', tracker.stressLevel.toString());
    tracker.updateDisplay();
    
    // Provide feedback based on stress level
    let message = "";
    if (newLevel <= 3) message = "Great! Your stress levels are low. Keep it up! 😊";
    else if (newLevel <= 6) message = "Moderate stress detected. Consider some relaxation activities. 🌿";
    else message = "High stress levels. Please consider talking to a counselor or trying breathing exercises. 🆘";
    
    alert(message);
  }
}

// Add click handler to stress level card
document.getElementById('stress-level').addEventListener('click', updateStressLevel);

// Progress tracking
class ProgressTracker {
  constructor() {
    this.moodData = JSON.parse(localStorage.getItem('moodData') || '[]');
    this.goals = JSON.parse(localStorage.getItem('weeklyGoals') || '[]');
  }

  updateMoodProgress() {
    // Calculate mood progress percentage (simplified)
    const moodProgress = Math.min(this.moodData.length * 5, 100);
    const moodCircle = document.querySelector('.progress-circle');
    if (moodCircle) {
      moodCircle.style.background = `conic-gradient(var(--accent-gradient-start) ${moodProgress * 3.6}deg, var(--border-card) 0deg)`;
      moodCircle.querySelector('.progress-value').textContent = `${moodProgress}%`;
    }
  }

  updateGoalsProgress() {
    // Calculate goals progress percentage (simplified)
    const completedGoals = this.goals.filter(goal => goal.completed).length;
    const goalsProgress = this.goals.length > 0 ? Math.round((completedGoals / this.goals.length) * 100) : 50;
    const goalsCircles = document.querySelectorAll('.progress-circle');
    if (goalsCircles.length > 1) {
      const goalsCircle = goalsCircles[1];
      goalsCircle.style.background = `conic-gradient(#F7DC6F ${goalsProgress * 3.6}deg, var(--border-card) 0deg)`;
      goalsCircle.querySelector('.progress-value').textContent = `${goalsProgress}%`;
    }
  }
}

// Add CSS animation for feedback
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.8);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }
  
  @keyframes fadeOutScale {
    from {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
    to {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.8);
    }
  }
`;
document.head.appendChild(style);

// Initialize trackers when DOM is loaded
let tracker, progressTracker;

document.addEventListener('DOMContentLoaded', function() {
  tracker = new ActivityTracker();
  progressTracker = new ProgressTracker();
  progressTracker.updateMoodProgress();
  progressTracker.updateGoalsProgress();
  
  // Auto-hide sidebar on desktop
  if (window.innerWidth > 768) {
    document.getElementById('sidebar').classList.remove('mobile-open');
  }
});

// Handle window resize
window.addEventListener('resize', function() {
  if (window.innerWidth > 768) {
    document.getElementById('sidebar').classList.remove('mobile-open');
  }
});

// Auto-save streak daily (simplified - in real app, this would be server-side)
function checkDailyStreak() {
  const lastVisit = localStorage.getItem('lastVisitDate');
  const today = new Date().toDateString();
  
  if (lastVisit !== today) {
    // User visited today for first time
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (lastVisit === yesterday) {
      // Visited yesterday, increment streak
      tracker.streak++;
    } else if (lastVisit && lastVisit !== yesterday) {
      // Missed a day, reset streak
      tracker.streak = 1;
    } else {
      // First visit or no previous visit
      tracker.streak = 1;
    }
    
    localStorage.setItem('dayStreak', tracker.streak.toString());
    localStorage.setItem('lastVisitDate', today);
    tracker.updateDisplay();
  }
}

// Check streak on page load
checkDailyStreak();
