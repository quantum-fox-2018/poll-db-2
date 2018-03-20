//your code here
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll.db');
 db.serialize(function () {
    //no 1
    db.all(`SELECT politicians.name, politicians.location, politicians.grade_current, count(votes.politicianId) AS totalVote
            FROM politicians JOIN votes ON politicians.politicianId = votes.politicianId where politicians.grade_current < 9
            GROUP BY politicians.name
            ORDER BY totalVote ASC`, function (err, rows) {
           console.log(rows);
    });
      //no 2
     db.all(`SELECT newTable.maxVot, newTable.name AS politicianName, voters.first_name || ' ' || voters.last_name AS voterName, voters.gender  FROM
            (SELECT politicians.politicianId,count(votes.politicianId)as maxVot,politicians.name
             from politicians join votes ON politicians.politicianId = votes.politicianId
             group by politicians.politicianId
             order by maxVot desc
             LIMIT 3) as newTable JOIN votes ON votes.politicianId = newTable.politicianId
             JOIN voters ON voters.voterId = votes.voterId
             ORDER by maxVot DESC, newTable.name DESC`, function (err, rows) {
            console.log(rows);
     });
     // no 3
     db.all(`SELECT COUNT (votes.voterId) as totalVote, voters.first_name || ' ' || voters.last_name AS name,voters.gender, voters.age
            FROM voters JOIN votes ON votes.voterId = voters.voterId
            GROUP BY name HAVING totalVote > 1
            ORDER by totalVote DESC`, function (err, rows) {
            console.log(rows);
     });
 });
 db.close();
