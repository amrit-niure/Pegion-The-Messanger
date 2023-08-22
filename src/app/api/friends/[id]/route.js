import connectionDB from "@/lib/dbConnection";
import Users from "@/modal/UserSchema";
import { NextResponse } from "next/server"
import { authOptions } from '@/lib/auth'
import { getServerSession } from "next-auth/next"

export async function GET(req,{params}){
    const id = params.id
    await connectionDB()
    const user = await Users.findById(id).populate("friends").populate("incoming_request")
 return NextResponse.json({friends : user.friends, requests : user.incoming_request}, { status: 200 });
}