// import { authOptions } from '@/lib/auth'
// import { getServerSession } from 'next-auth'
"use client"
import { cn } from '@/lib/utils'
import { format,parseISO  } from 'date-fns'
import Image from 'next/image'
import React, { useRef, useState } from 'react'

const Messages = ({ initialMessages, sessionId, chatPartner, sessionImg }) => {
  // const session = await getServerSession(authOptions)
  const yourMessage = initialMessages.filter((message) => message.sender.toString() === sessionId)
  const partnerMessage = initialMessages.filter((message) => message.sender.toString() === chatPartner._id.toString())
  const [messages, setMessages] = useState(initialMessages.reverse())

console.log(messages)

  const scrollDownRef = useRef(null)

  const formatTimestamp = (timestamp) => {
    return format(parseISO(timestamp), 'HH:mm')
  }
  return (
    // <div className='flex items-end h-full justify-between px-5 py-2'>
    //   <div className='flex flex-col gap-4  w-full border-2'>{partnerMessage.map((message) => (
    //     <div className='flex gap-2 items-center justify-start w-full'>
    //     <Image
    //       src={chatPartner.image}
    //       width={40}
    //       height={40}
    //       className='rounded-full'
    //     />
    //     <p className='bg-blue-600 h-full w-full text-right text-white py-2 px-4 rounded-3xl'>{message.content}</p>
    //   </div>
    //   ))}</div>
    //   <div className='flex flex-col gap-4 '>{yourMessage.map((message) => (
    //     <div className='flex gap-2 items-center justify-end w-full'>
    //       <p className='bg-blue-600 flex h-full w-full text-right text-white py-2 px-4 rounded-3xl'>{message.content}</p>
    //       <Image
    //         src={sessionImg}
    //         width={40}
    //         height={40}
    //         className='rounded-full'
    //       />
    //     </div>
    //   ))}</div>
    // </div>


    <div
    id='messages'
    className='flex h-full flex-1 flex-col-reverse  gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch'>
    <div ref={scrollDownRef} />

    {messages.map((message, index) => {
      const isCurrentUser = message.sender === sessionId

      const hasNextMessageFromSameUser =
        messages[index - 1]?.sender === messages[index].sender

      return (
        <div
          className='chat-message '
          key={`${message.id}-${message.timestamp}`}>
          <div
            className={cn('flex items-end', {
              'justify-end': isCurrentUser,
            })}>
            <div
              className={cn(
                'flex flex-col space-y-2 text-base max-w-xs mx-2',
                {
                  'order-1 items-end': isCurrentUser,
                  'order-2 items-start': !isCurrentUser,
                }
              )}>
              <span
                className={cn('px-4 py-2 rounded-lg inline-block', {
                  'bg-indigo-600 text-white': isCurrentUser,
                  'bg-gray-200 text-gray-900': !isCurrentUser,
                  'rounded-br-none':
                    !hasNextMessageFromSameUser && isCurrentUser,
                  'rounded-bl-none':
                    !hasNextMessageFromSameUser && !isCurrentUser,
                })}>
                {message.content}{' '}
                <span className='ml-2 text-xs text-gray-400'>
                  {formatTimestamp(message.timestamp)}
                </span>
              </span>
            </div>

            <div
              className={cn('relative w-6 h-6', {
                'order-2': isCurrentUser,
                'order-1': !isCurrentUser,
                invisible: hasNextMessageFromSameUser,
              })}>
              <Image
                fill
                src={
                  isCurrentUser ? (sessionImg ) : chatPartner.image
                }
                alt='Profile picture'
                referrerPolicy='no-referrer'
                className='rounded-full'
              />
            </div>
          </div>
        </div>
      )
    })}
  </div>

















  )
}

export default Messages