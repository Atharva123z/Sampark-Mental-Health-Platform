// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

// Update icon visibility based on current theme
function updateIcon() {
  const theme = html.getAttribute('data-theme');
  if (theme === 'dark') {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
  } else {
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
  }
}

// Initialize icon state
updateIcon();

// Toggle theme function with smooth transition
function toggleTheme() {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  // Add a subtle scale effect during transition
  themeToggle.style.transform = 'scale(0.9) rotate(180deg)';
  
  setTimeout(() => {
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcon();
    
    // Reset the transform
    setTimeout(() => {
      themeToggle.style.transform = '';
    }, 200);
  }, 100);
}

// Add click event listener to toggle button
themeToggle.addEventListener('click', toggleTheme);

// Optional: Add keyboard support
themeToggle.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggleTheme();
  }
});
