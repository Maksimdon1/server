function cors(req, res, next) {
	console.log(req.get("origin"));

	res.header("Access-Control-Allow-Origin", req.get("origin")); //https://sneaker-one.netlify.app
	res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
	res.header("Access-Control-Allow-Credentials", true);
	next();
}

module.exports = cors;
