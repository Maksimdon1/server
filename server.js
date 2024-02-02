const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3002;
var md5 = require("md5");
var sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const bcrypt = require("bcryptjs");
const errorMiddleware = require("./middlewares/error-middleware");
const router = require("./router/index");
const cookieParser = require("cookie-parser");

const DBSOURCE = "shop.sqlite";

app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.urlencoded());
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3001",
      "http://192.168.56.1:3001/",
      "http://localhost:3000",
      "https://flower-lover.netlify.app",
      "http://192.168.1.3:3000",
      "http://192.168.1.4:3000",
      "http://192.168.1.2:3000/",
      "https://sneakers-shop-ru.netlify.app",
      "https://sneaker-one.netlify.app",
    ],
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/server/api", router);
app.use(errorMiddleware);

// let db = new sqlite3.Database(DBSOURCE, (err) => {
//   if (err) {
//     // Cannot open database
//     console.error(err.message);
//     throw err;
//   } else {
//     var salt = bcrypt.genSaltSync(10);

//     db.run(
//       `CREATE TABLE Users (
//             Id INTEGER PRIMARY KEY AUTOINCREMENT,
//             Login text,
//             Email text,
//             Phone text,
//             Password text,
//             Name text,
//             Surname text,
//             Token text,
//             SysLevel  INTEGER,
//             DateLoggedIn DATE,
//             DateCreated DATE,
//             Bonuses INTEGER

//             )`,
//       (err) => {
//         if (err) {
//           // Table already created
//         } else {
//           // Table just created, creating some rows
//           var insert =
//             "INSERT INTO Users (Login, Email, Password, Salt, DateCreated) VALUES (?,?,?,?,?)";

//         }
//       }
//     );

//   }
// });

// // db.run(
// //   `CREATE TABLE House (
// //         Id INTEGER PRIMARY KEY AUTOINCREMENT,
// //         State Boolean ,

// //         DateLoggedIn DATE,
//             // frequency INTEGER

// //         )`,
// //   (err) => {
// //     if (err) {
// //       // Table already created
// //       console.log(err)
// //     } else {
// //       // Table just created, creating some rows

// //     }
// //   }
// // );
// var insert =
// `INSERT INTO House ( 'State', 'DateLoggedIn') VALUES (? ,?)`;
// const data =[ false, Date("now")]
// db.run(insert, data);
// module.exports = db;

// app.post("/api/register", async (req, res) => {
//   var errors = [];
//   var data = {};
//   try {
//     const { Login, Email, Phone , Password, Name, Surname,Token, SysLevel} = req.body;

//     if (!Login) {
//       errors.push("Login is missing");
//     }
//     if (!Token) {
//       errors.push("Login is missing");
//     }
//     if (!Phone) {
//       errors.push("Login is missing");
//     }
//     if (!Name) {
//       errors.push("Name is missing");
//     }
//     if (!Surname) {
//       errors.push("Surname is missing");
//     }
//     if (!Email) {
//       errors.push("Email is missing");
//     }
//     if (errors.length) {
//       res.status(400).json({ error: errors.join(",") });
//       return;
//     }
//     let userExists = false;

//     var sql = "SELECT * FROM Users WHERE Email = ?";
//     await db.all(sql, Email, (err, result) => {
//       if (err) {
//         res.status(402).json({ error: err.message });
//         return;
//       }

//       if (result.length === 0) {

//         data = {

//           Login: Login,
//           Email: Email,
//           Phone: Phone,
//           Password: Password,
//           Token : Token,
//           DateCreated: Date("now"),
//           Name : Name,
//           Surname : Surname,
//           SysLevel : SysLevel
//         };

//         var sql =
//           "INSERT INTO Users (Login, Email,Phone,  Password, Token, DateCreated, Name , Surname, SysLevel) VALUES (?,?,?,?,?,?,?,?,?)";
//         var params = [
//           data.Login,
//           data.Email,
//           data.Phone,
//           data.Password,
//           data.Token,
//           Date("now"),
//           data.Name,
//           data.Surname,
//           data.SysLevel
//         ];
//         var user = db.run(sql, params, function (err, innerResult) {
//           if (err) {
//             res.status(400).json({ error: err.message });
//             return;
//           }
//         });
//       } else {
//         userExists = true;
//         // res.status(404).send("User Already Exist. Please Login");
//       }
//     });

