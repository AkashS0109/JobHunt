import Navbar from '@/Components/sharedf/Navbar'
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import { JOB_API } from '@/utils/constant';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import store from '@/redux/store';
import { Select, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { SelectContent } from '@radix-ui/react-select';
import { setLoading } from '@/redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

function PostJob() {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        CompanyId: ""

    });

    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();

    const { companies } = useSelector(store => store.company)
    const changeEventH = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const selectChangeHandler = (companyId) => {
        setInput({ ...input, CompanyId: companyId });
    };

    const submitHandler = async(e) => {
        e.preventDefault();
       
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API}/post`,input,{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if(res.data.success){
                toast.success(res.data.message);
                navigate("/admin/jobs")
            }

        } catch (error) {
            toast.error(error.response.data.message);
        }
        finally{
            setLoading(false)
        }

    }
    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center w-full  my-3 lg:my-6'>
                <form onSubmit={submitHandler} className='lg:p-20 p-10 max-w-5xl border-gray-200 shadow-lg rounded-md'>


                    <div className='grid grid-cols-2 gap-2'>
                        <div>
                            <Label>Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventH}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventH}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventH}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Salary</Label>
                            <Input
                                type="text"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventH}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventH}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Job Type</Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventH}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Experience</Label>
                            <Input
                                type="number"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventH}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>No of Positions</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventH}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        {
                            companies.length > 0 && (
                                <div className='relative'>
                                <Select onValueChange={selectChangeHandler}>
                                    <SelectTrigger className="w-[180px] z-50 relative">
                                        <SelectValue placeholder="Select a Company"  />
                                    </SelectTrigger>
                                    <SelectContent className=' absolute z-[999] bg-white w-[180px]'>
                                        <SelectGroup>

                                            {
                                                companies.map((company) => (
                                                    <SelectItem  key={company._id} value={company._id}>{company?.name}</SelectItem>
                                                ))
                                            }

                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                </div>
                            )
                        }
                    </div>


                    {
                        loading ? <Button  type="submit"><Loader2 className='mr-2 h-4 w-4 animate-spin'>Please wait</Loader2></Button> : <Button type="submit" className="w-full  my-4 ">Post Job</Button>

                    }
                    {
                        companies.length === 0 && <p className='text-xs font-bold text-red-600 text-center my-3'>Please Register Company First before Posting Job</p>
                    }
                </form>
            </div>

        </div>
    )
}

export default PostJob
