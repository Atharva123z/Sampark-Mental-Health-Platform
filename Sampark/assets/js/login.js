// User management and login functionality
const roleSelect = document.getElementById("role-select");
const form = document.querySelector("form");

// Store users in localStorage
let users = JSON.parse(localStorage.getItem("users")) || {};

// Handle signup functionality
document.querySelector("#signup-text").parentElement.querySelector("a").addEventListener("click", (e) => {
  e.preventDefault();
  
  const username = prompt("Enter a username:");
  if (!username) return;
  
  if (users[username]) {
    alert("This username already exists. Please log in.");
    return;
  }
  
  const password = prompt("Create a password:");
  if (!password) return;
  
  users[username] = password;
  localStorage.setItem("users", JSON.stringify(users));
  alert("Account created successfully! Please log in.");
});

// Form submission with role-based redirection and password validation
form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const role = roleSelect.value;
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  // Check credentials
  if (!users[username] || users[username] !== password) {
    alert("Invalid username or password!");
    return;
  }

  // Store user session data
  localStorage.setItem("currentUser", username);
  localStorage.setItem("userRole", role);

  // Successful login → redirect by role
  switch(role) {
    case 'student':
      window.location.href = 'student.html';
      break;
    case 'counselor':
      window.location.href = 'counselor.html';
      break;
    case 'admin':
      window.location.href = 'admin.html';
      break;
    default:
      window.location.href = 'student.html';
  }
});

// Password reset functionality
document.querySelector("#forgot-text").parentElement.querySelector("a").addEventListener("click", (e) => {
  e.preventDefault();
  
  const username = prompt("Enter your username:");
  if (!username) return;
  
  if (!users[username]) {
    alert("Username not found!");
    return;
  }
  
  const newPassword = prompt("Enter your new password:");
  if (!newPassword) return;
  
  users[username] = newPassword;
  localStorage.setItem("users", JSON.stringify(users));
  alert("Password reset successfully! You can now log in with your new password.");
});

// Auto-login for development (optional - remove in production)
function createDemoUsers() {
  if (Object.keys(users).length === 0) {
    users = {
      "student": "student123",
      "counselor": "counselor123", 
      "admin": "admin123"
    };
    localStorage.setItem("users", JSON.stringify(users));
    console.log("Demo users created: student/student123, counselor/counselor123, admin/admin123");
  }
}

// Initialize demo users on page load (remove in production)
window.addEventListener("load", () => {
  createDemoUsers();
});