//     setTimeout(() => {
//       if (!userExists) {
//         res.status(201).send(data);
//       } else {
//         res.status(201).json("Record already exists. Please login");
//       }
//     }, 500);
//   } catch (err) {
//     console.log(err);
//   }
// });

// app.post("/api/login", async (req, res) => {
//   try {
//     const { Login, Password } = req.body;
//     // Make sure there is an Email and Password in the request
//     if (!(Login && Password )) {
//       res.status(400).send("All input is required");
//     }

//     let user = [];

//     let params = [
//       Login,
//       Password,

//     ]

//        var data = [Date("now"), Login,Password,];

//         let sql = `UPDATE Users SET

//         DateLoggedIn = ? WHERE Login = ? AND Password = ? `;
//         db.run(sql, data, function (err) {
//           if (err) {
//             return console.error(err.message);
//           }
//           console.log(`Row(s) updated: ${this.changes}`);

//         });

//     var sqls = "SELECT * FROM Users WHERE Login = ? AND Password = ? ";
//     db.all(sqls, params, function (err, rows) {
//       if (err) {
//         res.status(400).json({ error: err.message });
//         return;
//       }
//       else{

//          res.status(200).send(rows);
//       }

//     });
//   } catch (err) {
//     console.log(err);
//   }
// });

// app.post("/get-repair-list", async (req, res) => {
//   try {
//     const { Login, Password } = req.body;
//     // Make sure there is an Email and Password in the request
//     if (!(Login && Password)) {
//       res.status(400).send("All input is required");
//     }

//     let user = [];

//     let params = [
//       Login,
//       Password
//     ]
//     var date = new Date();
//     const loginTime = {
//       day : date.getDay(),
//       hour : date.getHours(),
//       minute : date.getMinutes(),
//       month : date.getMonth(),
//       year : date.getFullYear(),
//       second :date.getSeconds()
//     }
//     var data = [ JSON.stringify( loginTime) , Login,Password];

//         let sql = `UPDATE Users SET

//         DateLoggedIn = ?
//                   WHERE Login = ? AND Password = ?`;
//         db.run(sql, data, function (err) {
//           if (err) {
//             return console.error(err.message);
//           }
//           console.log(`Row(s) updated: ${this.changes}`);

//         });

//     var sqls = "SELECT * FROM Users WHERE Login = ? AND Password = ?";
//     db.all(sqls, params, function (err, rows) {
//       if (err) {
//         res.status(400).json({ error: err.message });
//         return;
//       }
//       else{
//         if(rows){
//           var sql = "SELECT * FROM Entrance  WHERE Repair = ?";
//           db.all(sql, true, function (err, rows) {
//             res.status(200).send(rows);
//           })

//         }

//       }

//     });
//   } catch (err) {
//     console.log(err);
//   }
// });

// app.post("/get-all-entrance", async (req, res) => {
//   try {
//     const { Login, Password } = req.body;
//     // Make sure there is an Email and Password in the request
//     if (!(Login && Password)) {
//       res.status(400).send("All input is required");
//     }

//     let user = [];

//     let params = [
//       Login,
//       Password
//     ]
//     var date = new Date();
//     const loginTime = {
//       day : date.getDay(),
//       hour : date.getHours(),
//       minute : date.getMinutes(),
//       month : date.getMonth(),
//       year : date.getFullYear(),
//       second :date.getSeconds()
//     }
//     var data = [ JSON.stringify( loginTime) , Login,Password];

//         let sql = `UPDATE Users SET

//         DateLoggedIn = ?
//                   WHERE Login = ? AND Password = ?`;
//         db.run(sql, data, function (err) {
//           if (err) {
//             return console.error(err.message);
//           }
//           console.log(`Row(s) updated: ${this.changes}`);

//         });

//     var sqls = "SELECT * FROM Users WHERE Login = ? AND Password = ?";
//     db.all(sqls, params, function (err, rows) {
//       if (err) {
//         res.status(400).json({ error: err.message });
//         return;
//       }
//       else{
//         if(rows){
//           var sql = "SELECT * FROM Entrance";
//           db.all(sql,  function (err, rows) {
//             res.status(200).send(rows);
//           })

