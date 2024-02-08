const sqlite3 = require("sqlite3").verbose();
require("dotenv").config();
const DBSOURCE = process.env.DBSOURCE || "shop.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
  } else {
  }
});

async function UpdateToAdmin(email, Admin_Email) {
	console.log(email, Admin_Email , 'update info')
  const example = () => {
    let success = false;
    return new Promise((resolve, reject) => {
      let sql = `UPDATE Users SET 
         
        Status = ? WHERE Email = ?  `;
      db.run(sql, ['Admin', email], function (err, row) {
        if (err) {
          reject("Error");
        } else {
					
          resolve({
						success:true
					});
         
        }
      });
		
    });
  };

  let data = await example();

	
  return data;
}
module.exports = {
  UpdateToAdmin,
};


