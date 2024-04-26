const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// Connect to SQLite database
const db = new sqlite3.Database('temperatures.db');

// Handle requests for weekly averages
app.get('/weekly', (req, res) => {
    db.all("SELECT strftime('%W', date) AS week, AVG(temperature) AS avg_temperature FROM temperatures GROUP BY week ORDER BY week", (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(rows);
        }
    });
});

// Handle requests for monthly averages
app.get('/monthly', (req, res) => {
    db.all("SELECT strftime('%Y-%m', date) AS month, AVG(temperature) AS avg_temperature FROM temperatures GROUP BY month ORDER BY month", (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(rows);
        }
    });
});

// Handle requests for yearly averages
app.get('/yearly', (req, res) => {
    db.all("SELECT strftime('%Y', date) AS year, AVG(temperature) AS avg_temperature FROM temperatures GROUP BY year ORDER BY year", (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(rows);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
