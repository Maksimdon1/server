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

async function addUserToken(UserId, Token) {
  const params = [UserId, Token];
  var sql = "INSERT INTO Tokens (UserId, RefreshToken) VALUES (?,?)";
  await db.all(sql, params, (err, result) => {
    if (err) {
      return 1;
    } else {
      return 0;
    }
  });
}

async function changeUserToken(UserId, Token) {
  const params = [Token, UserId];
  var sql = "UPDATE  Tokens SET  RefreshToken = ? WHERE UserId = ?";
  await db.all(sql, params, (err, result) => {
    if (err) {
      return 1;
    } else {
      return 0;
    }
  });
}

module.exports = {
  addUserToken,
  changeUserToken,
};

// //   addUserToken(0,'cscbdjcd')
// changeUserToken(0, 'yy44474747747')
