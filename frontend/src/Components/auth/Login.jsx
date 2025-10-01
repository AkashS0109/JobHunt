import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../sharedf/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { END_POINT } from "@/utils/constant";
import Image from "../../images/f1.png"; // ✅ fixed import
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { setLoading, setUser } from "@/redux/authSlice";

export default function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const { loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.email) {
      toast.error("Please Enter the Email");
      return;
    }
    if (!input.password) {
      toast.error("Please Enter the Password");
      return;
    }
    if (!input.role) {
      toast.error("Please select a role.");
      return;
    }

    try {
      
      const res = await axios.post(`${END_POINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        
      });
 dispatch(setLoading(true));
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        // console.log("Token stored in cookies frontend:", res.data.token);
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "An error occurred.");
    } finally {
      dispatch(setLoading(false));
    }
  };

return (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-violet-200 via-white to-violet-400">
    <Navbar />

    {/* Main container for image + form */}
    <div className="flex flex-1 items-center justify-center px-6 ">
      <div className="flex flex-col lg:flex-row  shadow-2xl rounded-3xl overflow-hidden border border-gray-200 max-w-6xl w-full">

        {/* Left Image */}
        <div className="hidden lg:flex lg:w-1/2 bg-gray-100 items-center justify-center">
          <img src={Image} alt="login banner" className="w-full h-full object-cover bg-violet-600" />
        </div>

        {/* Right Form */}
        <div className="w-full lg:w-1/2 p-8 flex flex-col bg-transparent items-center justify-center">
          <h1 className="font-extrabold text-3xl lg:text-4xl mb-4 text-center text-violet-800">
            Welcome Back 👋
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Login to your account and continue your journey
          </p>

          <form onSubmit={submitHandler} className="space-y-4">
            {/* Email */}
            <div>
              <Label className="text-gray-700">Email</Label>
              <Input
                type="email"
                placeholder="aka@gmail.com"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                className="mt-1 w-full bg-gray-50 text-black placeholder-gray-400 border border-gray-300 rounded-lg px-3 py-2 focus:border-violet-600 focus:ring-2 focus:ring-violet-500"
              />
            </div>

            {/* Password */}
            <div>
              <Label className="text-gray-700">Password</Label>
              <Input
                type="password"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                className="mt-1 w-full bg-gray-50 text-black border border-gray-300 rounded-lg px-3 py-2 focus:border-violet-600 focus:ring-2 focus:ring-violet-500"
              />
            </div>

            {/* Role */}
            <RadioGroup className="flex gap-8 lg:gap-10 my-6">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className={`cursor-pointer w-4 h-4 ${
                    input.role === "student" ? "accent-violet-600" : "accent-gray-400"
                  }`}
                />
                <Label className={input.role === "student" ? "text-violet-600 font-semibold" : "text-gray-700"}>
                  Student
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className={`cursor-pointer w-4 h-4 ${
                    input.role === "recruiter" ? "accent-violet-600" : "accent-gray-400"
                  }`}
                />
                <Label className={input.role === "recruiter" ? "text-violet-600 font-semibold" : "text-gray-700"}>
                  Recruiter
                </Label>
              </div>
            </RadioGroup>

            {/* Button */}
            <div>
              {loading ? (
                <Button
                  disabled
                  className="w-full bg-violet-700 hover:bg-violet-800 text-white py-3 rounded-lg font-semibold flex items-center justify-center"
                >
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  <span>Please wait</span>
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full bg-violet-700 hover:bg-violet-800 text-white py-3 rounded-lg font-semibold transition-all duration-200"
                >
                  Login
                </Button>
              )}
            </div>

            {/* Footer */}
            <p className="mt-6 text-center text-gray-600">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="text-violet-700 font-semibold hover:underline">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
);
}
