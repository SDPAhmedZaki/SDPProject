// server.js
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Middleware to serve static files and parse JSON requests
app.use(express.static(path.join(__dirname)));
app.use(express.json());

// Sample route to handle employee data (you can extend this)
app.get('/api/employees', (req, res) => {
    const employees = [
        { id: 1, name: "Ahmed Zaki", role: "CEO" },
        { id: 2, name: "Anas Bendaoud", role: "Co-Owner" },
        { id: 3, name: "Yousef Moustafa", role: "bawab" },
        // Add more employees
    ];
    res.json(employees);
});

// Route to fetch users from users.json
app.get('/users.json', (req, res) => {
    fs.readFile('users.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading user data');
        }
        res.json(JSON.parse(data));
    });
});

// Update users route to change the password
app.post('/update-users', (req, res) => {
    const users = req.body;

    fs.writeFile('users.json', JSON.stringify(users, null, 2), (err) => {
        if (err) {
            return res.status(500).send('Error writing to file');
        }
        res.sendStatus(200);
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
