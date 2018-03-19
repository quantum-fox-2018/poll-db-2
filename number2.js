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
    db.all(`SELECT `)
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
number3();


db.close();