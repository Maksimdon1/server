const ApiError = require("../exceptions/api-error");
const UserDto = require("../dtos/user-dto");
const { UpdateToAdmin } =  require( "../Admin-data-base/UpdateToAdmin");
const { GetPayments } =  require( "../Admin-data-base/GetPayments");


class AdminService {
	async Update_To_Admin(email, Admin_Email) {


		

			let Result = await UpdateToAdmin(email, Admin_Email);
			
			

			if (!Result) {
				// throw new Error('пользователь есть или не указан email')
				throw ApiError.ArticleNotFound("Ошибка");
			} else {
				
				return {
					Result,
				};
			}
		
	}
	async Get_Payments() {


		

		let Result = await GetPayments();
		
		

		if (!Result) {
			// throw new Error('пользователь есть или не указан email')
			throw ApiError.ArticleNotFound("Ошибка");
		} else {
			
			return {
				Result,
			};
		}
	
}
}

module.exports = new AdminService();
