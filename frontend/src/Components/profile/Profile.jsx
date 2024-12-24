import React, { useState,useEffect } from 'react'
import Navbar from '../sharedf/Navbar'
import { Avatar } from '@radix-ui/react-avatar'
import { AvatarImage } from '../ui/avatar'
import Image from "./images.png"
import { Button } from '../ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Label } from '../ui/label'
import AppliedJob from '../AppliedJob'
import UpdateProfile from '../UpdateProfile'
import { useSelector } from 'react-redux'
import useGetAllAppliedJob from '@/Hooks/useGetAllAppliedJob'




const isResume = true;
export default function Profile() {

    useGetAllAppliedJob();
    const [open,setOpen] =useState(false)

 const {user}=useSelector(store=>store.auth);


    return (
        <div className=''>
            <Navbar />
            <div className='max-w-3xl mx-auto bg-violet-200  border-gray-200 rounded-2xl my-5  p-5 w-3/4 md:w-2/3 relative' >
            <Button onClick={()=>setOpen(true)} className="absolute top-4 right-4  h-5 p-2 lg:h-8 lg:p-4 " variant="outline"><Pen className='w-3 lg:w-4 2xl:w-5' /></Button>
                <div className='flex justify-between'>
              
                    <div className='flex items-center gap-3 flex-wrap'>
                    
                        <Avatar className='h-20 w-20'>
                            <AvatarImage src={user?.profile?.profilePhoto} className=' h-30 w-60 rounded-2xl' />
                        </Avatar>
                        <div><h1 className='font-medium lg:text-xl text-md'>{user?.fullname}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    
                </div>
                <div className='xl:my-5 my-3'>
                    <div className='flex items-center xl:gap-2  gap-1 my-2'>
                        <Mail />
                        <span>{user?.email}</span>

                    </div>
                    <div className='flex items-center xl:gap-3 gap-1  my-2'>
                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className='my-5 font-bold'>
                    <h1>Skills</h1>
                    <div className='flex items-center gap-1 flex-wrap'>
                        {
                          user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item,index) => <Badge key={index}>{item}</Badge>) : <spn>NA</spn>
                        }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className=' text-md font-bold'>Resume</Label>
                    {
                      
                     isResume ? <a target='blank' href='' className='text-violet-500 hover:underline cursor-pointer'> {user?.profile?.resumeOriginalName}</a>:<span>NA</span>
               }
                </div>
                
            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl text-center p-1'>
                 <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                <AppliedJob/> 
                
         </div>
         <UpdateProfile open={open} setOpen={setOpen}/> 
        </div>
    )
}
