const Router = require('express').Router;
const userController = require('../controllers/user-controllers');
const AdminController = require('../controllers/admin-controllers');
const router = new Router();
const {body} = require("express-validator")
router.post('/login', userController.login);

router.post('/registration', body('email').isEmail(), body('password').isLength({min: 2, max: 64}), userController.registration);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.post('/refresh', userController.refresh);
router.post('/sendActivationMail', userController.sendActivationMail);
router.get('/users',  userController.getUsers);
router.post("/get-article", userController.getArticles);
router.post("/admin/update-to-admin", AdminController.UpdateToAdmin);
router.post("/admin/get-payments", AdminController.GetPayments);


module.exports = router