import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setAllJobs } from '../redux/jobSlice'// Adjust import based on your action path
import { JOB_API } from '@/utils/constant';
import {setUser} from '@/redux/authSlice';
const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchQuery } = useSelector(store => store.job); // Assuming you have a 'job' slice in your Redux store
    const { user,  } = useSelector(store => store.auth);

    

    useEffect(() => {
        if(!user) {
            // Show message when not authenticated
            console.log("Please log in to view all jobs.");
            return;
        }
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API}/get`, {
                //   params: { keyword: searchQuery },
                  withCredentials: true,
                });
                if (res.data.success) {
                  dispatch(setAllJobs(res.data.jobs));
                }
              } catch (error) {
                console.error('Error fetching jobs:', error);
              }
            };
        

        fetchAllJobs(); // Call the fetch function
    }, [searchQuery, dispatch,user]); // Dependencies array to ensure re-execution on `searchQuery` change
};

export default useGetAllJobs;
