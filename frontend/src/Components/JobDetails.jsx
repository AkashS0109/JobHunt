import React, { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams, useNavigate } from "react-router-dom";
import { setAllAppliedJobs, setSingleJob } from "@/redux/jobSlice";
import { JOB_APPLY } from "../utils/constant";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import {
  Briefcase,
  MapPin,
  Calendar,
  Users,
  Banknote,
  Clock,
} from "lucide-react";
import { useGetSingleJob } from "@/Hooks/useGetSingleJob";
import Navbar from "./sharedf/Navbar";
import Footer from "./Footer";

export default function JobDetails() {
  const { id } = useParams(); // get jobId from URL
  useGetSingleJob(id);
  const { singleJob, allAppliedJobs } = useSelector((store) => store.job);

  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isApplied, setIsApplied] = useState(false);

  const applyJob = async () => {
    if (!user) {
      toast.error("You need to log in to apply for this job.");
      navigate("/login");
      return;
    }

    try {
      const res = await axios.get(`${JOB_APPLY}/apply/${id}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setIsApplied(true);

        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));

        const updatedAllAppliedJobs = allAppliedJobs.some(
          (job) => job._id === id
        )
          ? allAppliedJobs
          : [...allAppliedJobs, updatedSingleJob];
        dispatch(setAllAppliedJobs(updatedAllAppliedJobs));

        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Failed to apply for the job."
      );
    }
  };

  return (
    <div>
      <Navbar className="fixed top-0 left-0 w-full z-50" />
    

      {/* Responsive container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 my-8 md:my-12">
        {/* Job Card */}
        <div className="rounded-2xl shadow-lg p-6 sm:p-8 bg-gray-300 border border-gray-200 pt-20">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="font-extrabold text-lg sm:text-2xl lg:text-3xl text-gray-900">
                {singleJob?.title}
              </h1>
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <Badge className="text-blue-700 font-medium bg-blue-100 text-xs sm:text-sm">
                  {singleJob?.position} Openings
                </Badge>
                <Badge className="text-red-700 font-medium bg-red-100 text-xs sm:text-sm">
                  {singleJob?.jobType}
                </Badge>
                <Badge className="text-green-700 font-medium bg-green-100 text-xs sm:text-sm">
                  {singleJob?.salary} LPA
                </Badge>
              </div>
            </div>
            <Button
              onClick={isApplied ? null : applyJob}
              disabled={isApplied}
              className={`w-full sm:w-auto rounded-lg text-white px-5 py-2 text-base sm:text-lg font-semibold shadow-md transition ${
                isApplied
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {isApplied ? "Already Applied" : "Apply Now"}
            </Button>
          </div>

          {/* Details */}
          <div className="mt-8 space-y-4 text-gray-800 text-sm sm:text-base">
            <div className="flex items-center gap-2 sm:gap-3">
              <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
              <span className="font-semibold">Role:</span>
              <span>{singleJob?.title}</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
              <span className="font-semibold">Location:</span>
              <span>{singleJob?.location}</span>
            </div>
            <div className="flex items-start gap-2 sm:gap-3">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 mt-0.5" />
              <span className="font-semibold">Description:</span>
              <span className="block">{singleJob?.description}</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
              <span className="font-semibold">Experience:</span>
              <span>{singleJob?.experienceLevel} years</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <Banknote className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
              <span className="font-semibold">Salary:</span>
              <span>{singleJob?.salary} LPA</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
              <span className="font-semibold">Total Applications:</span>
              <span>{singleJob?.applications?.length}</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
              <span className="font-semibold">Posted Date:</span>
              <span>{singleJob?.createdAt?.split("T")[0]}</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
