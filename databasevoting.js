const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./databasevoting.db');

class DatabaseVoting {

  static readDataVoters(cbDataVoters){
    fs.readFile('./voters.csv','utf8',function(err,dataVoters){
      let dataSplit = dataVoters.split("\n").slice(1);
      let databaseVoters = [];
      for(let i=0;i<dataSplit.length;i++){
        let objectSplit = dataSplit[i].split(",");
        let objectData = {first_name:objectSplit[0],last_name:objectSplit[1],gender:objectSplit[2],age:objectSplit[3]};
        databaseVoters.push(objectData);
      }
      cbDataVoters(databaseVoters.slice(0,databaseVoters.length-1));
    })
  }

  static readDataPoliticians(cbDataPoliticians){
    fs.readFile('./politicians.csv','utf8',function(err,dataPoliticians){
      let dataSplit = dataPoliticians.split("\n").slice(1);
      let databasePoliticians = [];
      for(let i=0;i<dataSplit.length;i++){
        let objectSplit = dataSplit[i].split(",");
        let objectData = {name:objectSplit[0],party:objectSplit[1],location:objectSplit[2],grade_current:objectSplit[3]};
        databasePoliticians.push(objectData);
      }
      cbDataPoliticians(databasePoliticians.slice(0,databasePoliticians.length-1));
    })
  }

  static readDataVotes(cbDataVotes){

    fs.readFile('./votes.csv','utf8',function(err,dataVotes){
      let dataSplit = dataVotes.split("\n").slice(1);
      let databaseVotes = [];
      for(let i=0;i<dataSplit.length;i++){
        let objectSplit = dataSplit[i].split(",");
        let objectData = {votersId:objectSplit[0],politiciansId:objectSplit[1]};
        databaseVotes.push(objectData);
      }
      cbDataVotes(databaseVotes.slice(0,databaseVotes.length-1));
    })
  }

  static databaseInitiate(){

    db.serialize(function() {

      DatabaseVoting.readDataVoters(function(dataVoters){

        for(let i=0;i<dataVoters.length;i++){

          let first_name = dataVoters[i].first_name;
          let last_name = dataVoters[i].last_name;
          let gender = dataVoters[i].gender;
          let age = dataVoters[i].age;
          db.run(`INSERT INTO Voters (id,first_name,last_name,gender,age) VALUES (NULL,?,?,?,?)`,first_name,last_name,gender,age);
        }

        DatabaseVoting.readDataPoliticians(function(dataPoliticians){

          for(let i=0;i<dataPoliticians.length;i++){
            let name = dataPoliticians[i].name;
            let party = dataPoliticians[i].party;
            let location = dataPoliticians[i].location;
            let grade_current = dataPoliticians[i].grade_current;
            db.run(`INSERT INTO Politicians (id,name,party,location,grade_current) VALUES (NULL,?,?,?,?)`,name,party,location,grade_current);
          }

          DatabaseVoting.readDataVotes(function(dataVotes){

            for(let i=0;i<dataVotes.length;i++){
              let votersId = dataVotes[i].votersId;
              let politiciansId = dataVotes[i].politiciansId;
              db.run(`INSERT INTO Votes (id,votersId,politiciansId) VALUES (NULL,?,?)`,votersId,politiciansId);
            }

            db.close();
          })
        })
      })
    });
  }

}

DatabaseVoting.databaseInitiate();
