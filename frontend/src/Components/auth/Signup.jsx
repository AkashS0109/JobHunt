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
        headers: { "Content-Type": "multipart/form-data" },
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
    <div className='min-h-screen flex flex-col bg-gradient-to-br from-violet-200 via-white to-violet-400'>
      <Navbar />
      <div className="flex items-center justify-center px-4 py-10 mt-10  lg:py-20">
        <form 
          onSubmit={submitHandler} 
          className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-5 lg:p-10 border border-gray-200"
        >
          <h1 className="font-extrabold text-3xl lg:text-4xl mb-3 lg:mb-6 text-center text-violet-800"> Create Account</h1>
          
          <div className=" mb-2 lg:mb-3">
            <Label className="text-gray-700 lg:mb-3">Name</Label>
            <Input type="text" placeholder="John" name="fullname" value={input.fullname} onChange={changeEventHandler} className="lg:mt-2 mt-1focus:border-violet-600 bg-gray-50 text-black " />
          </div>

          <div className="mb-2 lg:mb-3">
            <Label className="text-gray-700">Email</Label>
            <Input type="email" placeholder="John@gmail.com" value={input.email} name="email" onChange={changeEventHandler} className="lg:mt-2 mt-1 focus:border-violet-600 bg-gray-50 text-black" />
          </div>

          <div className="mb-2 lg:mb-3">
            <Label className="text-gray-700">Phone Number</Label>
            <Input type="text" placeholder="+91" value={input.phoneNumber} name="phoneNumber" onChange={changeEventHandler}  className="lg:mt-2 mt-1focus:border-violet-600 bg-gray-50 text-black" />
          </div>

          <div className="mb-2 lg:mb-3">
            <Label className="text-gray-700">Password</Label>
            <Input type="password" value={input.password} name="password" onChange={changeEventHandler}  className="lg:mt-2 mt-1focus:border-violet-600 bg-gray-50 text-black" />
          </div>

          <div className="flex flex-wrap justify-between items-center py-2 lg:mb-3">
            <RadioGroup className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Input type="radio" name="role" value="student"  onChange={changeEventHandler}  className={`cursor-pointer w-4 h-4 
      ${input.role === "student" ? "accent-violet-600" : "accent-gray-400"}`}
                checked={input.role === "student"} />
                <Label className={input.role === "student" ? "text-violet-600 font-semibold" : "text-gray-700"}>Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input type="radio" name="role" value="recruiter" onChange={changeEventHandler}
                 className={`cursor-pointer w-4 h-4 
      ${input.role === "recruiter" ? "accent-violet-600" : "accent-gray-400"}`}
                checked={input.role === "recruiter"}/>
                <Label className={input.role === "recruiter" ? "text-violet-600 font-semibold" : "text-gray-700"}>Recruiter</Label>
              </div>
            </RadioGroup>
            </div>
            <div className=' lg:mb-1'>
              <Label className="mr-2 text-gray-700">Profile</Label>
              <Input accept="image/*" name="file" type="file" className="lg:mt-2 mt-1cursor-pointer text-sm text-gray-700 bg-gray-100" onChange={changeFileHandler} />
            </div>
          

          <div className="flex flex-col items-center py-2 lg:py-6">
            {loading ? (
              <Button className="w-full"><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait</Button>
            ) : (
              <Button type="submit" className="w-full font-bold bg-violet-700 hover:bg-violet-800">Signup</Button>
            )}
            <span className="mt-3 text-sm text-gray-700">Already have an Account? <Link to="/login" className="text-violet-700 font-bold">Sign in</Link></span>
          </div>
        </form>
      </div>
    </div>
  );
}
