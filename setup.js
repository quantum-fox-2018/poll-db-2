const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('PollDB.db');

db.serialize(function() {
  db.run(`DROP TABLE IF EXISTS Politicians`);

  db.run(`DROP TABLE IF EXISTS Voters`);

  db.run(`DROP TABLE IF EXISTS Votes`);

  db.run(`CREATE TABLE Politicians (politicianId INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,party TEXT,location TEXT,gradeCurrent INTEGER)`);

  db.run(`CREATE TABLE Voters (votersId INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT,lastName TEXT,gender TEXT,age INTEGER)`);

  db.run(`CREATE TABLE Votes (votesId INTEGER PRIMARY KEY AUTOINCREMENT,
    voterId INTEGER,politicianId INTEGER)`);
});

db.close();
