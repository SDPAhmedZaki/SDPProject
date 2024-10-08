// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const jsonFilePath = path.join(__dirname, 'employeelist.json');
const usersFilePath = path.join(__dirname, 'users.json');

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// Sample route to handle employee data
app.get('/api/employees', (req, res) => {
    fs.readFile(jsonFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading employee data' });
        }
        res.json(JSON.parse(data));
    });
});

// Route to add a new employee
app.post('/api/employees', (req, res) => {
    const newEmployee = req.body;

    // Read the existing employees from the JSON file
    fs.readFile(jsonFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading employee data' });
        }

        const employees = JSON.parse(data);

        // Add the new employee to the array
        employees.push(newEmployee);

        // Write the updated employee data back to the JSON file
        fs.writeFile(jsonFilePath, JSON.stringify(employees, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error saving employee data' });
            }
            res.status(201).json(newEmployee); // Respond with the newly added employee
        });
    });
});

// Sample login route for user authentication
app.post('/api/login', (req, res) => {
    // Your existing login logic
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
