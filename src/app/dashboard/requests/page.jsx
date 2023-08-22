import FriendRequests from '@/components/FriendRequest';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import React from 'react'

const Requests = async () => {
  const session = await getServerSession(authOptions)
  if (!session) notFound()

  async function friendRequest() {
    try {
      const response = await fetch(`http://localhost:3000/api/friends/${session.user.id}`);

      if (!response.ok) {
        throw new Error(`Fetch failed with status ${response.status}`);
      }
      const data = await response.json();
      return data.requests
    } catch (error) {
      console.error("Fetch error:", error);
      return 'Fetch Error';
    }
  }

  const requests = await friendRequest();
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