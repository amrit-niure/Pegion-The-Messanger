'use client'
import { useState } from 'react';
import Button from '@/components/Button';
import * as yup from 'yup'
import axios from 'axios'
import { Formik } from 'formik'
import { AtSign } from 'lucide-react'
import { Toaster, toast } from 'react-hot-toast';
const AddFriend = () => {

  const handleFormSubmit = async (values, onSubmitProps) => {
    try {
      const res = await axios.post('http://localhost:3000/api/friends/add', values)
      console.log("Frontend Response : ", res)
      toast.success("Friend Request Sent !")
      onSubmitProps.resetForm()
    } catch (error) {
      console.log(error)
      toast(error.response?.data?.message || 'An error occurred', { duration: 2000, icon: '☠️' });
      onSubmitProps.resetForm()
    }
  }
  const emailValidition = yup.object().shape({
    email: yup.string().required("Required"),
  })

  return (
    <div>
      <Toaster />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={{ email: '' }}
        validationSchema={emailValidition}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          resetForm,
          handleSubmit
        }) => (
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <div className="flex flex-col gap-2 text-slate-900">
              <div className='flex items-center justify-between pr-2 pl-1 dark:text-slate-200'>
                <label htmlFor="email" className='text-md  flex items-center '><AtSign size={15} />dd by Email</label>
              </div>
              <input
                type="text"
                id='email'
                name='email'
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Email"
                className={`px-[1rem] focus:outline-none border-2 py-[0.5rem] rounded-md text-light-primary dark:text-slate-200 w-min`}
              />
            </div>
            <Button type="submit" className={'w-min'} >Add</Button>
          </form>
        )}
      </Formik>
    </div>
  )

}

export default AddFriend;

