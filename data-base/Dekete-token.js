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

async function DeleteToken(token) {
  const example = () => {
    let success = false;
    return new Promise((resolve, reject) => {
      db.run(
        "DELETE FROM Tokens WHERE RefreshToken = ?",
        token,
        function (err, row) {
          if (err) {
            reject("Error");
          } else {
            resolve(row);
            success = true;
          }
        }
      );
    });
  };

  let data = await example();

  return data;
}
module.exports = {
  DeleteToken,
};
