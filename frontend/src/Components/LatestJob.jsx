import React, { useEffect } from 'react'
import LatestJobcard from './LatestJobcard';
import { useSelector } from 'react-redux';
import axios from 'axios';
import useGetAllJobs from '../Hooks/useGetAllJobs';

export default function LatestJob() {
    const {allJobs} =useSelector(store=>store.job)
    useGetAllJobs();
    return (
        <div className='max-w-9xl  mx-auto my-10  mt-10 flex items-center flex-col justify-center'>
            <h1 className='xl:text-4xl text-2xl font-bold md:text-3xl my-5 relative hover:drop-shadow-3xl animate-pop'><span className='text-violet-800'>Latest Job </span>Openings</h1>
            {console.log("Jobs",allJobs)}
            <div className='flex   flex-wrap lg:flex-row items-center justify-center w-full  sm:w-3/4  gap-2 md:gap-2 my-3'>
                {
                    
                  allJobs.length <= 0 ? <span>No Jobs Avilable</span> : allJobs.slice(0,6).map((job) => <LatestJobcard  key={job._id} job={job}/>)
                }
            </div> 
        </div>
    );
}
