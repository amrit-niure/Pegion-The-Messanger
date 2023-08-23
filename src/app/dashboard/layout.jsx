import SignOutButton from '@/components/SignOutButton';
import { authOptions } from '@/lib/auth';
import { notFound } from "next/navigation";
import { SendHorizonal, UserPlus } from 'lucide-react';
import { getServerSession } from 'next-auth';
import FriendRequestSidebarOptions from '@/components/FriendRequestsSidebar';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import axios from 'axios';
import SidebarChatList from '@/components/SidebarChatList';

const Layout = async ({ children }) => {
  const session = await getServerSession(authOptions);
  const sidebarOptions = [
    {
      id: 1,
      name: "Add Friends",
      href: "/dashboard/add",
      Icon: UserPlus,
    },
  ];
  async function fetchData() {
    try {
      const response = await fetch(`http://localhost:3000/api/friends/${session.user.id}`);

      if (!response.ok) {
        throw new Error(`Fetch failed with status ${response.status}`);
      }
      const data = await response.json();
      return data
    } catch (error) {
      console.error("Fetch error:", error);
      return 'Fetch Error';
    }
  }

  const fetchedData = await fetchData();
  const unseenRequestCount = fetchedData.requests.length
  const friends = fetchedData.friends
  // console.log("Dashboard Layout (Friends) :",friends)
  if (!session) notFound();
  return (
    <div className="w-full flex h-screen">
      <div className="flex h-full w-full  max-w-xs grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
        <Link href="/dashboard" className="flex h-16 shrink-0 items-center">
          <SendHorizonal className="h-8 w-auto text-indigo-600" />
        </Link>

        {friends?.length > 0 && (
          <div className="text-xs font-semibold leading-6 text-gray400 ">
            Your Chats
          </div>
        )} 
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <SidebarChatList friends={friends} sessionId={session.user.id} />{" "}
            </li>
            <li>
              <div className="text-sx font-semibold leading-6 text-gray-400">
                Overview
              </div>
              <ul role="list" className="-mx-2 mt-2 space-y-1">
                {sidebarOptions.map((option) => {
                  const Icon = option.Icon;
                  return (
                    <li key={option.id}>
                      <Link
                        href={option.href}
                        className="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex gap-3 rounded-md p-2 text-sm font-semibold"
                      >
                        <span className="text-gray-400 border-200 group-hover:border-indigo-600 group-hover:text-indigo-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="truncate">{option.name}</span>
                      </Link>
                    </li>
                  );
                })}
                <li>
                  <FriendRequestSidebarOptions
                    sessionId={session.user.id}
                    initialUnseenRequestCount={unseenRequestCount}
                  />
                </li>
              </ul>
            </li>

            {/* Bottom part  */}
            <li className="-mx-6 mt-auto flex items-center">
              <div className="flex flex-1 items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900">
                <div className="relative h-8 w-8 bg-gray-50">
                  <Image
                    fill
                    referrerPolicy="no-referrer"
                    className="rounded-full"
                    src={session.user.image || ""}
                    alt="Your Profile Picture"
                  />
                </div>
                <span className="sr-only">Your Profile</span>
                <div className="flex flex-col">
                  <span aria-hidden="true">{session.user.name}</span>
                  <span className="text-xs text-zinc-400 " aria-hidden="true">
                    {session.user.email}
                  </span>
                </div>
              </div>
              <SignOutButton className="h-full aspect-square" />
            </li>
          </ul>
        </nav>
      </div>
      <div className='px-8'>

        {children}
      </div>
    </div>
  )
}

export default Layout