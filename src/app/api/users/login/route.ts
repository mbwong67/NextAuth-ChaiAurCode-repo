import {connect} from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcrypt";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest){
    try{

        const reqBody = await request.json();
        const {email, password} = reqBody;

        console.log(reqBody);

        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({
                success: false,
                error: "User Not Found",
            }, {status: 400});
        }

        console.log("User exists");

        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
            return NextResponse.json({
                error: "Please Check your Credentials",
                success: false,
            }, {status: 400});
        }


        const payload = {
            id: user._id,
            email: email, 
            username: user.username,
        }

        const token = jwt.sign(payload, process.env.TOKEN_SECRET!, {
            expiresIn: "1d",
        });

        const response = NextResponse.json({
            message: "Logged In Success!",
            success: true,

        })

        response.cookies.set("token", token, {
            httpOnly: true,
        });

        return response;

    }catch(err: any){
        return NextResponse.json({
            success: false,
            error: err.message,
        }, {status: 500});
    }
}