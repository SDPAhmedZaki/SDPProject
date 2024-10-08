// Function to show the selected section and hide others
function showSection(sectionId) {
    const sections = document.getElementsByClassName('content-section');
    for (let i = 0; i < sections.length; i++) {
        sections[i].style.display = 'none';
    }
    document.getElementById(sectionId).style.display = 'block';
}

// Fetch users from users.json
async function fetchUsers() {
    const response = await fetch('/users.json');
    const users = await response.json();
    return users;
}

// Login function
async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const users = await fetchUsers();

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
async function changePassword() {
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;

    const users = await fetchUsers();
    const username = sessionStorage.getItem('username');
    const user = users.find(user => user.username === username);

    if (user) {
        if (user.password === currentPassword && newPassword) {
            user.password = newPassword; // Update password in memory
            await updateUsers(users); // Update the JSON file
            alert('Password changed successfully!');
        } else {
            alert('Current password is incorrect or new password is not provided.');
        }
    } else {
        alert('User not found.');
    }
}

// Function to update users.json
async function updateUsers(users) {
    const response = await fetch('/update-users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(users)
    });

    if (!response.ok) {
        throw new Error('Failed to update users');
    }
}

// Change Theme Function
function changeTheme() {
    const theme = document.getElementById('theme').value;
    document.body.className = theme;  // Add theme class to the body

    alert(`Theme changed to ${theme}`);
}

// Add Employee function
function addEmployee(event) {
    event.preventDefault(); // Prevent the form from submitting the usual way

    // Get form values
    const name = document.getElementById('name').value;
    const startDate = document.getElementById('start-date').value;
    const dob = document.getElementById('dob').value;
    const position = document.getElementById('position').value;
    const permissions = document.getElementById('permissions').value;

    // Create a new row in the employee table
    const employeeTable = document.getElementById('employee-table').querySelector('tbody');
    const newRow = employeeTable.insertRow();

    // Insert new cells (columns) into the row
    const nameCell = newRow.insertCell(0);
    const startDateCell = newRow.insertCell(1);
    const dobCell = newRow.insertCell(2);
    const positionCell = newRow.insertCell(3);
    const permissionsCell = newRow.insertCell(4);

    // Add the form values to the respective cells
    nameCell.textContent = name;
    startDateCell.textContent = startDate;
    dobCell.textContent = dob;
    positionCell.textContent = position;
    permissionsCell.textContent = permissions;

    // Clear the form after submission
    document.getElementById('employee-form').reset();
}
