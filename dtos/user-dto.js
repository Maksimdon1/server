module.exports = class UserDto{
    Id;
    Login;
    Email;
    Phone;
    Password;
    Name;
    Surname;
    Token;
    SysLevel;
    DateLoggedIn;
    DateCreated;
    Bonuses;
    ActivationLink;
   
    constructor(model){
        this.Id  = model.Id;
        this.Login  = model.Login;
        this.Email  = model.Email;
        this.Phone = model.Phone;
        this.Password = model.Password;
        this.Name = model.Name;
        this.Surname = model.Surname;
        this.Token = model.Token;
        this.SysLevel= model.SysLevel;
        this.DateLoggedIn = model.DateLoggedIn;
        this.DateCreated = model.DateCreated;
        this.Bonuses = model.Bonuses;
        this.ActivationLink = model.activationLink;
       
    }
    
}
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