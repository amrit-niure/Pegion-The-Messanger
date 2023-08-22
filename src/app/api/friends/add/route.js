import connectionDB from "@/lib/dbConnection";
import Users from "@/modal/UserSchema";
import { NextResponse } from "next/server"
import { authOptions } from '@/lib/auth'
import { getServerSession } from "next-auth/next"


export async function POST(req) {
    const { email } = await req.json()
    console.log(email)
    const session = await getServerSession(authOptions)
    console.log("Route : ", session)

    if (!session) {
        return new Response("Not Authorized", { status: 401 })
    }
    await connectionDB()
    // check if the request is sent to itself 
    if (email === session.user.email) {
        let json_response = {
            status: "success",
            message: "You cannot send friend request to yourself.",
        };
        return NextResponse.json(json_response, { status: 401 });
    }

    // check if the user exists or not
    const user = await Users.findOne({ email: email })
    if (!user) {
        let json_response = {
            status: "success",
            message: "No User Exists!",
        };
        return NextResponse.json(json_response, { status: 401 });
    }

    // check if there the request is already sent
    const requestedUser = await Users.findById(user.id)
    if (requestedUser) {
        // Check if the requesting user's ID is present in the incoming_request array
        const alreadySentRequest = requestedUser.incoming_request.some(
            (request) => request._id.toString() === session.user.id
        );
        if (alreadySentRequest) {
            return NextResponse.json({ status: 'success', message: "Request already sent!" }, { status: 401 });
        }
    }

    // check if you already have his request 
    const session_user = await Users.findById(session.user.id)
    const AlreadyHasRequest = session_user.incoming_request.some(
        (request) => request._id.toString() === requestedUser._id.toString()
    );
    if (AlreadyHasRequest) {
        return NextResponse.json({ status: 'success', message: `Your already have ${requestedUser.name} request!` }, { status: 401 });
    }
 
    // check if they are already friends 
     const areFriends = session_user.friends.some(
        (request) => request._id.toString() === requestedUser._id.toString()
    );
    if (areFriends) {
        return NextResponse.json({ status: 'success', message: `Your are already friends with ${requestedUser.name} ` }, { status: 401 });
    }
 await Users.findByIdAndUpdate(user.id, { $push: { incoming_request: session.user.id } }, { new: true, useFindAndModify: false })
    return NextResponse.json({ status: 'success', message: `Request succesfully sent to ${requestedUser.name} ` }, { status: 200 });
}