//         }

//       }

//     });
//   } catch (err) {
//     console.log(err);
//   }
// });

// app.post("/set-entrance-repair-state", async (req, res) => {
//   try {
//     const { Login, Password,  EntranceId, EntranceState } = req.body;
//     // Make sure there is an Email and Password in the request
//     if (!(Login && Password && EntranceId && EntranceState)) {
//       res.status(400).send("All input is required");
//     }
//     console.log( EntranceId, EntranceState)
//       let user = [];

//       let params = [
//         Login,
//         Password
//       ]
//       var date = new Date();
//       const loginTime = {
//         day : date.getDay(),
//         hour : date.getHours(),
//         minute : date.getMinutes(),
//         month : date.getMonth(),
//         year : date.getFullYear(),
//         second :date.getSeconds()
//       }
//       var data = [ JSON.stringify( loginTime) , Login,Password];

//           let sql = `UPDATE Users SET

//           DateLoggedIn = ?
//                     WHERE Login = ? AND Password = ?`;
//           db.run(sql, data, function (err) {
//             if (err) {
//               return console.error(err.message);
//             }
//             console.log(`Row(s) updated: ${this.changes}`);

//           });

//       var sqls = "SELECT * FROM Users WHERE Login = ? AND Password = ?";
//       db.all(sqls, params, function (err, rows) {
//         if (err) {
//           res.status(400).json({ error: err.message });
//           return;
//         }
//         else{

//             var sql = "UPDATE Entrance SET Repair = ? WHERE Id = ?";
//             db.all(sql, EntranceState, EntranceId, function (err, rows) {
//               res.status(200).send(rows);
//               if (err) {
//                 res.status(400).json({ error: err.message });
//                 return;
//               }
//             })

//         }

//       });
//     } catch (err) {
//       console.log(err);
//     }
//   });

//   app.post("/set-entrance-state", async (req, res) => {
//     try {
//       const { Login, Password,  EntranceId, EntranceState } = req.body;
//       // Make sure there is an Email and Password in the request
//       if (!(Login && Password && EntranceId && EntranceState)) {
//         res.status(400).send("All input is required");
//       }
//       console.log( EntranceId, EntranceState)
//         let user = [];

//         let params = [
//           Login,
//           Password
//         ]
//         var date = new Date();
//         const loginTime = {
//           day : date.getDay(),
//           hour : date.getHours(),
//           minute : date.getMinutes(),
//           month : date.getMonth(),
//           year : date.getFullYear(),
//           second :date.getSeconds()
//         }
//         var data = [ JSON.stringify( loginTime) , Login,Password];

//             let sql = `UPDATE Users SET

//             DateLoggedIn = ?
//                       WHERE Login = ? AND Password = ?`;
//             db.run(sql, data, function (err) {
//               if (err) {
//                 return console.error(err.message);
//               }
//               console.log(`Row(s) updated: ${this.changes}`);

//             });

//         var sqls = "SELECT * FROM Users WHERE Login = ? AND Password = ?";
//         db.all(sqls, params, function (err, rows) {
//           if (err) {
//             res.status(400).json({ error: err.message });
//             return;
//           }
//           else{

//               var sql = "UPDATE Entrance SET State = ? WHERE Id = ?";
//               db.all(sql, EntranceState, EntranceId, function (err, rows) {
//                 res.status(200).send(rows);
//                 if (err) {
//                   res.status(400).json({ error: err.message });
//                   return;
//                 }
//               })

//           }

//         });
//       } catch (err) {
//         console.log(err);
//       }
//     });
// app.post("/create-house", async (req, res) => {
//   try {
//     const { Login, Password,  EntranceId, EntranceState } = req.body;
//     // Make sure there is an Email and Password in the request
//     if (!(Login && Password && EntranceId && EntranceState)) {
//       res.status(400).send("All input is required");
//     }
//     console.log( EntranceId, EntranceState)
//       let user = [];

