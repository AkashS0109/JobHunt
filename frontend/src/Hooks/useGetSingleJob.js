import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { JOB_API } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";

export const useGetSingleJob = (jobId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!jobId) return;

    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (error) {  
        console.error(error);
        toast.error("Failed to fetch job details.");
      }
    };

    fetchSingleJob();
  }, [jobId, dispatch]);
};
