import {connect} from "@/dbConfig/dbConfig"
import { NextResponse, NextRequest } from "next/server"

connect();

export async function GET(request: NextRequest){
    try{
        const response = NextResponse.json({
            message: "Logged out Successfully!",
            success: true,
        });

        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0),
        });

        return response;

    }catch(err: any){
        return NextResponse.json({
            error: err.message, 
            success: false,
        }, {status: 500});
    }
}