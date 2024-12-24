import React, { useEffect, useState } from 'react';
import Navbar from './sharedf/Navbar';
import FilterCard from './ui/FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';

export default function Jobs() {
    const { allJobs, searchQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return (
                    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchQuery.toLowerCase())
                );
            });
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchQuery]);

    return (
        <div>
            <Navbar />
            <div className="w-full flex justify-center mt-4">
                <div className="max-w-7xl flex w-full xl:w-10/12 lg:mt-10 md:w-5/6">
                    {/* Filter Section */}
                    <div className="md:w-1/4 w-1/3 lg:w-[160px]">
                        <FilterCard />
                    </div>

                    {/* Responsive Job Cards Section */}
                    <div className="lg:w-10/12 md:w-3/4 w-full overflow-y-auto" style={{ maxHeight: 'calc(100vh - 80px)' }}>
                        {filterJobs.length <= 0 ? (
                            <span>Job Not Found</span>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2">
                                {filterJobs.map((job) => (
                                    <div className="" key={job?._id}>
                                        <Job job={job} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
