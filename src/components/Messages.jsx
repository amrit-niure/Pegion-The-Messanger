
"use client"
import { pusherClient } from '@/lib/pusherServer'
import { cn } from '@/lib/utils'
import { format, parseISO } from 'date-fns'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

const Messages = ({ initialMessages, sessionId, chatPartner, sessionImg }) => {

  const [messages, setMessages] = useState(initialMessages.reverse())
  useEffect(() =>{
    pusherClient.subscribe("message_channel")
    const messageHandler = ({
   savedMessage
   }) => {
     setMessages((prev) => [savedMessage,...prev])
   }
    pusherClient.bind("message_event",messageHandler)
    return () => {
      pusherClient.unsubscribe('message_channel')
      pusherClient.unbind('message_event',messageHandler)
    }
  })
  console.log(messages)

  const scrollDownRef = useRef(null)

  const formatTimestamp = (timestamp) => {
    return format(parseISO(timestamp), 'HH:mm')
  }
  return (
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
                    isCurrentUser ? (sessionImg) : chatPartner.image
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