import { useNavigate } from "react-router-dom";
import { Badge } from "./ui/badge";
import React from "react";
import { Avatar, AvatarImage } from "../Components/ui/avatar";
import { toast } from "sonner";
import { useSelector } from "react-redux";

export default function LatestJobcard({ job }) {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  return (
    <div
      className="md:p-6 p-5 md:m-5  m-3 w-10/12 md:w-2/3 lg:w-5/12 xl:w-4/12 2xl:w-3/12 rounded-md shadow-xl bg-violet-100 hover:border-violet-200 transition-transform duration-300 hover:scale-105 border-4 sm:w-full"
      onClick={() => {
        if (user) {
          navigate(`/description/${job._id}`);
  
      
        } else {
          toast.error("Please login first!");
          navigate("/login");
        }
      }}
    >
      <div className="flex items-center gap-1 m-1  p-0 w-full">
        <Avatar className="w-10 h-10  p-0">
          <AvatarImage
            src={job?.company?.logo}
            alt={`${job?.company?.name} logo`}
            className="object-contain w-full h-full"
          />
        </Avatar>
        <h1 className="font-medium text-lg">{job?.company?.name}</h1>
      </div>
      <div>
        <p className="text-sm text-gray-500 pl-2">India </p>
        <h1 className="font-bold text-sm lg:text-lg lg:my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4 text-xs">
        <Badge className={"text-blue-700 font-bold"} variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className={"text-red-600 font-bold"} variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className={"text-green-800 font-bold"} variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
}
