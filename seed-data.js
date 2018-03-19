const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const db = new sqlite3.Database('./poll1.db', (err) => {
    if (err) {
      return console.error('Connect',err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});

// INSER TABLE
// SYNC
function insertData(fileName,tableName) {
    db.serialize(function() {
    
        let raw_data = fs.readFileSync(fileName, 'utf8').trim().split('\r\n');
        let table_data = [];
        for (let i = 1; i < raw_data.length; i++) {
            table_data.push(raw_data[i].split(','));
        }
        // console.log(table_data);

        let maxColumn = [];
        for (let i = 0; i < table_data[0].length; i++) {
            maxColumn.push('?');
        }
        let joinMaxColumn = maxColumn.join(','); 

        var insert_table = db.prepare(`INSERT INTO ${tableName} VALUES (null,${joinMaxColumn})`);
        for (var i = 0; i < table_data.length; i++) {
            insert_table.run(table_data[i]);
        }
        insert_table.finalize();
        console.log(`Berhasil input ${tableName} Data !`);   
    });
}


// ASYNC
// function insertData(fileName,tableName) {
//     db.serialize(function() {
//         fs.readFile(fileName, 'utf8', (err, data) => {
//             if (err) throw err;

//             // let raw_data = fs.readFileSync(fileName, 'utf8').trim().split('\r\n');
//             let raw_data = data.trim().split('\r\n');
//             let table_data = [];
//             for (let i = 1; i < raw_data.length; i++) {
//                 table_data.push(raw_data[i].split(','));
//             }
//             console.log(table_data.length);

//             let maxColumn = [];
//             for (let i = 0; i < table_data[0].length; i++) {
//                 maxColumn.push('?');
//             }
//             let joinMaxColumn = maxColumn.join(',');
//             console.log(joinMaxColumn);

//             var insert_table = db.prepare(`INSERT INTO ${tableName} VALUES (null,${joinMaxColumn})`);
//             for (var i = 0; i < table_data.length; i++) {
//                 insert_table.run(table_data[i]);
//             }
//             insert_table.finalize();
//             console.log(`Berhasil input ${tableName} Data !`);
//         });
//     })    
// }

insertData('./politicians.csv','Politicians');
// insertData('./voters.csv','Voters');
// insertData('./votes.csv','Votes');


// function updateData() {

// }

// let updateObj

// updateData('./politicians.csv','Politicians',updateObj);



db.close((err) => {
    if (err) {
      return console.error('Close',err.message);
    }
    console.log('Close the database connection.');
});


