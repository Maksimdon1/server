const AdminService = require('../service/admin-service')

class AdminController {
	
	async UpdateToAdmin(req, res, next) {
		try {
			const { email, Admin_Email } = req.body;
			const Result = await AdminService.Update_To_Admin(email, Admin_Email);
            
			return res.json(Result);
		} catch (e) {
			next(e);
		}
	}
	async GetPayments(req, res, next) {
		try {
		
			const Result = await AdminService.Get_Payments();
            
			return res.json(Result);
		} catch (e) {
			next(e);
		}
	}
}
module.exports = new AdminController()