//       let params = [
//         Login,
//         Password
//       ]
//       var date = new Date();
//       const loginTime = {
//         day : date.getDay(),
//         hour : date.getHours(),
//         minute : date.getMinutes(),
//         month : date.getMonth(),
//         year : date.getFullYear(),
//         second :date.getSeconds()
//       }
//       var data = [ JSON.stringify( loginTime) , Login,Password];

//           let sql = `UPDATE Users SET

//           DateLoggedIn = ?
//                     WHERE Login = ? AND Password = ?`;
//           db.run(sql, data, function (err) {
//             if (err) {
//               return console.error(err.message);
//             }
//             console.log(`Row(s) updated: ${this.changes}`);

//           });

//       var sqls = "SELECT * FROM Users WHERE Login = ? AND Password = ?";
//       db.all(sqls, params, function (err, rows) {
//         if (err) {
//           res.status(400).json({ error: err.message });
//           return;
//         }
//         else{

//             var sql = "UPDATE Entrance SET State = ? WHERE Id = ?";
//             db.all(sql, EntranceState, EntranceId, function (err, rows) {
//               res.status(200).send(rows);
//               if (err) {
//                 res.status(400).json({ error: err.message });
//                 return;
//               }
//             })

//         }

//       });
//     } catch (err) {
//       console.log(err);
//     }
// });

// app.get("/all", async (req, res) => {
//   var sql = "SELECT * FROM Users";
//    db.all(sql, (err, result) => {
//     if (err) {
//       res.status(402).json({ error: err.message });

//       return;
//     }
//     else{
//       console.log(result)
//       res.status(200).send(result)
//     }

// })

// });

// app.post("/api/house", async (req, res) => {
//   var errors = [];
//   var data = {};
//   try {
//     const { Id, State, frequency} = req.body;

//     if (!Id) {
//       errors.push("Login is missing");
//     }

//     if (errors.length) {
//       res.status(400).json({ error: errors.join(",") });
//       return;
//     }
//     let userExists = false;
//     if(State){

//       let sql = `UPDATE House SET

//           DateLoggedIn = ? , State = ? WHERE Id = 1`;
//           data = {
//             Date:  Date("now"),

//             State: State,

//             Id:Id,

//            };
//            const sqlArr = [data['Date'], data['State']];
//       await db.all(sql, sqlArr, (err, result) => {
//         if (err) {
//           res.status(402).json({ error: err.message });
//           return;
//         }
//         else{
//           console.log(result)
//         }

//       });
//     }
//     if(frequency){

//       let sql = `UPDATE House SET

//           DateLoggedIn = ? , frequency  = ? WHERE Id = 1`;
//           data = {
//             Date:  Date("now"),

//             frequency: frequency,

//             Id:Id,

//            };
//            const sqlArr = [data['Date'], data['frequency']];
//       await db.all(sql, sqlArr, (err, result) => {
//         if (err) {
//           res.status(402).json({ error: err.message });
//           return;
//         }
//         else{
//           console.log(result)
//         }

//       });
//     }

//     setTimeout(() => {
//       if (!userExists) {
//         res.status(201).send(data);
//       } else {
//         res.status(201).json("Record already exists. Please login");
//       }
//     }, 500);
//   } catch (err) {
//     console.log(err);
//   }
// });
// app.get("/api/house/:id", async (req, res) => {
//   var errors = [];
//   var data = {};
//   try {

//     if (errors.length) {
//       res.status(400).json({ error: errors.join(",") });
//       return;
//     }
//     let userExists = false;

//     var sql = "SELECT * FROM House WHERE Id = ?";
//         data = [
//           req.params.id

//         ]
//     await db.all(sql, data, (err, result) => {
//       if (err) {
//         res.status(402).json({ error: err.message });
//         return;
//       }
//       else{
//         res.status(200).send(result);
//       }

//     });

//     // setTimeout(() => {
//     //   if (!userExists) {
//     //     res.status(201).send(data);
//     //   } else {
//     //     res.status(201).json("Record already exists. Please login");
//     //   }
//     // }, 500);
//   } catch (err) {
//     console.log(err);
//   }
// });

app.listen(port, "0.0.0.0", () =>
  console.log(`API listening on port ${port}!`)
);
