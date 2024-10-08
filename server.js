const express = require('express');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Route to handle user login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    fs.readFile('users.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading users file.');
        }
        const users = JSON.parse(data);
        const user = users.find(u => u.username === username);
        if (user) {
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (isMatch) {
                    return res.status(200).send('Login successful!');
                } else {
                    return res.status(401).send('Invalid credentials.');
                }
            });
        } else {
            return res.status(404).send('User not found.');
        }
    });
});

// Route to change user password
app.post('/change-password', (req, res) => {
    const { username, newPassword } = req.body;
    fs.readFile('users.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading users file.');
        }
        const users = JSON.parse(data);
        const userIndex = users.findIndex(u => u.username === username);
        if (userIndex !== -1) {
            const hashedPassword = bcrypt.hashSync(newPassword, 10);
            users[userIndex].password = hashedPassword;
            fs.writeFile('users.json', JSON.stringify(users), (err) => {
                if (err) {
                    return res.status(500).send('Error updating password.');
                }
                return res.status(200).send('Password changed successfully.');
            });
        } else {
            return res.status(404).send('User not found.');
        }
    });
});

// Route to handle adding an employee
app.post('/add-employee', (req, res) => {
    const { name, role } = req.body;
    fs.readFile('employeelist.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading employee list.');
        }
        const employees = JSON.parse(data);
        const newEmployee = { id: employees.length + 1, name, role };
        employees.push(newEmployee);
        fs.writeFile('employeelist.json', JSON.stringify(employees), (err) => {
            if (err) {
                return res.status(500).send('Error adding employee.');
            }
            return res.status(200).send('Employee added successfully.');
        });
    });
});

// Route to retrieve the employee list
app.get('/api/employees', (req, res) => {
    fs.readFile('employeelist.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading employee list.');
        }
        const employees = JSON.parse(data);
        res.json(employees);
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
