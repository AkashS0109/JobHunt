import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User } from "lucide-react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { END_POINT } from "@/utils/constant";
import MenuRounded from '@mui/icons-material/MenuRounded';

export default function Navbar() {
    const { user } = useSelector((store) => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State for slider menu

    const logoutHandle = async () => {
        try {
            const res = await axios.get(`${END_POINT}/logout`, { withCredentials: true });
            if (res && res.data) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.res.data.message);
        }
    };
   
    
    const checkUser=()=>{
        if(user){
            
           navigate("/jobs");
        }
        else{
            navigate("/login")
        }
    }


    return (
        <div className="bg-violet-600 shadow-violet-500/50 shadow-xl w-full z-50  ">
            <div className="flex items-center justify-between mx-auto  max-w-7xl 2xl:h-20 px-2 py-2  md:px-8 ">
                {/* Logo */}
                <div>
                    <h1 className="text-2xl md:text-3xl xl:text-4xl font-bold pl-2 ">
                        Job<span className="text-white">Connect...</span>
                    </h1>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-12 ">
                    <ul className="flex font-bold items-center text-sm md:text-lg gap-4 md:gap-6  text-white">
                        {user && user.role === "recruiter" ? (
                            <>
                                <li >
                                    <Link to="/admin/companies" >Companies</Link>
                                </li>
                                <li>
                                    <Link to="/admin/jobs">Jobs</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link onClick={checkUser}  to="/jobs">Jobs</Link>
                                </li>
                                <li>
                                    <Link to="/browse">Browse</Link>
                                </li>
                            </>
                        )}
                    </ul>
                    {!user ? (
                        <div className="flex items-center gap-8">
                            <Link to="/login">
                                <Button variant="outline"  className=" bg-white hover:border-green-500 text-violet-800   font-bold ">Log In</Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="bg-white hover:text-white hover:border-green-500  text-violet text-violet-800 py-1 font-bold">Sign Up</Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover >
                            <PopoverTrigger asChild>
                                <Avatar className='cursor-pointer'>
                                    <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className='w-50'>
                                <div className=''>
                                    <div className='flex gap-2  items-center  '>
                                        <Avatar className='cursor-pointer border-black'>
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium'>{user?.fullname}</h4>
                                            {/* <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p> */}
                                        </div>
                                    </div>
                                    <div className='flex flex-col  '>
                                        {
                                            user && user.role === 'student' && (
                                                <div className='flex  items-center  cursor-pointer' >
                                                    <User />
                                                    <Button className="text-gray-600 " variant="link"><Link to='/profile'>View Profile</Link></Button>
                                                </div>)

                                        }

                                        <div className='flex w-fit items-center gap-2  cursor-pointer' >
                                            <LogOut />
                                            <Button className="text-gray-600 hover:text-green-400" onClick={logoutHandle} variant="link" >Log Out</Button>
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>

                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <Button
                        onClick={() => setIsMenuOpen(true)}
                        className="  text-black  text-2xl hover:bg-violet-500 cursor-pointer bg-violet-500 "
                    >
                        <MenuRounded fontSize="medium" className="text-white"  />
                    </Button>
                </div>
            </div>

            {/* Sliding Menu */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex items-center justify-between p-4  ">

                    <Button
                        onClick={() => setIsMenuOpen(false)}
                        className=" bg-white text-black absolute right-5 text-xl hover:bg-white cursor-pointer mt-5 py-5"
                    >
                        ✕
                    </Button>
                </div>
                <ul className="flex flex-col gap-3 p-4  font-bold text-center ">
                    {user && user.role === "recruiter" ? (
                        <> <li  className=" items-center flex justify-center flex-col  gap-2 border-2 bg-violet-500 p-4 ">
                        <Avatar className='cursor-pointer '>
                                    <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />

                                </Avatar>
                                <h1 className="text-white">{user?.fullname}</h1>
                                </li>
                            <li>
                                <Link to="/admin/companies">Companies</Link>
                            </li>
                            <li>
                                <Link to="/admin/jobs">Jobs</Link>
                            </li>
                        </>
                    ) : (
                        < >
                            {user ? ( <li className=" items-center flex justify-center flex-col  gap-2 border-2 bg-violet-400 p-4 " >
                                <Avatar className='cursor-pointer '>
                                    <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                            
                                </Avatar>
                                <h1 className="text-white">{user?.fullname}</h1>
                            </li>):
                            ( <>
                             <li className="">
                                  <Link to="/">Home</Link>
                            </li>
                            <li className="">
                                  <Link to="/jobs">Jobs</Link>
                            </li><li className="">
                                <Link to="/browse">Browse</Link>
                            </li></>)}
                                                   
                        </>
                    )}
                    {!user ? (
                        <>
                            <li>
                                <Link to="/login">
                                    <Button variant="outline" className="w-full">
                                        LogIn
                                    </Button>
                                </Link>
                            </li>
                            <li>
                                <Link to="/signup">
                                    <Button className="bg-violet-500 hover:bg-white w-full ">
                                        SignUp
                                    </Button>
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            {user && user.role === "student" && (<>
                                <li className="">
                                  <Link to="/">Home</Link>
                            </li>
                                <li className="">
                                  <Link to="/jobs">Jobs</Link>
                            </li><li className="">
                                <Link to="/browse">Browse</Link>
                            </li>
                                <li>
                                    <Link to="/profile" className="font-bold"> Profile</Link>

                                </li>
                                </>
                            )}
                            <li>
                                <Button onClick={logoutHandle} variant="link" className="font-bold ">
                                    Log Out
                                </Button>
                            </li>
                        </>
                    )}
                </ul>
            </div>

            {/* Overlay for the menu */}
            {isMenuOpen && (
                <div
                    onClick={() => setIsMenuOpen(false)}
                    className="fixed inset-0  bg-white bg-opacity-50 z-40"
                />
            )}
        </div>
    );
}

 

