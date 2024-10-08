// server.js
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Middleware to serve static files and parse JSON
app.use(express.static(path.join(__dirname)));
app.use(express.json()); // To parse JSON body in requests

// Route to fetch users from users.json
app.get('/api/users', (req, res) => {
    fs.readFile('users.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading user list');
        }
        res.json(JSON.parse(data));
    });
});

// Route to fetch employee list from employeelist.json
app.get('/api/employees', (req, res) => {
    fs.readFile('employeelist.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading employee list');
        }
        res.json(JSON.parse(data));
    });
});

// Route to add a new employee to employeelist.json
app.post('/api/add-employee', (req, res) => {
    const newEmployee = req.body;

    // Read existing employees
    fs.readFile('employeelist.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading employee list');
        }

        const employees = JSON.parse(data);
        employees.push(newEmployee); // Add the new employee to the list

        // Write the updated list back to employeelist.json
        fs.writeFile('employeelist.json', JSON.stringify(employees, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error saving employee list');
            }
            res.status(201).json(newEmployee); // Respond with the newly added employee
        });
    });
});

// Route to update the user's password
app.post('/api/update-password', (req, res) => {
    const { username, newPassword } = req.body;

    // Read existing users
    fs.readFile('users.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading user list');
        }

        let users = JSON.parse(data);
        const userIndex = users.findIndex(user => user.username === username);

        if (userIndex !== -1) {
            users[userIndex].password = newPassword; // Update the password

            // Write the updated user list back to users.json
            fs.writeFile('users.json', JSON.stringify(users, null, 2), (err) => {
                if (err) {
                    return res.status(500).send('Error saving user list');
                }
                res.status(200).send('Password updated successfully');
            });
        } else {
            res.status(404).send('User not found');
        }
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
