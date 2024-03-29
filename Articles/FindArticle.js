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

async function FindArticle(id) {
	console.log(id)
	const example = () => {
		return new Promise((resolve, reject) => {
			db.all(`SELECT * FROM Articles WHERE Id = ?`, id, (err, row) => {
				if (err) {
					reject("Error");
				} else {
					resolve(row);
				}
			});
		});
	};

	let data = await example();
	console.log(data)

	if (data.length !== 0) {
		return { state: true, data: data[0] };
	} else {
		return { state: false, data: data[0] };
	}
}
module.exports = {
	FindArticle,
};
