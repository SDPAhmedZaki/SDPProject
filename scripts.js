// scripts.js

// Function to handle user login
function handleLogin(event) {
    event.preventDefault(); // Prevent default form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Login failed');
        }
        return response.json();
    })
    .then(data => {
        console.log(data.message);
        // Handle successful login (e.g., redirect to dashboard)
        window.location.href = 'dashboard.html'; // Change this to your dashboard page
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Invalid username or password.');
    });
}

// Function to handle password change
function handleChangePassword(event) {
    event.preventDefault(); // Prevent default form submission

    const username = document.getElementById('username').value; // Assuming the username is stored
    const newPassword = document.getElementById('newPassword').value;

    fetch(`/api/users/${username}/password`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newPassword })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Password change failed');
        }
        return response.json();
    })
    .then(data => {
        console.log(data.message);
        alert('Password changed successfully!');
        // Optionally, clear the password fields
        document.getElementById('newPassword').value = '';
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to change password. Please try again.');
    });
}

// Function to handle adding a new employee
function handleAddEmployee(event) {
    event.preventDefault(); // Prevent default form submission

    const employeeName = document.getElementById('employeeName').value;
    const employeeRole = document.getElementById('employeeRole').value;

    const newEmployee = { name: employeeName, role: employeeRole };

    fetch('/api/employees', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEmployee)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to add employee');
        }
        return response.json();
    })
    .then(data => {
        console.log('Employee added:', data);
        alert('Employee added successfully!');
        // Optionally, update the employee list on the page
        loadEmployeeList();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to add employee. Please try again.');
    });
}

// Function to load employee list from server
function loadEmployeeList() {
    fetch('/api/employees')
        .then(response => response.json())
        .then(data => {
            const employeeList = document.getElementById('employeeList');
            employeeList.innerHTML = ''; // Clear current list

            data.forEach(employee => {
                const li = document.createElement('li');
                li.textContent = `${employee.name} - ${employee.role}`;
                employeeList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error loading employee list:', error);
        });
}

// Event listeners for the login form and other actions
document.getElementById('loginForm').addEventListener('submit', handleLogin);
document.getElementById('changePasswordForm').addEventListener('submit', handleChangePassword);
document.getElementById('addEmployeeForm').addEventListener('submit', handleAddEmployee);

// Load employee list on page load (if applicable)
document.addEventListener('DOMContentLoaded', loadEmployeeList);
