const nodemail = require("nodemailer")
class MailService{
    constructor(){
        this.transporter = nodemail.createTransport({
            host:process.env.SMTP_HOST,
            port:process.env.SMTP_PORT,
            secure: false,
            auth:{
                user:process.env.SMTP_MAIL,
                pass: process.env.SMTP_PASSWORD

            }
        })
    }
    async sendActivationMail(email, link ){
        let result = 0

   
     
           const info =  await this.transporter.sendMail({
            from: process.env.SMTP_MAIL,
            to : email,
            subject: 'активация аккаунта в сервисе flower-lover' + process.env.SITE_URL,
            text : '',
            html:
            `
            <div>
            <h1>для активации перейдите по ссылке</h1>
            <a href=${link}>${link}</a>
            </div>
            `

        })
        if(info){
            result = 1
        }
       
        
            return result
    }

}

module.exports = new MailService();







          
