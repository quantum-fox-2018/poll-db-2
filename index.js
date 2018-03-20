const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll.db')

db.serialize((err) => {
    if(err){
        console.log(err)
    }
    console.log('Successfully connected to poll.db')
    db.all(`SELECT name, location, grade_current, COUNT(Votes.politician_id) AS TotalVote
	FROM Politicians
	JOIN Votes
	ON Politicians.politician_id = Votes.politician_id
	WHERE grade_current < 9
	GROUP BY name
	ORDER BY TotalVote`, (err, data) => {
        if(err){
            console.log(err)
        }
        console.log('====================NO. 1======================')
        console.log(data)
    })

    db.all(`SELECT TotalVote, Politicians.name AS politicianName, 
	Voters.first_name ||' '||Voters.last_name AS voterName, Voters.gender
	FROM Votes
	JOIN (SElECT COUNT(*) AS TotalVote, politician_id
	FROM Votes
	GROUP BY politician_id
	ORDER BY COUNT(*)
	DESC LIMIT 3) AS Top3
	ON Votes.politician_id = Top3.politician_id
	LEFT JOIN Politicians
	ON Votes.politician_id = Politicians.politician_id
	LEFT JOIN Voters
	ON Votes.voter_id = Voters.voter_id`, (err, data) => {
        if(err){
            console.log(err)
        }
        console.log('====================NO. 2======================')
        console.log(data)
    })

    db.all(`SELECT COUNT(*) AS TotalVote, first_name||' '||last_name AS name, gender, age
	FROM Votes
	JOIN Voters
	ON Votes.voter_id = Voters.voter_id
	GROUP BY name
	HAVING TotalVote > 1
	ORDER BY TotalVote DESC`, (err, data) => {
        if(err){
            console.log(err)
        }
        console.log('====================NO. 3======================')
        console.log(data)
    })
})

db.close((err) => {
    if(err){
      console.log(err)
    }
    console.log('Close database poll.db connection')
})