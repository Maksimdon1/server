const sqlite3 = require("sqlite3").verbose();
require("dotenv").config();
const uuid = require("uuid");
const bcrypt = require('bcrypt');
const DBSOURCE =  process.env.DBSOURCE || "shop.sqlite" ;

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
        } else {
    }
});


async function addUser(email, password, bonuses, login, phone, name, lastname, syslevel){
  const activationLink = uuid.v4()
  const hashPassword = await  bcrypt.hash(password, 3)
  let list = {
    Id : undefined,
    Login : login,
    Email: email,
    Phone: phone,
    HashPassword : hashPassword,
    Token : '',
    DateCreated : Date("now"),
    Name: name,
    Lastname: lastname,
    Syslevel: 0,
    ActivationLink: activationLink
}
const params = [list.Login , list.Email , list.Phone , list.HashPassword , list.Token ,  list.DateCreated, list.Name, list.Lastname, list.Syslevel, list.ActivationLink]
        
var sql = "INSERT INTO Users (Login, Email, Phone,  Password, Token, DateCreated, Name , Surname, SysLevel, ActivationLink) VALUES (?,?,?,?,?,?,?,?,?,?) RETURNING * ";



 




  const example = () => {
    return new Promise((resolve, reject) => {
           db.all(sql, params, (err, row) => {
               if (err) {
                   reject('Error');
               } else {
                   resolve(row);
               }
           });
       });
     
   }
  
      let data = await example()
   
   

 
  //  list.id = await getId()
    return (data[0])
   

}
module.exports = {
    addUser,
  };



