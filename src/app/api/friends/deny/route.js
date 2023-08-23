import connectionDB from "@/lib/dbConnection";
import Users from "@/modal/UserSchema";
import { NextResponse } from "next/server"
import { authOptions } from '@/lib/auth'
import { getServerSession } from "next-auth/next"

export async function POST(req) {
    const { id } = await req.json()
    const session = await getServerSession(authOptions)
    console.log("Route : ", session)

    if (!session) {
        return new Response("Not Authorized", { status: 401 })
    }
    const userId = session.user.id;
    const friendId = id;
    // delete the incoming request of the sender 
    try {
        const updatedUser = await Users.findByIdAndUpdate(
            userId,
            { $pull: { incoming_request: friendId } },
            { new: true }
        );

        if (!updatedUser) {
            return NextResponse.json({ message: "User Not found !" }, { status: 404 });
        }
    } catch (error) {
        console.error("Error:", error);
    }
    return NextResponse.json({ message: "Friend Request Accepted!" }, { status: 200 });

}