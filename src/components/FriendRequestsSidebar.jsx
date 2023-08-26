'use client'
import { pusherClient } from '@/lib/pusherServer'
import { User } from 'lucide-react'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'


const FriendRequestSidebarOptions = ({
  sessionId,
  initialUnseenRequestCount,
}) => {
  const [unseenRequestCount, setUnseenRequestCount] = useState(
    initialUnseenRequestCount
  )
  const addHandler = () => {
    setUnseenRequestCount(prev => prev + 1)
  }
  const acceptHandler = () => {
    setUnseenRequestCount(prev => prev - 1)
  }
  useEffect(() => {
    pusherClient.subscribe("add_channel")
    pusherClient.subscribe("accept_deny_channel")
    pusherClient.bind("add_event", addHandler)
    pusherClient.bind("accept_deny_event", acceptHandler)
    return () => {
      pusherClient.unsubscribe("add_channel")
      pusherClient.unsubscribe("accept_deny_channel")
      pusherClient.unbind("add_event", addHandler)
      pusherClient.unbind("accept_deny_event", acceptHandler)
    }
  }, [sessionId])


  return (
    <Link
      href='/dashboard/requests'
      className='text-gray-700 dark:text-slate-200  hover:text-indigo-600 hover:bg-gray-50 group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold  dark:hover:text-slate-900'>
      <div className='text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white'>
        <User className='h-4 w-4' />
      </div>
      <p className='truncate '>Friend requests</p>

      {unseenRequestCount > 0 ? (
        <div className='rounded-full w-5 h-5 text-xs flex justify-center items-center text-white bg-indigo-600'>
          {unseenRequestCount}
        </div>
      ) : null}
    </Link>
  )
}

export default FriendRequestSidebarOptions