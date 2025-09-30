import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { END_POINT } from "@/utils/constant";
import MenuRounded from "@mui/icons-material/MenuRounded";

export default function Navbar() {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logoutHandle = async () => {
    try {
      const res = await axios.get(`${END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res && res.data) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.res?.data?.message || "Something went wrong!");
    }
  };

  const checkUser = () => {
    if (user) {
      navigate("/jobs");
    } else {
      navigate("/login");
    }
  };

  return (
   <div className="fixed top-0 left-0 w-full bg-gradient-to-r from-violet-500 via-purple-600 to-indigo-600 shadow-lg z-50">

      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 md:h-20 px-4 md:px-8">
        {/* Logo */}
        <div>
          <h1 className="text-2xl md:text-3xl xl:text-4xl font-extrabold text-white tracking-wide">
            Job<span className="text-yellow-300">Connect</span>
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          <ul className="flex font-semibold items-center text-base md:text-lg gap-10 text-white">
            {user && user.role === "recruiter" ? (
              <>
                <li className="hover:text-yellow-300 transition">
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li className="hover:text-yellow-300 transition">
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li className="hover:text-yellow-300 transition text-white">
                  <Link to="/">Home</Link>
                </li>
                <li className="hover:text-yellow-300 transition">
                  <Link onClick={checkUser} to="/jobs">
                    Jobs
                  </Link>
                </li>
                <li className="hover:text-yellow-300 transition">
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex items-center gap-8">
              <Link to="/login">
                <Button className="bg-white text-violet-700 font-semibold px-5 rounded-full shadow-md hover:bg-violet-50">
                  Log In
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-yellow-400 text-black font-semibold px-5 rounded-full shadow-md hover:bg-yellow-500">
                  Create Account
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer ring-2 ring-white">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-56 shadow-xl rounded-lg">
                <div className="flex flex-col gap-4">
                  <div className="flex gap-3 items-center border-b pb-3">
                    <Avatar>
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt="@shadcn"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        {user?.fullname}
                      </h4>
                    </div>
                  </div>
                  {user && user.role === "student" && (
                    <div className="flex items-center gap-2 cursor-pointer">
                      <User />
                      <Button variant="link">
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                  )}
                  <div className="flex items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button
                      className="text-red-600"
                      onClick={logoutHandle}
                      variant="link"
                    >
                      Log Out
                    </Button>
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
            className="bg-violet-500 hover:bg-violet-600 p-2 rounded-md"
          >
            <MenuRounded fontSize="medium" className="text-white" />
          </Button>
        </div>
      </div>

      {/* Sliding Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-violet-600 to-indigo-700 text-white shadow-2xl z-50 transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between text-center p-4">
          <h2 className="text-lg font-bold "></h2>
          <Button
            onClick={() => setIsMenuOpen(false)}
            className="bg-transparent text-white text-xl hover:bg-violet-700"
          >
            ✕
          </Button>
        </div>
        <ul className="flex flex-col items-center gap-4 p-6 font-semibold text-lg">
          {user && user.role === "recruiter" ? (
            <>
              <li className="flex flex-col items-center gap-2 p-4 bg-white/10 rounded-lg shadow-md w-full">
                <Avatar>
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                  />
                </Avatar>
                <h1 className="font-bold">{user?.fullname}</h1>
              </li>
              <li className="hover:text-yellow-300">
                <Link to="/admin/companies">Companies</Link>
              </li>
              <li className="hover:text-yellow-300">
                <Link to="/admin/jobs">Jobs</Link>
              </li>
            </>
          ) : (
            <>
              {user ? (
                <li className="flex flex-col items-center gap-2 p-4 bg-white/10 rounded-lg shadow-md w-full">
                  <Avatar>
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="@shadcn"
                    />
                  </Avatar>
                  <h1 className="font-bold">{user?.fullname}</h1>
                </li>
              ) : (
                <>
                  <li className="hover:text-yellow-300">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="hover:text-yellow-300">
                    <Link to="/jobs">Jobs</Link>
                  </li>
                  <li className="hover:text-yellow-300">
                    <Link to="/browse">Browse</Link>
                  </li>
                </>
              )}
            </>
          )}

          {!user ? (
            <>
              <li>
                <Link to="/login">
                  <Button className="w-full bg-white text-violet-700 rounded-full font-semibold">
                    Log In
                  </Button>
                </Link>
              </li>
              <li>
                <Link to="/signup">
                  <Button className="w-full bg-yellow-400 text-black rounded-full font-semibold">
                    Create Account
                  </Button>
                </Link>
              </li>
            </>
          ) : (
            <>
              {user && user.role === "student" && (
                <>
                  <li className="hover:text-yellow-300">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="hover:text-yellow-300">
                    <Link to="/jobs">Jobs</Link>
                  </li>
                  <li className="hover:text-yellow-300">
                    <Link to="/browse">Browse</Link>
                  </li>
                  <li>
                    <Link to="/profile" className="font-bold">
                      Profile
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Button
                  onClick={logoutHandle}
                  variant="link"
                  className="font-bold text-red-500"
                >
                  Log Out
                </Button>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
        />
      )}
    </div>
  );
}
