import connectionDB from "@/lib/dbConnection";
import Users from "@/modal/UserSchema";
import { NextResponse } from "next/server"
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
export async function GET(req,{params}){
    // const session = await getServerSession(authOptions)
    // if (!session) {
    //     return new Response("Not Authorized", { status: 401 })
    // }
    const id = params.id
    await connectionDB()
    const user = await Users.findById(id).populate("friends").populate("incoming_request")
 return NextResponse.json({friends : user.friends, requests : user.incoming_request,user}, { status: 200 });
}