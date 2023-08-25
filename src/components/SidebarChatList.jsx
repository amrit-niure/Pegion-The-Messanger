'use client'
import { pusherClient } from '@/lib/pusherServer';
import { chatHerfConstructor } from '@/lib/utils';
import {ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


const SidebarChatList= ({friends,sessionId}) => {
    const router = useRouter()
    const pathname = usePathname()
    const [unseenMessages, setunseenMessages] = useState([])
const [friendsList, setFriendsList] = useState(friends)
    // useEffect(() =>{
    //    if(pathname?.includes('chat')){
    //     setunseenMessages((prev) => {
    //         return prev.filter((msg) => !pathname.includes(msg.senderId))
    //     })
    //    }
    // },[pathname])



  return <ul role='list' className='max-[25rem] overflow-y-auto -mx-2 space-y-1 '>
{friends?.sort().map((friend) =>{
    const unseenMessagesCount = unseenMessages.filter((unseenMsg)=>{
        return unseenMsg._id = friend._id
    }).length
 return <li key={friend._id}>
    <a href={`/dashboard/chat/${chatHerfConstructor(sessionId, friend._id)}`} className='text-gray-700 hover:text-indigo-600 hover:bg-slate-50 group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold justify-between'>
      <div className='flex gap-4 items-center justify-center dark:text-slate-200 '>
<Image  src={friend.image} alt='Chat Friend' width={30} height={30} className='rounded-full '/>
 {friend.name}
      </div>
 {unseenMessagesCount > 0 && <div className='bg-indig0-600 font-medium text-xs text-white w-4 h-4 rounded-full flex justify-center items-center'>
  {unseenMessagesCount}
  </div>}
 <ChevronRight className='justify-end dark:text-slate-200 ' />
</a>

 </li>
} )}
  </ul>
};

export default SidebarChatList;