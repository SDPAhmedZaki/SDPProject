// Check login status
function checkLogin() {
    const isLoggedIn = sessionStorage.getItem('loggedIn');
    if (!isLoggedIn) {
        window.location.href = 'login.html'; // Redirect to login page
    } else {
        document.getElementById('welcome-msg').innerText = `Welcome, ${sessionStorage.getItem('username')}!`;
    }
}

// Show selected section
function showSection(section) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(s => {
        s.style.display = 'none';
    });
    document.getElementById(section).style.display = 'block';
}

// Logout function
function logout() {
    sessionStorage.clear();
    window.location.href = 'login.html'; // Redirect to login page
}

// Fetch employee data
function fetchEmployees() {
    fetch('employeelist.json')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('employee-table').getElementsByTagName('tbody')[0];
            tableBody.innerHTML = ''; // Clear existing entries

            data.forEach(employee => {
                const row = tableBody.insertRow();
                row.insertCell(0).innerText = employee.name;
                row.insertCell(1).innerText = employee.startDate;
                row.insertCell(2).innerText = employee.dob;
                row.insertCell(3).innerText = employee.position;
                row.insertCell(4).innerText = employee.permissions;
            });
        });
}

// Add a new employee
function addEmployee(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const startDate = document.getElementById('start-date').value;
    const dob = document.getElementById('dob').value;
    const position = document.getElementById('position').value;
    const permissions = document.getElementById('permissions').value;

    // Create employee object
    const newEmployee = {
        name: name,
        startDate: startDate,
        dob: dob,
        position: position,
        permissions: permissions,
    };

    // Fetch existing employees, add new employee, and save back
    fetch('employeelist.json')
        .then(response => response.json())
        .then(data => {
            data.push(newEmployee); // Add new employee
            return fetch('employeelist.json', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        })
        .then(() => {
            alert('Employee added successfully!');
            fetchEmployees(); // Refresh the employee table
        });
}

// Change user password
function changePassword() {
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;

    // Fetch users and check current password
    fetch('users.json')
        .then(response => response.json())
        .then(users => {
            const username = sessionStorage.getItem('username');
            const user = users.find(u => u.username === username);
            if (user && user.password === currentPassword) {
                user.password = newPassword; // Update password

                // Save updated user list
                return fetch('users.json', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(users)
                });
            } else {
                alert('Current password is incorrect!');
            }
        })
        .then(() => {
            alert('Password changed successfully!');
        });
}

// On window load, fetch employees
window.onload = function() {
    fetchEmployees();
};
