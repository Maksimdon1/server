const jwt = require('jsonwebtoken');
const  {findTokenByUserId} =  require("../data-base/find-user-token-by-id");
const {addUserToken,changeUserToken} = require("../data-base/add-user-token")
const {DeleteToken} = require("../data-base/Dekete-token")
const {findToken} = require("../data-base/find-token")


class TokenService{
    async generateTokens(payload){
       
 
        const accessToken = jwt.sign({payload}, process.env.JWT_ACCESS_SECRET, {expiresIn:'30m'})
        const refreshToken = jwt.sign({payload}, process.env.JWT_REFRESH_SECRET, {expiresIn:'5d'})
        return{
            accessToken,
            refreshToken
        }
    }
    async saveUser(UserId, refreshToken){
  

        const IsUserExist =  findTokenByUserId(UserId)

        
     
        const isUserToken = await  IsUserExist.then((el)=>{
          
             
             return el
        })
       
   

        if(isUserToken){
         
            changeUserToken(UserId, refreshToken)


        }
        else{

          
            addUserToken(UserId, refreshToken)
        }
        return refreshToken
    }
    async deleteToken(refreshToken){

       
   

      
           const deleteResult = await DeleteToken(refreshToken)

         
            

        return refreshToken
    }
    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {

          
            
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            ``
            console.log(userData)
            return userData;
        } catch (e) {
 
            return null;
        }
    }
    async findToken(refreshToken){
        const IsUserExist =  findToken(refreshToken)
      
        
     
        const tokenData = await  IsUserExist.then((el)=>{
          
             
             return el
        })


        return tokenData
    }

}

module.exports = new TokenService();