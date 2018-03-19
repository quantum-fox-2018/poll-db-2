const fs = require('fs');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./poll-db-2.db');


class Inputdb {
  constructor (){

  }

  static readPoliticians(){
    fs.readFile('politicians.csv', 'utf8', (err, data)=>{
      let politicians     = data.trim().split('\n');
      let arrPoliticians  = [];

      for(let i = 1; i < politicians.length; i++){
        let tmp = politicians[i].split(',');
        arrPoliticians.push(tmp);
      }

      for(let j = 0; j < arrPoliticians.length; j++){
        db.run(`INSERT INTO politicians (name, party, location, grade_current)
                VALUES ("${arrPoliticians[j][0]}", "${arrPoliticians[j][1]}",
                "${arrPoliticians[j][2]}", "${arrPoliticians[j][3]}")`);
      }

    })
  }

  static readVoters(){
    fs.readFile('voters.csv', 'utf8', (err, data)=>{
      let voters    = data.trim().split('\n');
      let arrVoters = [];

      for(let i = 1; i < voters.length; i++){
        let tmp = voters[i].split(',');
        arrVoters.push(tmp);
      }

      for(let j = 0; j < arrVoters.length; j++){
        db.run(`INSERT INTO voters (first_name, last_name, gender, age)
                VALUES ("${arrVoters[j][0]}", "${arrVoters[j][1]}",
                "${arrVoters[j][2]}", "${arrVoters[j][3]}")`)
      }

    })
  }

  static readVotes(){
    fs.readFile('votes.csv', 'utf8', (err, data)=>{
      let votes = data.split('\n');
      let arrVotes = [];

      for(let i = 1; i < votes.length; i++){
        let tmp = votes[i].split(',');
        arrVotes.push(tmp);
      }

      for(let j = 0; j < arrVotes.length; j++){
        db.run(`INSERT INTO votes (voterId, politicianId) VALUES ("${arrVotes[j][0]}", "${arrVotes[j][1]}")`)
      }

    })
  }

  static gradeBelowNine(){
    db.run(`SELECT politicians.name, politicians.location, politicians.grade_current, count(*) AS totalVote
            FROM politicians JOIN votes ON politicians.id = votes.politicianId GROUP BY politicianId
            HAVING grade_current < 9`, function(err, row){
              console.log(row);
    })
  }

}


// Inputdb.readPoliticians();
// Inputdb.readVoters();
// Inputdb.readVotes();
Inputdb.gradeBelowNine();
