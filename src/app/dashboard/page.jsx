"use client"
import React from 'react'
import { useSession } from 'next-auth/react'
const Dashboard = () => {
  const session = useSession()
  console.log("FrontEnd ", session)
  const {data} = session
  return (
    <div>Welcome : {data?.user.name}</div>
  )
}

export default Dashboard