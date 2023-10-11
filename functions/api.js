const express = require('express');
const serverless = require('serverless-http');
const app = express();
const router = express.Router();
var sqlite3 = require("sqlite3").verbose();
let records = [];
const cors = require("cors");



const DBSOURCE = "shop.sqlite";


let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
  } else {
    

    db.run(
      `CREATE TABLE Users (
            Id INTEGER PRIMARY KEY AUTOINCREMENT,
            Login text, 
            Email text, 
            Password text,             
            Name text,
            Surname text,
            Token text,
            SysLevel  INTEGER,

            DateLoggedIn DATE,
            DateCreated DATE
            

            )`,
      (err) => {
        if (err) {
          // Table already created
        } else {
          // Table just created, creating some rows
          var insert =
            "INSERT INTO Users (Login, Email, Password, Salt, DateCreated) VALUES (?,?,?,?,?)";
         
        }
      }
    );
  }
});

module.exports = db;

router.use(
  express.urlencoded({limit: '50mb', extended: true}),
  express.urlencoded(),
  cors({
    origin: "http://localhost:3000",
  })
);





//Get all students
router.get('/', (req, res) => {
  res.send('App is running..');
});

//Create new record
router.post("/api/register", async (req, res) => {
  var errors = [];
  var data = [];
  try {
    const { Login, Email, Password, Name, Surname,Token, SysLevel} = req.body;

    if (!Login) {
      errors.push("Login is missing");
    }
    if (!Token) {
      errors.push("Login is missing");
    }
    if (!Name) {
      errors.push("Name is missing");
    }
    if (!Surname) {
      errors.push("Surname is missing");
    }
    if (!Email) {
      errors.push("Email is missing");
    }
    if (errors.length) {
      res.status(400).json({ error: errors.join(",") });
      return;
    }
    let userExists = false;

    var sql = "SELECT * FROM Users WHERE Email = ?";
    await db.all(sql, Email, (err, result) => {
      if (err) {
        res.status(402).json({ error: err.message });
        return;
      }

      if (result.length === 0) {
        

        data = {
          
          Login: Login,
          Email: Email,
          Password: Password,
          Token : Token,
          DateCreated: Date("now"),
          Name : Name,
          Surname : Surname,
          SysLevel : SysLevel
        };

        var sql =
          "INSERT INTO Users (Login, Email, Password, Token, DateCreated, Name , Surname, SysLevel) VALUES (?,?,?,?,?,?,?,?)";
        var params = [
          data.Login,
          data.Email,
          data.Password,
          data.Token,
          Date("now"),
          data.Name,
          data.Surname,
          data.SysLevel
        ];
        var user = db.run(sql, params, function (err, innerResult) {
          if (err) {
            res.status(400).json({ error: err.message });
            return;
          }
        });
      } else {
        userExists = true;
        // res.status(404).send("User Already Exist. Please Login");
      }
    });

    setTimeout(() => {
      if (!userExists) {
        res.status(201).send(data);
      } else {
        res.status(201).json("Record already exists. Please login");
      }
    }, 500);
  } catch (err) {
    console.log(err);
  }
});




router.post("/api/login", async (req, res) => {
  try {
    const { Login, Password } = req.body;
    // Make sure there is an Email and Password in the request
    if (!(Login && Password)) {
      res.status(400).send("All input is required");
    }

    let user = [];

    let params = [
      Login,
      Password
    ]
    var date = new Date();
    const loginTime = {
      day : date.getDay(),
      hour : date.getHours(),
      minute : date.getMinutes(),
      month : date.getMonth(),
      year : date.getFullYear(),
      second :date.getSeconds()
    }
       var data = [ JSON.stringify( loginTime) , Login,Password];

        let sql = `UPDATE Users SET 
                 
        DateLoggedIn = ?
                  WHERE Login = ? AND Password = ?`;
        db.run(sql, data, function (err) {
          if (err) {
            return console.error(err.message);
          }
          console.log(`Row(s) updated: ${this.changes}`);
          
      
     
        });
    
    var sqls = "SELECT * FROM Users WHERE Login = ? AND Password = ?";
    db.all(sqls, params, function (err, rows) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      else{
     
         res.status(200).send(rows);
      }

     
    });
  } catch (err) {
    console.log(err);
  }
});





//delete existing record
router.delete('/', (req, res) => {
  res.send('Deleted existing record');
});

//updating existing record
router.put('/', (req, res) => {
  res.send('Updating existing record');
});

//showing demo records
router.get('/demo', (req, res) => {
  res.json([
    {
      id: '001',
      name: 'Smith',
      email: 'smith@gmail.com',
    },
    {
      id: '002',
      name: 'Sam',
      email: 'sam@gmail.com',
    },
    {
      id: '003',
      name: 'lily',
      email: 'lily@gmail.com',
    },
  ]);
});

app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);
