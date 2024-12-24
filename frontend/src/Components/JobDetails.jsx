import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams, useNavigate } from 'react-router-dom';
import { setAllAppliedJobs, setSingleJob } from '@/redux/jobSlice';
import { JOB_API, JOB_APPLY } from "../utils/constant";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

export default function JobDetails() {
    const { singleJob, allAppliedJobs } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
   
    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isApplied, setIsApplied] = useState(false);

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(
                        res.data.job.applications.some(application => application.applicant === user?._id)
                    );
                }
            } catch (error) {
                console.log(error);
                toast.error("Failed to fetch job details.");
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    const applyJob = async () => {
        if (!user) {
            toast.error("You need to log in to apply for this job.");
            navigate("/login");
            return;
        }

        try {
            const res = await axios.get(`${JOB_APPLY}/apply/${jobId}`, { withCredentials: true });

            if (res.data.success) {
                setIsApplied(true);

                const updatedSingleJob = { 
                    ...singleJob, 
                    applications: [...singleJob.applications, { applicant: user?._id }] 
                };
                dispatch(setSingleJob(updatedSingleJob));

                // Update allAppliedJobs
                const updatedAllAppliedJobs = allAppliedJobs.some(job => job._id === jobId)
                    ? allAppliedJobs
                    : [...allAppliedJobs, updatedSingleJob];
                dispatch(setAllAppliedJobs(updatedAllAppliedJobs));

                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to apply for the job.");
        }
    };

    return (
        <div className='max-w-7xl mx-auto my-10 p-8'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-2xl pt-10'>{singleJob?.title}</h1>
                    <div className='flex items-center xl:gap-2 mt-4'>
                        <Badge className='text-blue-700 font-bold' variant="ghost">
                            {singleJob?.position} Openings
                        </Badge>
                        <Badge className='text-red-600 font-bold' variant="ghost">
                            {singleJob?.jobType}
                        </Badge>
                        <Badge className='text-green-800 font-bold' variant="ghost">
                            {singleJob?.salary} LPA
                        </Badge>
                    </div>
                </div>
                <Button
                    onClick={isApplied ? null : applyJob}
                    disabled={isApplied}
                    className={`rounded-lg ${isApplied 
                        ? 'bg-gray-600 cursor-not-allowed' 
                        : 'bg-[#00008B] hover:bg-[#4949d8]'} px-2 lg:p-2`}
                >
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>
            <h1 className='border-b-2 border-gray-300 font-medium py-4'>Job Description</h1>
            <div>
                <h1 className='font-bold my-1'>
                    Role:
                    <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span>
                </h1>
                <h1 className='font-bold my-1'>
                    Location:
                    <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span>
                </h1>
                <h1 className='font-bold my-1'>
                    Description:
                    <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span>
                </h1>
                <h1 className='font-bold my-1'>
                    Experience:
                    <span className='pl-4 font-normal text-gray-800'>{singleJob?.experienceLevel} years</span>
                </h1>
                <h1 className='font-bold my-1'>
                    Salary:
                    <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary} LPA</span>
                </h1>
                <h1 className='font-bold my-1'>
                    Total Applications:
                    <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span>
                </h1>
                <h1 className='font-bold my-1'>
                    Posted Date:
                    <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt?.split("T")[0]}</span>
                </h1>
            </div>
        </div>
    );
}
