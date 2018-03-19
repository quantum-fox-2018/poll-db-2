//your code here
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const db = new sqlite3.Database('./poll1.db', (err) => {
    if (err) {
      return console.error('Connect',err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});

// CREATE TABLE
db.serialize(function() {
    db.run("DROP TABLE IF EXISTS Politicians");
    db.run("DROP TABLE IF EXISTS Votes");
    db.run("DROP TABLE IF EXISTS Voters");
    db.run(`CREATE TABLE Politicians (politicianId INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,party,location TEXT,grade_current REAL)`);    
    db.run(`CREATE TABLE Voters (voterId INTEGER PRIMARY KEY AUTOINCREMENT,first_name TEXT,last_name TEXT,gender TEXT,age INTEGER)`);    
    db.run(`CREATE TABLE Votes (voteId INTEGER PRIMARY KEY AUTOINCREMENT, voterId INTEGER, politicianId INTEGER, FOREIGN KEY (voterId) REFERENCES Voters(voterId), FOREIGN KEY (politicianId) REFERENCES Politicians(politicianId))`);
});


db.close((err) => {
    if (err) {
      return console.error('Close',err.message);
    }
    console.log('Close the database connection.');
});