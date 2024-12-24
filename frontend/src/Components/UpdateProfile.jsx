
import React, { useState } from 'react'
import { DialogHeader, DialogTitle,Dialog, DialogContent, DialogFooter } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { END_POINT } from "@/utils/constant"
import axios from 'axios'
import { setUser } from '@/redux/authSlice'


export default function UpdateProfile({ open, setOpen }) {

    const [loading,setLoading]=useState(false);
    
    const {user}=useSelector(store=>store.auth); 

    const  [input,setInput]=useState({
        fullname:user?.fullname,
        email:user?.email,
        phoneNumber:user?.phoneNumber,
        bio:user?.profile?.bio,
        skills:user?.profile?.skills?.map(skill=>skill),
        file:user?.profile?.resume
          
    });

    const dispatch = useDispatch();


    const changeEventHandler=(e)=>{
        setInput({...input,[e.target.name]:e.target.value});
    }
    
    const submitHandler= async(e)=>{
        e.preventDefault();
        const formData= new FormData();
        formData.append("fullname",input.fullname)
        formData.append("email",input.email)
        formData.append("phoneNumber",input.phoneNumber)
        formData.append("bio",input.bio)
        formData.append("skills",input.skills);
        if(input.file){
            formData.append("file",input.file)  
        }
       
         try{
             setLoading(true);
            const  res = await axios.post(`${END_POINT}/profile/update`,formData,{
            headers:{
                 'Content-Type':'multipart/form-data'
            },
            withCredentials:true
           });
           if(res.data.success){
            dispatch(setUser(res.data.user))
            toast.success(res.data.message);
           }
          
         }catch(error){
         toast.error(error.res.data.message)
         console.log(error);
         }
         finally{
            setLoading(false)
         }
        setOpen(false);
        
    }

    const FileChangeHandler=(e)=>{
      const file =e.target.files?.[0];
      setInput({...input,file})
    }
    return (
        <div>
            <Dialog open={open}  onOpenChange={()=>setOpen(false)}>
                <DialogContent className="sm:max-w-[455px]" >
                    <DialogHeader><DialogTitle>Update Profile
                    </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitHandler}>
                        <div className='grid gap-4 py-4'>

                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="name" className="text-right">Name</Label>
                            <Input id="name" name="name" 
                            value={input.fullname} 
                             onChange={changeEventHandler}
                             type="text"
                            className="col-span-3" />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="email" className="text-right">Email</Label>
                            <Input id="email" name="email" type="email" 
                        onChange={changeEventHandler} 
                        value={input.email} className="col-span-3" />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="number" className="text-right">Number</Label>
                            <Input id="number" name="number" onChange={changeEventHandler} value={input.phoneNumber} className="col-span-3" />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="bio" className="text-right">Bio</Label>
                            <Input id="bio" name="bio" onChange={changeEventHandler} value={input.bio} className="col-span-3" />
                        </div>

                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="skills" className="text-right">Skills</Label>
                            <Input id="skills" name="skills" onChange={changeEventHandler} value={input.skills} className="col-span-3" />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="file" className="text-right">Resume</Label>
                            <Input id="file"  type="file" 
                             onChange={FileChangeHandler}
                             accept="application/pdf" name="file" className="col-span-3" />
                        </div>
                        </div>
                        <DialogFooter>
                            {
                                
         loading? <Button ><Loader2 className='mr-2 h-4 w-4 animate-spin'>Please wait</Loader2></Button> : <Button type="submit" className="w-50  my-4 mr-3">Update</Button>

          }
                            
                        </DialogFooter>
                    </form>
                </DialogContent>

            </Dialog>
        </div>
    )
}
