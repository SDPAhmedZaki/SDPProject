// server.js
const express = require('express');
const app = express();
const path = require('path');

// Middleware to serve static files
app.use(express.static(path.join(__dirname)));

// Sample route to handle employee data (you can extend this)
app.get('/api/employees', (req, res) => {
    const employees = [
        { id: 1, name: "Ahmed Zaki", role: "CEO" },
        { id: 2, name: "Anas Bendaoud", role: "Co-Owner" },
        { id: 3, name: "Yousef Moustafa", role: "bawab"},
        // Add more employees
    ];
    res.json(employees);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
