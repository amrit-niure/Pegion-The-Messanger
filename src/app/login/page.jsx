'use client'
import React, { useState } from 'react'
import { Send } from 'lucide-react'
import Button from '@/components/Button'
import { signIn } from 'next-auth/react'

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  async function loginWithGoogle() {
      setIsLoading(true) 
    try {
        await signIn('google')
    } catch (error) {
        toast.error("Something went wrong while loggin in. ")
    }finally{
        setIsLoading(false)
    }
  }
  return (
    <div className="w-full h-[100vh] flex items-center justify-center  dark:bg-slate-900 ">
      <div className="flex min-h-4 items-center justify-center py-12 px-6 sm:px-6 lg:px-8 max-w-[500px] w-[80vw]   rounded-md border-2 border-r-slate-300"
      >
        <div className="w-full flex flex-col items-center max-w-md space-y-4">
          {/* top  */}
          <div className="flex flex-col items-center gap-4  w-full">
            <Send size={40} />
            <h2 className="mt-4 text-center dark:text-slate-200 text-2xl font-bold tracking-tight text-grey-900">
              Sign In to  <span className='bg-slate-900 text-white px-2 py-2 font-light'>Pegion</span>
            </h2>
          </div>
          {/* Sign In with Google */}
          <div className='flex flex-col gap-4 w-full'>
            <div className='w-full px-6 flex items-center gap-4 justify-around text-slate-500'>
              <hr className='border-slate-400 w-[50%]' />
              <span className='w-[100px]'>Let's go!</span>
              <hr className='border-slate-400 w-[50%]' /></div>
            {/* providers  */}

            <Button
            isLoading={isLoading}
              className="max-w-sm mx-auto w-full"
              onClick={() => loginWithGoogle()}
            >

              <svg
                className="mr-2 h-4 w-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="github"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
                <path d="M1 1h22v22H1z" fill="none" />
              </svg>

              Sign In with Google
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn