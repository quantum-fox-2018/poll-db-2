//your code here
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./databasevoting.db');

db.serialize(function() {

  db.run("CREATE TABLE Politicians (id INTEGER PRIMARY KEY AUTOINCREMENT,name VARCHAR(20),party VARCHAR(10),location VARCHAR(10),grade_current FLOAT)");
  db.run("CREATE TABLE Voters (id INTEGER PRIMARY KEY AUTOINCREMENT,first_name VARCHAR(20),last_name VARCHAR(20),gender VARCHAR(10),age VARCHAR(3))");
  db.run("CREATE TABLE Votes (id INTEGER PRIMARY KEY AUTOINCREMENT,votersId VARCHAR(3), politiciansId VARCHAR(3))");

});

db.close();
