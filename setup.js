//your code here
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./poll-db-2.db');

db.serialize(function(){
  db.run("CREATE TABLE politicians (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(50), party VARCHAR(50), location VARCHAR(50), grade_current INTEGER)");
  db.run("CREATE TABLE voters (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name VARCHAR(50), last_name VARCHAR(50), gender VARCHAR(50), age INTEGER)");
  db.run("CREATE TABLE votes (id INTEGER PRIMARY KEY AUTOINCREMENT, voterId INTEGER, politicianId INTEGER)");


})
db.close();
