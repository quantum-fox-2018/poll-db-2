const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('PollDB.db');
const fs = require('fs');

let politicians = fs.readFileSync('politicians.csv','utf8').split('\n');
let voters = fs.readFileSync('voters.csv','utf8').split('\n');
let votes = fs.readFileSync('votes.csv','utf8').split('\n');

db.serialize(function(){
  let seedPoliticians = db.prepare(`INSERT INTO Politicians (name,party,location,gradeCurrent)
    VALUES (?,?,?,?)`);
  for(let i=1; i<politicians.length-1; i++){
    let politician = politicians[i].split(',');
    let name = politician[0];
    let party = politician[1];
    let age = politician[2];
    let gradeCurrent = politician[3];
    seedPoliticians.run(name,party,age,gradeCurrent);
  }
  seedPoliticians.finalize();

  let seedVoters = db.prepare(`INSERT INTO Voters (firstName,lastName,gender,age)
    VALUES (?,?,?,?)`);
  for(let i=1; i<voters.length-1; i++){
    let voter = voters[i].split(',');
    let firstName = voter[0];
    let lastName = voter[1];
    let gender = voter[2];
    let age = voter[3];
    seedVoters.run(firstName,lastName,gender,age);
  }
  seedVoters.finalize();

  let seedVotes = db.prepare(`INSERT INTO Votes (voterId,politicianId)
    VALUES (?,?)`);
  for(let i=1; i<votes.length-1; i++){
    let vote = votes[i].split(',');
    let voterId = vote[0];
    let politicianId = vote[1];
    seedVotes.run(voterId,politicianId);
  }
  seedVotes.finalize();
});

db.close();
