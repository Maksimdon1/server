const userService = require("../service/user-service.js");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");
const articleService = require("../service/article-service");

class UserController {
	async registration(req, res, next) {
		try {
			console.log(req.body);
			const errors = validationResult(req);
			console.log(errors);
			if (!errors.isEmpty()) {
				return next(ApiError.BadRequest("Ошибка при валидации", errors.array()));
			}
			const { email, password, name, lastname } = req.body;

			const userData = await userService.rigistration(email, password, name, lastname);

			res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
			res.setHeader("Access-Control-Allow-Origin", "https://sneaker-one.netlify.app");
			res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
			res.setHeader("Access-Control-Allow-Credentials", "Content-Type");
			return res.json(userData);
		} catch (error) {
			console.log(error);
			next(error);
		}
	}
	async login(req, res, next) {
		try {
			const { email, password } = req.body;
			const userData = await userService.login(email, password);

			res.cookie("refreshToken", userData.token.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
			res.setHeader("Access-Control-Allow-Origin", "https://sneaker-one.netlify.app");
			res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
			res.setHeader("Access-Control-Allow-Credentials", "Content-Type");
			return res.json(userData);
		} catch (e) {
			next(e);
		}
	}
	async logout(req, res, next) {
		try {
			const { refreshToken } = req.body;
			const token = await userService.logout(refreshToken);
			res.clearCookie("refreshToken");
			res.setHeader("Access-Control-Allow-Origin", "https://sneaker-one.netlify.app");
			res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
			res.setHeader("Access-Control-Allow-Credentials", "Content-Type");
			return res.json(token);
		} catch (e) {
			next(e);
		}
	}
	async activate(req, res, next) {
		try {
			const activationLink = req.params.link;
			await userService.activate(activationLink);
			res.setHeader("Access-Control-Allow-Origin", "https://sneaker-one.netlify.app");
			res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
			res.setHeader("Access-Control-Allow-Credentials", "Content-Type");
			return res.redirect(process.env.SITE_URL);
		} catch (error) {
			next(error);
		}
	}

	async refresh(req, res, next) {
		try {
			const { refreshToken } = req.body;

			const userData = await userService.refresh(refreshToken);
			res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
			res.setHeader("Access-Control-Allow-Origin", "https://sneaker-one.netlify.app");
			res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
			res.setHeader("Access-Control-Allow-Credentials", "Content-Type");
			return res.json(userData);
		} catch (e) {
			next(e);
		}
	}

	async getUsers(req, res, next) {
		try {
			const users = await userService.getAllUsers();
			res.setHeader("Access-Control-Allow-Origin", "https://sneaker-one.netlify.app");
			res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
			res.setHeader("Access-Control-Allow-Credentials", "Content-Type");
			return res.json(users);
		} catch (e) {
			next(e);
		}
	}
	async sendActivationMail(req, res, next) {
		try {
			const { email } = req.body;
			const userData = await userService.sendActivationMail(email);
			res.setHeader("Access-Control-Allow-Origin", "https://sneaker-one.netlify.app");
			res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
			res.setHeader("Access-Control-Allow-Credentials", "Content-Type");
			return res.json(userData);
		} catch (e) {
			next(e);
		}
	}
	async getArticles(req, res, next) {
		try {
			const { id } = req.body;
			const Article = await articleService.getArticle(id);
			res.setHeader("Access-Control-Allow-Origin", "https://sneaker-one.netlify.app");
			res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
			res.setHeader("Access-Control-Allow-Credentials", "Content-Type");
			return res.json(Article);
		} catch (e) {
			next(e);
		}
	}
}
module.exports = new UserController();
