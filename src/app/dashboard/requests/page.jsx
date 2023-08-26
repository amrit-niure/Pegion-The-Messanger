import FriendRequests from '@/components/FriendRequest';
import { authOptions } from '@/lib/auth';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import { cookies } from 'next/headers';
import React from 'react'

const Requests = async () => {
  const session = await getServerSession(authOptions)
  if (!session) notFound()
  const cookie = cookies().get('next-auth.session-token')
  async function friendRequest() {
    try {
      const response = await axios(`http://localhost:3000/api/friends/${session.user.id}`, {
        headers: {
          Cookie: `${cookie.name}=${cookie.value}`
        }
      });
      console.log('Response data request ',response.data.requests)
      return response.data.requests

    } catch (error) {
      console.error("Fetch error:", error);
      return 'Fetch Error';
    }
  }

  const requests = await friendRequest();
  console.log('Request : ',requests)
  // console.log('Dashboard Request (Request) :', requests)

  return (
    <main className='pt-8'>
      <h1 className='font-bold text-5xl mb-8'>Incoming Friend Requests</h1>
      <div className='flex flex-col gap-4'>
        <FriendRequests
          incomingFriendRequests={requests}
          sessionId={session.user.id}
        />
      </div>
    </main>
  )
}

export default Requests