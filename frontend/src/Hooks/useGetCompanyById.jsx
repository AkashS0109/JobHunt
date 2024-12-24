import { useEffect } from 'react';
import { COMPANY_API } from "../utils/constant";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSingleCompany = async () => {
            
            try {
                
                const res = await axios.get(`${COMPANY_API}/get/${companyId}`,{ withCredentials: true });
              
                if (res.data.success) {
                    dispatch(setSingleCompany(res.data.company));
                } else {
                    console.error("API response indicates failure:", res.data.message);
                }
            } catch (error) {
                console.error("Error fetching single company:", error);
            }
        };
         fetchSingleCompany();
    }, [companyId, dispatch]);
};

export default useGetCompanyById;
