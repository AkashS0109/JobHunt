import React, { useState ,useEffect} from 'react'
import Navbar from '../sharedf/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft } from 'lucide-react'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { useSelector } from 'react-redux'

import useGetCompanyById from '@/Hooks/useGetCompanyById'

function CompanySetup() {
    const params = useParams();
    useGetCompanyById(params.id);
    
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
    const {singleCompany} =useSelector(store=>store.company);
    const [load, setLoad] = useState(false);

    
    const navigate = useNavigate();
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const submitH = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file)
        }

        try {
            setLoad(true);
            const res = await axios.put(`${COMPANY_API}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
            });
            if (res.data.success)
                toast.success(res.data.message);
            navigate("/admin/companies");
        } 
        catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoad(false);
        }


    }

    useEffect(()=>{
        setInput({
            name:singleCompany.name || "",
            description:singleCompany.description || "",
            website: singleCompany.website || "",
            location:singleCompany.location || "",
            file: singleCompany.file || null
        });
    },[singleCompany]);

    return (
        <div >
            <Navbar />
            <div className='lg:max-w-xl lg:mx-auto my-10 m-4'>
                <form onSubmit={submitH}>
                    <div className='flex items-center lg:gap-5 gap-3 p-4 lg:p-8'>
                        <Button onClick={()=>navigate("/admin/companies")} variant="outline" className='flex items-center   text-gray-500 font-semibold'>
                            <ArrowLeft className='w-4 pt-1' />
                            <span>
                                Back
                            </span>
                        </Button>
                        <h1 className='font-bold md:text-2xl text-xl'>Company Setup</h1>
                    </div>
                    <div className='grid grid-cols-2 gap-4 '>
                        <div>
                            <Label className='font-bold'>Company Name</Label>
                            <Input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}

                            />
                        </div>
                        <div>
                            <Label className='font-bold'>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label className='font-bold'>Website</Label>
                            <Input
                                type="text"
                                name="website"
                                value={input.website}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                        <Label className='font-bold'>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                            />
                        </div> <div>
                            <Label className='font-bold'>Logo</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                name="logo"
                                onChange={changeFileHandler}
                            />
                        </div>

                    </div>
                    {
                        load ? <Button type="submit"><Loader2 className='mr-2 h-4 w-4 animate-spin'>Please wait</Loader2></Button> : <Button type="submit" className="w-50  my-4 mr-3 bg-blue-900">Update</Button>

                    }
                </form>

            </div>
        </div>
    )
}

export default CompanySetup
