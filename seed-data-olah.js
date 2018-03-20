/*jshint esversion:6*/
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('../poll-db-1/polling.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});


//=====================
// 1.
db.all(`SELECT candidate_name AS name, location, grade_current, COUNT(*) AS totalVote FROM Votes
            LEFT JOIN Candidates ON Candidates.candidate_id = Votes.candidate_id
            WHERE grade_current < 9
            GROUP BY name
            ORDER BY grade_current ASC
            LIMIT 3`, (err, dataPolls) => {
  if (err) throw err;
  else {
    console.log(dataPolls);
  }
});
//=====================
// 2.
db.all(`SELECT totalVote, candidate_name AS politicianName, first_name||' '||last_name AS voterName, gender
            FROM (SELECT COUNT(*) As totalVotes, candidate_name AS candidate_name, Candidates.candidate_id FROM Votes
            LEFT JOIN Candidates ON Candidates.candidate_id = Votes.candidate_id
            GROUP BY candidate_name
            ORDER BY totalVote DESC
            LIMIT 3) AS topThreeVote
            LEFT JOIN Votes ON Votes.candidate_id = topThreeVote.candidate_id
            LEFT JOIN Voters ON Voters.voter_id = Votes.voter_id`, (err, dataPolls) => {
  if (err) throw err;
  else {
    console.log(dataPolls);
  }
});

//=====================
// 3.
db.all(`SELECT COUNT(*) AS totalVote, first_name||' '||last_name AS name, gender, age FROM Votes
            LEFT JOIN Voters ON Voters.voter_id = Votes.voter_id
            GROUP BY name
            HAVING totalVotes > 1
            ORDER BY totalVotes DESC`, (err, dataPolls) => {
  if (err) throw err;
  else {
    console.log(dataPolls);
  }
});


db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});
