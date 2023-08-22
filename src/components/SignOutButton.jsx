'use client'
import {useState } from 'react';
import Button from "@/components/Button";
import { signOut } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { Loader2, LogOut } from 'lucide-react';

const SignOutButton= ({...props}) => {
    const [isSiginingOut, setisSiginingOut] = useState(false)
  return <Button  {...props} variant={'ghost'} onClick={async () =>{
    setisSiginingOut(true)
    try {
        await signOut()
    } catch (error) {
        toast.error("There was a problem sigining out.")
    } finally{
        setisSiginingOut(false)
    }
  }}>
    {isSiginingOut ? (
        <Loader2 className='animate-spin h-4 w-4' />
    ) : (
        <LogOut className='w-4 h-4' />
    )}
  </Button>
};

export default SignOutButton;