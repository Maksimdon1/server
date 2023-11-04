const  {findEmail} =  require("../data-base/find-email");
const  {addUser} =  require("../data-base/add-user");
const  {findActivation} =  require("../data-base/find-user-by-activation");
const  {setIsActivated} =  require("../data-base/set-IsActivated");
const {findUserByEmail} = require("../data-base/find-user-by-email")
const ApiError = require("../exceptions/api-error")
const bcrypt = require('bcrypt');
const mailService = require("./mail-service");
const TokenService = require("./token-service");
const UserDto = require('../dtos/user-dto');
const {IsrefreshToken} = require("../data-base/IsRefreshToken")
const {findUserById} = require("../data-base/find-user-by-id")
const {AllUsers} = require("../data-base/getAllUsers")
const {UpdateLoginTime} = require("../data-base/update-login-time")

class UserService{
    async rigistration(email, password, bonuses, login, phone, name, lastname, syslevel){
    
        try {
          let IsEmailRegistered = await findEmail(email);

        

          if(IsEmailRegistered.state == true){
                // throw new Error('пользователь есть или не указан email')
                throw ApiError.BadRequest('ошибка при вводе формы или email уже используется')
                
               
          }
            else{
         
        
        const Addresult = await addUser(email, password, bonuses, login, phone, name, lastname, syslevel)
       
      
        
        if(Addresult){
      
            await mailService.sendActivationMail(email, `${process.env.API_URL}/server/api/activate/${Addresult.ActivationLink}`)
       
      

            const userDto = new UserDto(Addresult)


            
           
            const token = TokenService.generateTokens(userDto);

            
            let refreshToken  = ''
            let accessToken = '' 
            await token.then((el)=>{
                refreshToken = el.refreshToken
                accessToken = el.accessToken
                
              })
              await TokenService.saveUser(userDto.Id,  refreshToken)

           
            return{
      
                
                     accessToken,
                     refreshToken,
                
                user: userDto
            }
        }
        else {

            // throw new Error('ошибка при добавлении')
           
        }
        
    }
          

            
        } catch (error) {
            throw ApiError.BadRequest('ошибка при вводе формы или email уже используется')
        }
    }

    async activate(activationLink){
        const user = await findActivation(activationLink)

        if(!user.state){

            throw ApiError.BadRequest('некорректная ссылка активации')
        }
        else{
            setIsActivated(activationLink)

        }
    }


    async login(email, password) {
        try {
            
            
        const user = await findUserByEmail(email)

       
        
        
        if (!user) {
            
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }
        else{
            await UpdateLoginTime(user.Login, user.Password)
        const isPassEquals = await bcrypt.compare(password, user.Password);

        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль');
        }
        else{
        const userDto = new UserDto(user);
    
        const token = TokenService.generateTokens(userDto);
        let refreshToken  = ''
        let accessToken = '' 
        await token.then((el)=>{
            refreshToken = el.refreshToken
            accessToken = el.accessToken
            
            })

        await TokenService.saveUser(userDto.Id,  refreshToken)
        return {token: {refreshToken:refreshToken,accessToken : accessToken}, user: userDto}
        }
    }}
        catch (error) {

            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }
    }




    async logout(refreshToken) {

        const IsToken = await IsrefreshToken(refreshToken)
        if(!IsToken){

            return
        }

        const token = await TokenService.deleteToken(refreshToken);
        return token;
    }


    async refresh(refreshToken) {
 
      
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }

        const userData = TokenService.validateRefreshToken(refreshToken);
      

        const tokenFromDb = await TokenService.findToken(refreshToken);


        if (userData== null || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }


        const user = await findUserById(userData.payload.Id);
        
        const userDtos = new UserDto(user);

    
        const tokens = TokenService.generateTokens(userDtos);
        let refreshTokenNew  = ''
        let accessToken = '' 
        await tokens.then((el)=>{
            refreshTokenNew = el.refreshToken
            accessToken = el.accessToken
            
          })
    

        await TokenService.saveUser(userDtos.Id, refreshTokenNew);

        return {
            'refreshToken': refreshTokenNew, 

            'accessToken':accessToken,
            
            user: userDtos
    }
    }
    async getAllUsers() {

        return await AllUsers()
    }
    async sendActivationMail(email){

        if(!email){
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }

        const user = await findUserByEmail(email)
        if(!user.SysLevel){

            await mailService.sendActivationMail(email, `${process.env.API_URL}/server/api/activate/${Addresult.ActivationLink}`)
        return user
        }
        else{
             throw ApiError.EmailIsActivated('email is already activated')
        }

    }

}

module.exports = new UserService();





// {
//     Id: 15,
//     Login: 'natalia',
//     Email: 'bytedreames@gmail.comd',
//     Phone: '+7(925)-641-65-25',
//     Password: '$2b$04$sc99adEN3bA0CihRTrSrDevHsmJCk7/LDd3bI8/I/yPmgHYPOKGLq',
//     Name: 'natalia',
//     Surname: 'kozyreva',
//     Token: '',
//     SysLevel: 0,
//     DateLoggedIn: null,
//     DateCreated: 'Wed Nov 01 2023 00:45:52 GMT+0300 (Moscow Standard Time)',
//     Bonuses: null,
//     ActivationLink: '8f7c3804-b319-487b-96aa-f06e27a0adfc'
//   }