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

async function UpdateLoginTime(login, password) {
  const example = () => {
    let success = false;
    return new Promise((resolve, reject) => {
      var data = [Date("now"), login, password];

      let sql = `UPDATE Users SET 
                 
        DateLoggedIn = ? WHERE Login = ? AND Password = ? `;
      db.run(sql, data, function (err, row) {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
        console.log(`Row(s) updated: ${this.changes}`);
      });
    });
  };

  let data = await example();

  return data;
}
module.exports = {
  UpdateLoginTime,
};
