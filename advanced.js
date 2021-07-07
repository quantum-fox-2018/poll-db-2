const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./pemilu.db')
var Table = require('cli-table');

var table1 = new Table({
    head: ['NAME', 'LOCATION', 'GRADE CURRENT','TOTAL VOTE']
  , colWidths: [30,30,30,30]
});

var table2 = new Table({
    head: ['TOTAL VOTE', 'POLITICIAN NAME', 'VOTER NAME','GENDER']
  , colWidths: [30,30,30,30]
});

var table3 = new Table({
    head: ['TOTAL VOTE', 'VOTER NAME','GENDER','AGE']
  , colWidths: [30,30,30,30]
});

db.serialize(()=>{
  db.all(`SELECT P.name,P.location,P.grade_current,COUNT(*) AS totalVote FROM votes
          JOIN  politicians AS P  ON P.politicianId = votes.politicianId
		      WHERE P.grade_current<9 GROUP BY P.politicianId
		      ORDER BY P.grade_current ASC`,((err,data)=>{
            if(err) console.log(err)

            else
            console.log('EXERCISE NUMBER 1');
            for (var i = 0; i < data.length; i++) {
              table1.push(
                [data[i].name, data[i].location, data[i].grade_current, data[i].totalVote],
                );
            }
            console.log(table1.toString());
            console.log('\n');
  }))

  db.run(`CREATE VIEW IF NOT EXISTS view_vote as SELECT COUNT(*) AS totalVote, P.name as politicianName,
          P.politicianId as politicianId FROM votes
          JOIN politicians as P ON votes.politicianId = P.politicianId
          GROUP BY politicianName
          ORDER BY totalVote DESC LIMIT 3`,((err,data)=>{
            if(err) console.log(err)
  }))

  db.all(`SELECT view_vote.totalVote AS totalVote,P.name as politicianName,
          V.first_name || ' ' || V.last_name as voterName
          , V.gender AS vgen FROM votes
          JOIN politicians AS P ON votes.politicianId = P.politicianId
          JOIN voters as V ON votes.voterId = V.voterId
          JOIN view_vote ON P.politicianId = view_vote.politicianId
          WHERE P.politicianId IN (SELECT politicianId FROM view_vote)
          ORDER BY totalVote DESC, politicianName ASC`,((err,data)=>{
            if(err) console.log(err)
            else
            console.log('EXERCISE NUMBER 2');
            for (var i = 0; i < data.length; i++) {
              table2.push(
                [data[i].totalVote, data[i].politicianName, data[i].voterName, data[i].vgen],
                );
            }
            console.log(table2.toString());
            console.log('\n');
  }))

  db.all(`SELECT COUNT(*) as totalVote,V.first_name || ' ' || V.last_name as name,V.gender AS vgen,V.age AS vage FROM votes
          JOIN Voters AS V ON votes.voterId = V.voterId
          GROUP BY votes.voterId
          HAVING totalVote>1
          ORDER BY totalVote DESC`,((err,data)=>{
            if(err) console.log(err)
            else
            console.log('EXERCISE NUMBER 2');
            for (var i = 0; i < data.length; i++) {
              table3.push(
                [data[i].totalVote, data[i].name, data[i].vgen, data[i].vage],
                );
            }
            console.log(table3.toString());
            console.log('\n');
  }))

})

db.close();
