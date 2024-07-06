import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import {NextRequest, NextResponse} from "next/server"
import bcryptjs from "bcryptjs"
import bcrypt from "bcrypt"
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest){
    try{
        const reqBody = await request.json();
        const {username, email, password} = reqBody;

        // Validation
        console.log(reqBody);

        if(!username || !email || !password){
            return NextResponse.json({error: "Please Enter all Fields"}, {status: 400});
        }

        const user = await User.findOne({email});
        if(user){
            return NextResponse.json({
                error: "User already exists!",
            }, {status: 400});
        }


        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            email, 
            username,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();
        console.log(savedUser);

        // Send Verification Email
        await sendEmail({email, emailType: 'VERIFY', userId: savedUser._id});

        return NextResponse.json({
            message: "User Registered Successfully",
            success: true,
            savedUser,
        }, {status: 200});
        
    }catch(err:any){
        return NextResponse.json({
            error: err.message, 
        }, {status: 500});
    }
}