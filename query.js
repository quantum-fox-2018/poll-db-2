const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const db = new sqlite3.Database('./poll1.db', (err) => {
    if (err) {
      return console.error('Connect',err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});

//QUERY FILE
// RELEASE 3-1

let query1 = `SELECT Politicians.name,Politicians.party,Politicians.grade_current
FROM Politicians
WHERE Politicians.grade_current BETWEEN 9 AND 11 AND Politicians.party = 'R'`;

db.each(query1, function(err, row) {
    // console.log(row);
});

// RELEASE 3-2
let query2 = `SELECT COUNT(*) AS TotalVote, Politicians.name
FROM Politicians
JOIN Votes ON Politicians.politicianId = Votes.politicianId
WHERE Politicians.name LIKE "%olympia snowe%";`;

db.each(query2, function(err, row) {
    // console.log(row);
});

// RELEASE 3-3
let query3 = `SELECT Politicians.name,COUNT(*) AS TotalVote
FROM Politicians
JOIN Votes ON Politicians.politicianId = Votes.politicianId
WHERE Politicians.name LIKE "adam%"
GROUP BY Politicians.politicianId`;

db.each(query3, function(err, row) {
    // console.log(row);
});

// RELEASE 3-4
let query4 = `SELECT COUNT(*) AS totalVote, Politicians.name, Politicians.party, Politicians.location
FROM Politicians
JOIN Votes ON Politicians.politicianId = Votes.politicianId
GROUP BY Politicians.politicianId
ORDER BY totalVote DESC
LIMIT 3;`;

db.each(query4, function(err, row) {
    // console.log(row);
});

// RELEASE 3-5
let query5 = `SELECT Voters.first_name,Voters.last_name,Voters.gender,Voters.age
FROM Politicians
JOIN Votes ON Politicians.politicianId = Votes.politicianId
JOIN Voters ON Votes.voterId = Voters.voterId
WHERE Politicians.name LIKE "%snowe%"`;

db.each(query5, function(err, row) {
    console.log(row);
});









db.close((err) => {
    if (err) {
      return console.error('Close',err.message);
    }
    console.log('Close the database connection.');
});