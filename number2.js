var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('dataPoll.db');

function showDb(){
    db.all(`SELECT * from Politicians`,function(err, result){
        if(err){
            console.log(err);
        }else{
            console.log(result);
        }
    })
}

function number1(){
    db.all(`SELECT Politicians.name, Politicians.location, Politicians.grade_current, COUNT(Votes.politicianId) AS totalVotes
            FROM Politicians
                JOIN Votes
                    ON Politicians.id = Votes.politicianId
            WHERE Politicians.grade_current < 9
            GROUP BY Politicians.id
            ORDER BY Politicians.grade_current Asc`, function(err, result){
                if(err){
                    console.log(err);
                }else{
                    console.log(result);
                }
            })
}

function number2(){
    db.all(`SELECT (SELECT COUNT(*) FROM Votes WHERE politicians.id = Votes.politicianId) AS totalVotes, Politicians.name AS politicianName, (Voters.first_name||" "||Voters.last_name) AS voterName, Voters.gender
            FROM Votes
                JOIN Politicians ON votes.politicianId = politicians.id
                JOIN Voters ON votes.voterid = voters.id
            WHERE Politicians.id IN (SELECT Politicians.id FROM Politicians JOIN Votes on Politicians.id = Votes.politicianId GROUP BY Politicians.id ORDER BY COUNT(votes.voterId) desc LIMIT 3)
            GROUP BY Votes.id
            ORDER BY totalVotes Desc`, function(err, result){
                if(err){
                    console.log(err);
                }else{
                    console.log(result);
                }
            })
}

function number3(){
    db.all(`SELECT COUNT(Votes.voterId) AS totalVotes, (first_name||" "||last_name) AS name, Voters.gender, Voters.age
            FROM Voters
                LEFT JOIN Votes
                    ON Votes.voterId = Voters.id
            GROUP BY Voters.id
            HAVING totalVotes > 1 
            ORDER BY totalVotes desc`, function(err, result){
                if(err){
                    console.log(err);
                }else{
                    console.log(result);
                }
            });
}

//DRIVER CODE
//====================
number2();


db.close();