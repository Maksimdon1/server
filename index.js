const express = require("express");
const app = express();
require("dotenv").config();
const port = 3004;
var md5 = require("md5");
var sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const DBSOURCE = "shop.sqlite";


let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
  } else {
    var salt = bcrypt.genSaltSync(10);

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

app.use(
  express.urlencoded({limit: '50mb', extended: true}),
  express.urlencoded(),
  cors({
    origin: "http://localhost:3000",
  })
);

app.post("/api/register", async (req, res) => {
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


app.post("/api/login", async (req, res) => {
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

app.post("/get-repair-list", async (req, res) => {
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
        if(rows){
          var sql = "SELECT * FROM Entrance  WHERE Repair = ?";
          db.all(sql, true, function (err, rows) {
            res.status(200).send(rows);
          })
          
        }
     
         
      }

     
    });
  } catch (err) {
    console.log(err);
  }
});


app.post("/get-all-entrance", async (req, res) => {
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
        if(rows){
          var sql = "SELECT * FROM Entrance";
          db.all(sql,  function (err, rows) {
            res.status(200).send(rows);
          })
          
        }
     
         
      }

     
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/set-entrance-repair-state", async (req, res) => {
  try {
    const { Login, Password,  EntranceId, EntranceState } = req.body;
    // Make sure there is an Email and Password in the request
    if (!(Login && Password && EntranceId && EntranceState)) {
      res.status(400).send("All input is required");
    }
    console.log( EntranceId, EntranceState)
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
         
           
            var sql = "UPDATE Entrance SET Repair = ? WHERE Id = ?";
            db.all(sql, EntranceState, EntranceId, function (err, rows) {
              res.status(200).send(rows);
              if (err) {
                res.status(400).json({ error: err.message });
                return;
              }
            })
            
          
       
           
        }
  
       
      });
    } catch (err) {
      console.log(err);
    }
  });

  app.post("/set-entrance-state", async (req, res) => {
    try {
      const { Login, Password,  EntranceId, EntranceState } = req.body;
      // Make sure there is an Email and Password in the request
      if (!(Login && Password && EntranceId && EntranceState)) {
        res.status(400).send("All input is required");
      }
      console.log( EntranceId, EntranceState)
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
           
             
              var sql = "UPDATE Entrance SET State = ? WHERE Id = ?";
              db.all(sql, EntranceState, EntranceId, function (err, rows) {
                res.status(200).send(rows);
                if (err) {
                  res.status(400).json({ error: err.message });
                  return;
                }
              })
              
            
         
             
          }
    
         
        });
      } catch (err) {
        console.log(err);
      }
    });
app.post("/create-house", async (req, res) => {
  try {
    const { Login, Password,  EntranceId, EntranceState } = req.body;
    // Make sure there is an Email and Password in the request
    if (!(Login && Password && EntranceId && EntranceState)) {
      res.status(400).send("All input is required");
    }
    console.log( EntranceId, EntranceState)
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
         
           
            var sql = "UPDATE Entrance SET State = ? WHERE Id = ?";
            db.all(sql, EntranceState, EntranceId, function (err, rows) {
              res.status(200).send(rows);
              if (err) {
                res.status(400).json({ error: err.message });
                return;
              }
            })
            
          
       
           
        }
  
       
      });
    } catch (err) {
      console.log(err);
    }
});

app.post("/test", async (req, res) => {
  const data = req.body
  console.log(data)
  res.status(200).send('work')
});
app.get("/get", async (req, res) => {
 const val = {
  'first' : 250,
  'second' : 250,
  'three': 255,

}
res.status(200).send(val)
});


app.listen(port, "0.0.0.0", () =>
  console.log(`API listening on port ${port}!`)
);
