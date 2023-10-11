const bodyParser = require("body-parser");
const fs = require("fs");
var sqlite3 = require("sqlite3").verbose();
const DBSOURCE = "shop.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
  }
});

function add_column() {
  db.run(
    ` ALTER TABLE Users
    ADD AdminLink text `,
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
}


function print_users() {
  var sql = "SELECT * FROM Devices";
  db.all(sql,  (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    const data = JSON.stringify(rows);
    const datas = JSON.parse(data);
    console.log(datas[1]);
    for (let i = 0; i < datas.length; i++) {
      console.log(datas[i]);
    }
  });
}
function print() {
  var sql = "SELECT * FROM UserImages WHERE UserId = ?";
  db.all(sql, 4, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    const data = JSON.stringify(rows);
    const datas = JSON.parse(data);

    for (let i = 0; i < datas.length; i++) {
      console.log(datas[i]);
    }
  });
}

function create_table() {
  db.run(
    `CREATE TABLE Basket (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    UserId INTEGER, 
    ProductId INTEGER,                  
    DateCreated DATE
    )`,
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
}

function add_img() {
  var isUserExists = true;

  var sql = "SELECT * FROM Users WHERE Id = ?";

  db.all(sql, 4, (err, rows) => {
    if (err) {
      console.log(err.message);
      return;
    }

    isUserExists = rows.length > 0 ? true : false;

    if (isUserExists) {
      var data = {
        UserId: 4,
        Name: "maksi",
        Mimetype: "application/octet-stream",

        Size: 100000,
        DateCreated: Date("now"),
      };

      var sql =
        "INSERT INTO UserImages (UserId, Filename, Mimetype, Size, DateCreated) VALUES (?,?,?,?,?)";
      var params = [
        data.UserId,
        data.Name,
        data.Mimetype,
        data.Size,
        Date("now"),
      ];

      db.run(sql, params, function (err, result) {
        if (err) {
          console.log(err);
          return;
        }
      });
    }
  });
}

function add_user(name) {
  var isUserExists = true;

  var sql = "SELECT * FROM Users WHERE Id = ?";

  db.all(sql, 4, (err, rows) => {
    if (err) {
      console.log(err.message);
      return;
    }

    isUserExists = rows.length > 0 ? true : false;

    if (isUserExists) {
      var data = {
        Username: name,
        DateCreated: Date("now"),
      };

      var sql = "INSERT INTO Users (Username, DateCreated) VALUES (?,?)";
      var params = [data.Username, Date("now")];

      db.run(sql, params, function (err, result) {
        if (err) {
          console.log(err);
          return;
        }
      });
    }
  });
}

function DELETE(id) {
  db.run("DELETE FROM UserImages WHERE Id = ?", id, function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
  });

  // DELETE PARENT RECORD
  db.run("DELETE FROM Users WHERE id = ?", id, function (err, result) {
    if (err) {
      res.status(400).json({ error: res.message });
      return;
    }
  });
}

function change(name, id) {
  var data = [name, Date("now"), id];

  let sql = `UPDATE Users SET 
            Username = ?, 
            DateModified = ?
            WHERE Id = ?`;
  db.run(sql, data, function (err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`Row(s) updated: ${this.changes}`);
  });
}

function write() {
  let data = fs.readFileSync("./json.json", "utf8");
  //console.log(data)
  let datas = JSON.parse(data);
  // console.log(datas[0])

  for (let i = 0; i < datas.length; i++) {
    console.log(datas[i]);
    let main = datas[i];

    let data_set = {
      UserId: 1,
      Id: main.id,
      Name: main.name,
      Type: main.type,
      State: main.state,
      Frequency: main.frequency,
      DateModified: Date("now"),
      DateCreated: Date("now"),
    };

    var sql =
      "INSERT INTO Devices (UserId, Id, Name ,Type, State, Frequency,DateModified, DateCreated) VALUES (?,?,?,?,?,?,?,?)";
    console.log(data_set);
    var params = [
      data_set.UserId,
      data_set.Id,
      data_set.Name,
      data_set.Type,
      data_set.State,
      data_set.Frequency,
      data_set.DateModified,
      data_set.DateCreated,
    ];

    db.run(sql, params, function (err, result) {
      if (err) {
        console.log(err);
      }
    });
  }
}




function create_table_Entrance() {
  db.run(
    `CREATE TABLE Entrance (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    State Boolean,
    Repair Boolean,                  
    DateCreated DATE,
    Adress text NOT NULL,
    FOREIGN KEY (Adress)
    REFERENCES Houses (Adress)
    )`,
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
}



function create_table_Houses() {
  db.run(
    `CREATE TABLE Houses (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Adress text NOT NULL,
    EntranceVal INTEGER
    
    )`,
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
}

function add_house(){
  var sql = "INSERT INTO Houses (Id, Adress, EntranceVal) VALUES (?,?,?)";
  var params = [
    1,
    'улюстартовая 25 к1',
    6
    
  ];

  db.run(sql, params, function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
  });
}

function add_Entrance(){
  var sql = "INSERT INTO Entrance ( State,Repair, DateCreated,Adress) VALUES (?,?,?,?)";
  var params = [
    
    0,
    0,
    Date('now'),
    'улюстартовая 25 к1'
    
  ];

  db.run(sql, params, function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
  });
}

function deletes(){
  var sql = 'DROP TABLE IF EXISTS Entrance;'
  db.run(sql,  function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
  });
  db.run(
    ` ALTER TABLE Entrance 
    ADD Number INTEGRER `,
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );

}
//create_table_Entrance()
add_Entrance()

