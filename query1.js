const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const db = new sqlite3.Database('./poll1.db', (err) => {
    if (err) {
      return console.error('Connect',err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});

//QUERY FILE POLDB-2
// RELEASE 0-1

let query1 = `SELECT Politicians.name,Politicians.location,Politicians.grade_current,COUNT(*) AS totalVote
FROM Politicians
JOIN Votes ON Politicians.politicianId = Votes.politicianId
WHERE Politicians.grade_current < 9
GROUP BY Politicians.politicianId
ORDER BY Politicians.grade_current ASC`;

db.all(query1, function(err, row) {
    // console.log(row);
});


// RELEASE 0-2

let query2 = `SELECT tableMax3.totalVote,tableMax3.politicianName, Voters.first_name || " " || Voters.last_name AS voterName, Voters.gender
FROM

(SELECT COUNT(*) AS totalVote, Politicians.politicianId,Politicians.name AS politicianName
FROM Politicians
JOIN Votes ON Politicians.politicianId = Votes.politicianId
GROUP BY Politicians.politicianId
ORDER BY totalVote DESC
LIMIT 3) AS tableMax3

JOIN Votes ON tableMax3.politicianId = Votes.politicianId
JOIN Voters ON Votes.voterId = Voters.voterId

ORDER BY tableMax3.politicianName DESC`;

db.all(query2, function(err, row) {
    // console.log(row);
});


// RELEASE 0-3

let query3 = `SELECT tableCheater.totalVote,Voters.first_name || " " || Voters.last_name AS name, Voters.gender, Voters.age
FROM

(SELECT COUNT(*) AS totalVote, voteId, voterId, politicianId
FROM Votes
GROUP BY voterId
HAVING totalVote > 1
ORDEr BY totalVote DESC) AS tableCheater

JOIN Voters ON tableCheater.voterId = Voters.voterId;`;

db.all(query3, function(err, row) {
    console.log(row);
});



db.close((err) => {
    if (err) {
      return console.error('Close',err.message);
    }
    console.log('Close the database connection.');
});