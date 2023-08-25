import { authOptions } from "@/lib/auth";
import Chat from "@/modal/ChatSchema";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return new Response("Not Authorized", { status: 401 })
    }
    const { users } = params
    // const [userId1, userId2] = users.split('--')
    // const user = session.user.id === userId1 ? userId1 : userId2
    // const partner = user === userId1 ? userId2 : userId1
    // const allChats = await Chat.find({}).populate('messages')
    // // Filter chats where both user and partner are participants
    // const filteredChats = allChats.filter(chat =>
    //     chat.participants.includes(user) && chat.participants.includes(partner)
    // );

    // // Extract messages from filtered chats and flatten the array
    // const messagesArray = filteredChats.map(chat => chat.messages);
    // // const messagesArray = [].concat(...filteredChats.map(chat => chat.messages));
    try {
        console.log(users)
    return new NextResponse(users, { status: 200 });

    } catch (error) {
    return new NextResponse("Problem here", { status: 500 });
        
    }
    return new NextResponse(messagesArray, { status: 200 });
}