import React, { useState } from 'react';
import Navbar from '../sharedf/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { END_POINT } from "@/utils/constant";
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { Loader2 } from 'lucide-react';
import { setLoading } from '@/redux/authSlice';


export default function Signup() {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: ""
  });

  const { loading } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('fullname', input.fullname);
    formData.append('email', input.email);
    formData.append('phoneNumber', input.phoneNumber);
    formData.append('password', input.password);
    formData.append('role', input.role);
    if (input.file) {
      formData.append('file', input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };


  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-6xl mx-auto'>
        <form onSubmit={submitHandler} className='md:w-1/2 w-5/6 border border-[#271db3] rounded-md p-4 my-10'>
          <h1 className='font-bold lg:text-5xl text-3xl md:text-4xl lg:mb-5'>Sign Up</h1>
          <div className='lg:mt-4 lg:my-4 my-2'>
            <Label>Name</Label>
            <Input type="text" placeholder="John" name="fullname" value={input.fullname} onChange={changeEventHandler} className="focus:border-[#271db3]" />
          </div>
          <div className='lg:my-4 my-2'>
            <Label>Email</Label>
            <Input type="email" placeholder="John@gmail.com" value={input.email}
              name="email" onChange={changeEventHandler} className="focus:border-[#271db3]"
            />
          </div>
          <div className='lg:my-4 my-2'>
            <Label>Phone Number</Label>
            <Input type="text" placeholder="+91" value={input.phoneNumber} className="focus:border-[#271db3]"
              name="phoneNumber" onChange={changeEventHandler}
            />
          </div>
          <div className='lg:my-3'>
            <Label>Password</Label>
            <Input type="password" value={input.password} className="focus:border-[#271db3]"
              name="password" onChange={changeEventHandler}
            />
          </div>
          <div className='flex item-center justify-between flex-wrap'>
            <RadioGroup className='flex items-center gap-5 lg:my-5 my-3'>
              <div className="flex items-center space-x-2">
                <Input type="radio"
                  name="role"
                  value="student"
                  className="cursor-pointer w-4 h-4 focus:border-[#271db3]"
                  checked={input.role === 'student'}
                  onChange={changeEventHandler}
                />
                <Label>Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input type="radio"
                  name="role"
                  value="recruiter"
                  className="cursor-pointer w-4 h-4"
                  checked={input.role === 'recruiter'}
                  onChange={changeEventHandler}
                />
                <Label>Recruiter</Label>
              </div>
            </RadioGroup>
            <div className='flex items-center gap-1'>
              <Label>Profile</Label>
              <Input accept="image/*" name="file" type="file" className="cursor-pointer"
                onChange={changeFileHandler}
              />
            </div>
          </div>
          <div className='flex flex-wrap items-center'>
            {
              loading ? (
                <Button><Loader2 className='mr-2 lg:h-4 h-2 w-4 animate-spin' /> Please wait</Button>
              ) : (
                <Button type="submit" className="w-50 font-bold bg-[#271db3] my-4 mr-3">Signup</Button>
              )
            }
            <span>Already have an Account? <Link to="/login" className='text-blue-600 font-bold'>Login</Link></span>
          </div>
          
        </form>
      </div>
    </div>
  );
}

