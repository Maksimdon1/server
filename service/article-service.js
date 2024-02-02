const ApiError = require("../exceptions/api-error");
const UserDto = require("../dtos/user-dto");
const { FindArticle } =  require( "../Articles/FindArticle");


class ArticleService {
	async getArticle(id) {

		

			let Article = await FindArticle(1);
			console.log(Article, 1);
			

			if (Article.state == false) {
				// throw new Error('пользователь есть или не указан email')
				throw ApiError.ArticleNotFound("Статья не найдена");
			} else {
				
				return {
					...Article.data,
				};
			}
		
	}
}

module.exports = new ArticleService();
