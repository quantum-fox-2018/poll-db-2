const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

const fs = require('fs');

db.serialize(function() {
  // db.run("CREATE TABLE IF NOT EXISTS Politicians (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(30), party VARCHAR(5), location VARCHAR(10), grade_current INTEGER);")
  //
  // db.run("CREATE TABLE IF NOT EXISTS Voters (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name VARCHAR(30), last_name VARCHAR(30), gender VARCHAR(10), age INTEGER);")
  //
  // db.run("CREATE TABLE IF NOT EXISTS Votes (id INTEGER PRIMARY KEY AUTOINCREMENT, voterId INTEGER, politicianId INTEGER);")
  //
  // fs.readFile('./politicians.csv', 'utf8', (err, data) => {
  //   let politicians = data.split("\n")
  //
  //   for (var i = 0; i < politicians.length-1; i++) {
  //     let info = politicians[i].split(',')
  //     if (i !== 0) {
  //       db.run("INSERT INTO Politicians VALUES (NULL, ?, ?, ?, ?)", [info[0], info[1], info[2], info[3]])
  //     }
  //   }
  //   // db.close();--------------------------------
  // });
  //
  // fs.readFile('./voters.csv', 'utf8', (err, data) => {
  //   let voters = data.split("\n")
  //
  //   for (var i = 0; i < voters.length-1; i++) {
  //     let info = voters[i].split(',')
  //     if (i !== 0) {
  //       db.run("INSERT INTO Voters VALUES (NULL, ?, ?, ?, ?)", [info[0], info[1], info[2], info[3]])
  //     }
  //   }
  // });
  //
  // fs.readFile('./votes.csv', 'utf8', (err, data) => {
  //   let votes = data.split("\n")
  //
  //   for (var i = 0; i < votes.length-1; i++) {
  //     let info = votes[i].split(',')
  //     if (i !== 0) {
  //       db.run("INSERT INTO Votes VALUES (NULL, ?, ?)", [info[0], info[1]])
  //     }
  //   }
  //   db.close();
  // });

  //1.
  db.all("select name, party, grade_current from Politicians where party = 'R' and grade_current between 9 and 11;", function(err, row) {
    console.log(row);
  });

  //2.
  db.all("select count(*) as totalVote, Politicians.name from Politicians join Votes on Politicians.id = Votes.politicianId where Politicians.name = 'Olympia Snowe';", function(err, row) {
    console.log(row);
  });

  // db.each("select (select count(*) from Votes where politicianId = Politicians.id) as totalVote, name from Politicians join Votes on Votes.politicianId = Politicians.id where Politicians.name = 'Olympia Snowe' GROUP BY Politicians.name;", function(err, row) {
  //   console.log(row);
  // });

  //3.
  db.all("SELECT count(*) as totalVote, Politicians.name from Votes join Politicians on Votes.politicianId = Politicians.id where Politicians.name like 'Adam %' group by politicianId;", function(err, row) {
    console.log(row);
  });

  // cara:
//   SELECT count(*), politicianId from Votes group by politicianId;
//   SELECT count(*), politicianId from Votes join Politicians on Votes.politicianId = Politicians.id group by politicianId;
//   SELECT count(*), Politicians.name from Votes join Politicians on Votes.politicianId = Politicians.id group by politicianId;
//   SELECT count(*), Politicians.name from Votes join Politicians on Votes.politicianId = Politicians.id where Politicians.name like 'Adam %' group by
// politicianId;

  //4.
  db.all("SELECT count(*) as totalVote, Politicians.name, Politicians.party, Politicians.location from Votes join Politicians on Votes.politicianId = Politicians.id group by politicianId order by totalVote desc limit 3;", function(err, row) {
    console.log(row);
  });

  //5.
  db.all("select first_name, last_name, gender, age from Voters join Votes on Voters.id = Votes.voterId where Votes.politicianId =(select Politicians.id from Politicians where name = 'Olympia Snowe');", function(err, row) {
    console.log(row);
  });

  //1.2.
  db.all("select Politicians.name, Politicians.location, Politicians.grade_current, count(*) as totalVote from Votes join Politicians on Votes.politicianId = Politicians.id where Politicians.grade_current <= 9 group by politicianId order by Politicians.grade_current asc;", function(err, row) {
    console.log(row);
  });

  //2.2

  //3.2
  db.all("SELECT COUNT(Votes.voterId) as totalVote, (select Voters.first_name||' '|| Voters.last_name) as name, gender, age FROM Voters JOIN Votes ON Voters.id = Votes.voterId group by Votes.voterId having totalVote > 1 order by totalVote desc;", function(err, row) {
    console.log(row);
  });


  // select first_name, last_name, gender, age from Voters join Votes on Voters.id = Votes.voterId where Votes.politicianId =
});
