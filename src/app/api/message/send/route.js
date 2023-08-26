import { authOptions } from "@/lib/auth"
import { pusherServer } from "@/lib/pusherServer"
import Chat from "@/modal/ChatSchema"
import Messages from "@/modal/MessagesSchema"
import Users from "@/modal/UserSchema"
import { getServerSession } from 'next-auth'
import { NextResponse } from "next/server"

export async function POST(req) {
  const session = await getServerSession(authOptions)
  const { content, recipientId } = await req.json()
  if (!session) return new Response('Unauthorized', { status: 401 })

  // check if the same user is trying to send message to itself 
  if (recipientId === session.user.id) return NextResponse.json({ msg: "You cannot send message to yourself" }, { status: 401 })

  try {
    // check if the sender even exist
    const sender = await Users.findById(session.user.id)
    const recipient = await Users.findById(recipientId)
    if (!recipient) return NextResponse.json({ message: 'NO user exists.' }, { status: 404 })
    // check if the user who is sending the message is friend with the receiver or not 
    const isFriend = recipient.friends.some((id) => id.toString() === sender._id.toString())
    if (!isFriend) return NextResponse.json({ message: 'You both are not friends with each other.' }, { status: 404 })
    // finally send the message 


    const savedMessage = new Messages({
      sender: sender._id,
      content: content
    })
    // realtime :
    pusherServer.trigger("message_channel", "message_event", {
     savedMessage
    })
    // save message
    await savedMessage.save()
    let chat = await Chat.findOne({ participants: { $all: [sender._id, recipient._id] } });

    if (!chat) {
      chat = new Chat({
        participants: [sender._id, recipient._id],
        messages: [savedMessage._id]
      });
      // save chat
      const savedChat = await chat.save();
      console.log("New Chat created with Participants and Message:", savedChat);
    } else {
      chat.messages.push(savedMessage._id);
      // save chat
      const savedChat = await chat.save();
      console.log("Message appended to existing Chat:", savedChat);
    }
    return NextResponse.json({ success: true, savedMessage }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error while writing to database" }, { status: 500 });
  }
}