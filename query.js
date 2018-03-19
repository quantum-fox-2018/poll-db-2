//1. Berapa banyak vote yang diterima politicians yang memiliki grade di bawah 9
   `SELECT politicians.name, politicians.location, politicians.grade_current, count(*) AS totalVote
    FROM politicians JOIN votes ON politicians.id = votes.politicianId
    GROUP BY politicians.name ORDER BY politicians.grade_current ASC LIMIT 3;`

//2. Tampilkan 3 politicians yang memiliki vote terbanyak dan siapa saja yang memilih politician tersebut.
   `SELECT (SELECT count(*) FROM votes WHERE politicianId = politicians.id GROUP BY votes.politicianId) AS totalVote,
  	politicians.name AS politicianName, (voters.first_name||" "||voters.last_name) AS voterName,
  	voters.gender from voters
  	JOIN votes
      ON voters.id = votes.voterID
  	JOIN politicians
      ON votes.politicianId = politicians.id
  	WHERE totalVote IN (SELECT COUNT(*) AS totalvote FROM politicians
  	JOIN votes ON politicians.id = votes.politicianId
  	GROUP BY politicians.id ORDER BY totalvote DESC LIMIT 3) ORDER BY politicianName DESC;`

//3.List nama orang - orang yang melakukan kecurangan / totalVote lebih dari 1
  `SELECT (SELECT COUNT(*) AS totalVote FROM votes WHERE voterID = voters.id) AS totalVote,
   (voters.first_name||" "||voters.last_name) AS name, voters.gender, voters.age
   FROM votes JOIN voters ON votes.voterID = voters.id
   WHERE totalVote > 1 GROUP BY name ORDER BY totalVote DESC;`
