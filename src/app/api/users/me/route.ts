import {connect} from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";

connect();

export async function POST(request: NextRequest){
    try{
        // Extract Data from Token
        const userId = await getDataFromToken(request);

        const user = await User.findOne({_id: userId}).select("-password");

        // Check if There is no user
        return NextResponse.json({
            message: "Data Found",
            data: user,
        }, {status: 200});

    }catch(err:any){
        return NextResponse.json({
            success: false,
            error: err.message,
        }, {status: 500});
    }
}