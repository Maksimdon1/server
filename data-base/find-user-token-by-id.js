const sqlite3 = require("sqlite3").verbose();
require("dotenv").config();
const DBSOURCE =  process.env.DBSOURCE || "shop.sqlite" ;

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
        } else {
    }
});

async function findTokenByUserId(UserId){
  const example = () => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM Tokens WHERE UserId = ?`, UserId, (err, row) => {
            if (err) {
                reject('Error');
            } else {
                resolve(row);
            }
        });
    });
}


    let data = await example()
 
    if(data.length !=0 ) {

      return true
    }
    else{

      return false
    }
  
  
    
  

    

}
module.exports = {
    findTokenByUserId,
  };

