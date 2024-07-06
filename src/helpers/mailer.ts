import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
// const nodemailer = require("nodemailer");

export const sendEmail = async({email, emailType, userId}: any) => {
    try{
        // TODO: Configure mail for usage
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);


        if(emailType === 'VERIFY'){
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000,
            })
        }
        else if(emailType === 'RESET') {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000,
            })
        }



        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "78315b475ee4cb",
              pass: "efc9cb8fca393f"
            }
          });


          const mailOptions = {
            from: 'aryanb198@gmail.com',
            to: email,
            subject: emailType === 'VERIFY' ? 'Verify your Email' : 'Reset your Password',
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">Here</a> to ${emailType === 'VERIFY' ? "verify your email" : "reset your password"} 
                        or copy and paste the link below to your browser . <br>
                        ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`,
          }

          const mailResponse = await transport.sendMail(mailOptions);
          return mailResponse;
    }catch(err:any){
        throw new Error(err.message);
    }
}