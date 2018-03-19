var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./poll.db');

db.serialize(function() {
  db.all(`
    SELECT Politicians.name, Politicians.location, Politicians.grade_current, COUNT(*) AS totalVote 
    FROM Votes
    JOIN Politicians
    ON Politicians.politicianId = Votes.politicianId
    GROUP BY Votes.politicianId
    HAVING Politicians.grade_current < 9
    ORDER BY Politicians.grade_current;
  `, function(err, rows) {
      if(err) throw err
      console.log('=====SOAL 1=====');
      console.log(rows);
  });

  db.all(`
    SELECT
        table2.totalVote AS totalVote,
        table2.politicianName AS politicianName,
        Voters.first_name||' '||Voters.last_name AS voterName,
        Voters.gender
    FROM 
        (SELECT COUNT(*) AS totalVote,
            Politicians.name AS politicianName,
            Politicians.politicianId AS politicianId
        FROM Votes
        JOIN Politicians
        ON Politicians.politicianId = Votes.politicianId
        GROUP BY Politicians.politicianId
        ORDER BY totalVote DESC
        LIMIT 3) AS table2
    JOIN Votes
    ON Votes.politicianId = table2.politicianId
    JOIN Voters
    ON Voters.voterId = Votes.voterId
    ORDER BY totalVote DESC
  `, function(err, rows) {
      if(err) throw err
      console.log('=====SOAL 2=====');
      console.log(rows);
  });
  
  db.all(`
    SELECT COUNT(*) AS totalVote, Voters.first_name||' '||Voters.last_name AS name, Voters.gender, Voters.age
    FROM Votes
    JOIN Voters
    ON Voters.voterId = Votes.voterId
    GROUP BY Votes.voterId
    HAVING totalVote > 1
    ORDER BY totalVote DESC
  `, function(err, rows) {
      if(err) throw err
      console.log('=====SOAL 3=====');
      console.log(rows);
  });
});

db.close();
