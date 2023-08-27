
"use client"
import { pusherClient } from '@/lib/pusherServer'
import { cn } from '@/lib/utils'
import { format, parseISO } from 'date-fns'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

const Messages = ({ initialMessages, sessionId, chatPartner, sessionImg, chatId }) => {

  const [user1, user2] = chatId.split('--')
  const [messages, setMessages] = useState(initialMessages.reverse())
  // if(sessionId ===  user2){
    useEffect(() => {
      pusherClient.subscribe("message_channel")
      // 
      const messageHandler = ({recipientId ,_doc:savedMessage,prevChatId}) => {
        if(chatId === prevChatId){
          setMessages((prev) => [savedMessage, ...prev])
        }
      }

      pusherClient.bind("message_event", messageHandler)
      return () => {
        pusherClient.unsubscribe('message_channel')
        pusherClient.unbind('message_event', messageHandler)
      }
    }, [chatId])
  // }


  

  const scrollDownRef = useRef(null)

  const formatTimestamp = (timestamp) => {
    if (!timestamp) {
      return ''; // or some default value
    }

    return format(parseISO(timestamp), 'HH:mm')
  }
  return (
    <div
      id='messages'
      className=' dark flex h-full flex-1 flex-col-reverse gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch dark:scrollbar-track-blue-lighter-dark dark:scrollbar-thumb-blue-dark'>
      <div ref={scrollDownRef} />

      {messages?.map((message, index) => {
        const isCurrentUser = message.sender === sessionId

        const hasNextMessageFromSameUser =
          messages[index - 1]?.sender === messages[index].sender

        return (
          <div
            className='chat-message '
            key={`${message._id}-${message.createdAt}`}>
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
                    {formatTimestamp(message.createdAt)}

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