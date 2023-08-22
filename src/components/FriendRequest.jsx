'use client'

import axios from 'axios'
import { Check, UserPlus, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'


const FriendRequests= ({
  incomingFriendRequests,
  sessionId,
}) => {
  const router = useRouter()
  const [friendRequests, setFriendRequests] = useState(
    incomingFriendRequests
  )

console.log(friendRequests)
  const acceptFriend = async (senderId) => {
    try {
        await axios.post('/api/friends/accept', { id: senderId })

    setFriendRequests((prev) =>
      prev.filter((request) => request._id !== senderId)
    )
    toast.success("Friend Request Accepted !")
    } catch (error) {
        toast(error.response?.data?.message || 'An error occurred', { duration: 2000, icon: '☠️' });
    }finally{
        router.refresh()
    }
  }

  const denyFriend = async (senderId) => {
    await axios.post('/api/friends/deny', { id: senderId })

    setFriendRequests((prev) =>
      prev.filter((request) => request._id !== senderId)
    )

    router.refresh()
  }

  return (
    <>
    <Toaster />
      {friendRequests.length === 0 ? (
        <p className='text-sm text-zinc-500'>No friend requests...</p>
      ) : (
        friendRequests.map((request) => (
          <div key={request._id} className='flex gap-4 items-center'>
            <UserPlus className='text-black' />
            
            <div>
            <h2 className='font-semibold'> {request.name}</h2>
            <p className='font-medium italic'>{request.email}</p>
            </div>
            <button
              onClick={() => acceptFriend(request._id)}
              aria-label='accept friend'
              className='w-8 h-8 bg-indigo-600 hover:bg-indigo-700 grid place-items-center rounded-full transition hover:shadow-md'>
              <Check className='font-semibold text-white w-3/4 h-3/4' />
            </button>

            <button
              onClick={() => denyFriend(request._id)}
              aria-label='deny friend'
              className='w-8 h-8 bg-red-600 hover:bg-red-700 grid place-items-center rounded-full transition hover:shadow-md'>
              <X className='font-semibold text-white w-3/4 h-3/4' />
            </button>
          </div>
        ))
      )}
    </>
  )
}

export default FriendRequests

// import React from 'react'

// const FriendRequest = ({
//     incomingFriendRequests,
//     sessionId,
// }) => {
//     return (
//         <div>FriendRequest of {sessionId}</div>
//     )
// }

// export default FriendRequest