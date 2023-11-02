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

async function findEmail(email){
  const example = () => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM Users WHERE Email = ?`, email, (err, row) => {
            if (err) {
                reject('Error');
            } else {
                resolve(row);
            }
        });
    });
}


    let data = await example()
 
    if(data.length !==0 ) {

      return {state: true, data :data}
    }
    else{

      return {state: false, data :data}
    }
  
  
    
  

    

}
module.exports = {
  findEmail,
  };

