const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

class Query{
  static gradeUnderNine(){
    db.all(`SELECT Politicians.name, Politicians.address, Politicians.grade_current, COUNT(Votes.Politicians_id) AS totalVotes
            FROM Politicians
                JOIN Votes
                    ON Politicians.Politicians_id = Votes.voters_id
            WHERE Politicians.grade_current < 9
            GROUP BY Politicians.Politicians_id
            ORDER BY Politicians.grade_current Asc`, function(err, result){
                  if(err){
                      console.log(err);
                  }else{
                      console.log(result);
                  }
              })
    }
}

Query.gradeUnderNine()
