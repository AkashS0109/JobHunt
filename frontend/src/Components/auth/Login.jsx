import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../sharedf/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { END_POINT } from "@/utils/constant";
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

    if (!input.role) {
      toast.error("Please select a role.");
      return;
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",  
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));  // Set user in Redux store
        document.cookie = "token=" + res.data.token;  
        console.log("Token stored in cookies:", document.cookie); // Log token in console
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
    <div>
      <Navbar />
      <div className="flex items-center max-w-5xl mx-auto justify-center pt-30">
        <form
          onSubmit={submitHandler}
          className="lg:w-1/2 w-5/6 md:w-2/3 border-violet-600 border-2 rounded-md p-4 my-10"
        >
          <h1 className="font-bold lg:text-5xl text-4xl mb-5 w-full">LogIn</h1>

          <div className="lg:my-4 my-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="aka@gmail.com"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              className="outline-none bg-transparent text-black placeholder-gray-400 border border-gray-300 rounded-md focus:border-violet-800 focus:ring-2 focus:ring-violet-700"
            />
          </div>

          <div className="lg:my-3 my-2">
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              className="outline-none bg-transparent text-black border border-gray-300 rounded-md focus:border-violet-800 focus:ring-2 focus:ring-violet-700"
            />
          </div>

          <div className="flex item-center justify-between">
            <RadioGroup className="flex items-center gap-5 md:my-5 my-2">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  className="cursor-pointer w-4 h-4"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                />
                <Label>Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  className="cursor-pointer w-4 h-4"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                />
                <Label>Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex items-center flex-wrap">
            {loading ? (
              <Button>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>Please wait</span>
              </Button>
            ) : (
              <Button type="submit" className="w-full my-2 lg:my-4 mr-3 bg-violet-800">
                Login
              </Button>
            )}
            <span>
              Don't have an account?
              <Link to="/signup" className="text-violet-600 font-semibold">
                {" "}
                SignUp
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
