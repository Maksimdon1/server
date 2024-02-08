const ApiError = require("../exceptions/api-error");
const UserDto = require("../dtos/user-dto");
const { UpdateToAdmin } =  require( "../data-base/UpdateToAdmin");


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
}

module.exports = new AdminService();
