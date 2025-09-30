import React, { useEffect } from 'react'
import Navbar from '../sharedf/Navbar'
import Job from '../Job'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchQuery } from '@/redux/jobSlice'
import useGetAllJobs from '@/Hooks/useGetAllJobs'
import Footer from '../Footer'

export default function Browse() {
  useGetAllJobs();
  const { allJobs, searchQuery } = useSelector(store => store.job);
  const dispatch = useDispatch();

  // Filter logic
  const filteredJobs = searchQuery
    ? allJobs.filter((job) =>
        job?.title?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allJobs;

  // Reset search query on unmount (optional)
  // useEffect(() => {
  //   return () => {
  //     dispatch(setSearchQuery(""));
  //   };
  // }, [dispatch]);

  return (
    <div>
      <Navbar className="" />
     
      <div className="max-w-6xl mx-auto xl:my-10 py-10">
        <h1 className="font-bold text-xl m-5 my-10">
          Search Result ({filteredJobs.length})
        </h1>
        <div>
          <div className="flex flex-wrap items-center justify-center">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div className="flex sm:w-1/3 w-[350px] xl-1/2" key={job?._id}>
                  <Job job={job} />
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">No jobs found.</p>
            )}
          </div>
        </div>
      </div>
      
    </div>
  );
}
