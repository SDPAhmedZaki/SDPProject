// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const usersFilePath = path.join(__dirname, 'users.json');
const employeesFilePath = path.join(__dirname, 'employeelist.json');

// Middleware to serve static files
app.use(express.static(path.join(__dirname)));

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Function to read users from JSON file
function readUsers() {
    try {
        const data = fs.readFileSync(usersFilePath);
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading users:', error);
        return [];
    }
}

// Function to write users to JSON file
function writeUsers(users) {
    try {
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    } catch (error) {
        console.error('Error writing users:', error);
    }
}

// Function to read employees from JSON file
function readEmployees() {
    try {
        const data = fs.readFileSync(employeesFilePath);
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading employee list:', error);
        return [];
    }
}

// Function to write employees to JSON file
function writeEmployees(employees) {
    try {
        fs.writeFileSync(employeesFilePath, JSON.stringify(employees, null, 2));
    } catch (error) {
        console.error('Error writing employee list:', error);
    }
}

// Authentication route
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const users = readUsers();
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        res.json({ message: 'Login successful' });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

// Change password route
app.put('/api/users/:username/password', (req, res) => {
    const { username } = req.params;
    const { newPassword } = req.body;
    const users = readUsers();
    
    const userIndex = users.findIndex(u => u.username === username);
    
    if (userIndex !== -1) {
        users[userIndex].password = newPassword;
        writeUsers(users);
        res.json({ message: 'Password changed successfully' });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// Sample route to handle employee data
app.get('/api/employees', (req, res) => {
    const employees = readEmployees();
    res.json(employees);
});

// Route to add an employee
app.post('/api/employees', (req, res) => {
    const newEmployee = req.body; // Assuming new employee is sent in the request body
    const employees = readEmployees();

    // Check if employee already exists (based on some unique attribute, e.g., name)
    if (employees.find(emp => emp.name === newEmployee.name)) {
        return res.status(400).json({ error: 'Employee already exists' });
    }

    // Add the new employee to the list
    employees.push(newEmployee);
    writeEmployees(employees);

    res.status(201).json(newEmployee); // Respond with the added employee
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
