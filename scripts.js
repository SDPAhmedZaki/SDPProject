// Function to show the selected section and hide others
function showSection(sectionId) {
    const sections = document.getElementsByClassName('content-section');
    for (let i = 0; i < sections.length; i++) {
        sections[i].style.display = 'none';
    }
    document.getElementById(sectionId).style.display = 'block';
}

// Login function
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const users = [{ username: 'Anas', password: '12345' }];

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        sessionStorage.setItem('username', username);
        window.location.href = 'dashboard.html';
    } else {
        alert('Invalid credentials, please try again.');
    }
}

// Logout function
function logout() {
    sessionStorage.removeItem('username');
    window.location.href = 'index.html';
}

// Check login status
function checkLogin() {
    const username = sessionStorage.getItem('username');
    if (!username) {
        window.location.href = 'index.html';
    } else {
        document.getElementById('welcome-msg').textContent = `Welcome, ${username}!`;
    }
}

// Save Profile Information
function saveProfile() {
    const name = document.getElementById('profile-name').value;
    const email = document.getElementById('profile-email').value;

    alert(`Profile updated!\nName: ${name}\nEmail: ${email}`);
}

// Change Password Function
function changePassword() {
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;

    if (currentPassword && newPassword) {
        alert('Password changed successfully!');
    } else {
        alert('Please fill in all fields.');
    }
}

// Change Theme Function
function changeTheme() {
    const theme = document.getElementById('theme').value;
    document.body.className = theme;  // Add theme class to the body

    alert(`Theme changed to ${theme}`);
}
