import connectionDB from "@/lib/dbConnection";
import Users from "@/modal/UserSchema";
import { NextResponse } from "next/server"
import { authOptions } from '@/lib/auth'
import { getServerSession } from "next-auth/next"
import { pusherServer } from "@/lib/pusherServer";

export async function POST(req) {
    const { id } = await req.json()
    console.log(id)
    const session = await getServerSession(authOptions)

    if (!session) {
        return new Response("Not Authorized", { status: 401 })
    }
    const userId = session.user.id
    const friendId = id
    await connectionDB()
    // check if the users are already friends or not 
    const session_user = await Users.findById(session.user.id)
    const friend = await Users.findById(id)
    const areAlreadyFriends = session_user.friends.some(
        (friend) => friend._id.toString() === friendId
    );
    if (areAlreadyFriends) {
        return NextResponse.json({ status: 'success', message: `Your both are already friends` }, { status: 401 });
    }
    //realtime functionality 
pusherServer.trigger("accept_deny_channel","accept_deny_event",{
    friend
})

    try {
        await Users.findByIdAndUpdate(
            userId,
            { $push: { friends: friendId } },
            { new: true, useFindAndModify: false }
        )
        await Users.findByIdAndUpdate(
            friendId,
            { $push: { friends: userId } },
            { new: true, useFindAndModify: false }
        )
        // delete the incoming request of the sender after accepting the request
        const updatedUser = await Users.findByIdAndUpdate(
            userId,
            { $pull: { incoming_request: friendId } },
            { new: true }
        );
        if (!updatedUser) {
            return NextResponse.json({ message: "User Not found !" }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ message: "Error while writing to database" }, { status: 500 });
    }

    return NextResponse.json({ message: "Friend Request Accepted!" }, { status: 200 });

}