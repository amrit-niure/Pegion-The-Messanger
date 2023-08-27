'use client'
import { pusherClient } from '@/lib/pusherServer';
import { chatHerfConstructor } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import UnseenChatToast from '@/components/unseenChatToast';
import { toast } from 'react-hot-toast';


const SidebarChatList = ({ friends, sessionId }) => {
  const router = useRouter()
  const pathname = usePathname()
  const [unseenMessages, setunseenMessages] = useState([])
  const [friendsList, setFriendsList] = useState(friends)

const newFriendHandler = (newFriend) => {
  router.refresh()
  // setFriendsList((prev) => [...prev, newFriend.friend]) //need to work on it
  console.log(newFriend)
}
const chatHandler = (message) => {
const shouldNotify = pathname !== `dashboard/chat/${chatHerfConstructor(sessionId,message.sender)}`
if(!shouldNotify) return 
toast.custom((t) => (
  <UnseenChatToast 
  t={t}
  sessionId={sessionId}
  senderId = {message.sender}
  senderImg = {message.senderImg}
  senderMessage = {message.content}
  senderName = {message.senderName}
  />
))
setunseenMessages((prev) => [...prev,message])
}
// this is for pop up notification purpose
useEffect(() => {
  pusherClient.subscribe("user_chats_channel")
  pusherClient.subscribe("accept_deny_channel")

  pusherClient.bind("notify_message",chatHandler)
  pusherClient.bind("accept_deny_event",newFriendHandler)

  return () => {
    pusherClient.unsubscribe("user_chats_channel")
    pusherClient.unsubscribe("add_channel")
  }
})

  useEffect(() =>{
     if(pathname?.includes('chat')){
      setunseenMessages((prev) => {
          return prev.filter((msg) => !pathname.includes(msg.senderId))
      })
     }
  },[pathname,sessionId,router])

  return <ul role='list' className='max-[25rem] overflow-y-auto -mx-2 space-y-1 '>
    {friendsList?.sort().map((friend) => {
      const unseenMessagesCount = unseenMessages.filter((unseenMsg) => {
        return unseenMsg._id = friend._id
      }).length
      return <li key={friend._id} className='dark:hover:text-slate-900'>
        <a href={`/dashboard/chat/${chatHerfConstructor(sessionId, friend._id)}`} className='text-gray-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-slate-900  hover:bg-slate-50 group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold justify-between '>
          <div className='flex gap-4 items-center justify-center  '>
            <Image src={friend.image} alt='Chat Friend' width={30} height={30} className='rounded-full ' />
            <span>  {friend.name}</span>

          </div>
          {unseenMessagesCount > 0 && <div className='bg-indig0-600 font-medium text-xs text-white w-4 h-4 rounded-full flex justify-center items-center'>
            {unseenMessagesCount}
          </div>}
          <ChevronRight className='justify-end dark:text-slate-200 ' />
        </a>

      </li>
    })}
  </ul>
};

export default SidebarChatList;