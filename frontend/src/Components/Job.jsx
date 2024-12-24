import React from 'react'
import { Button } from './ui/button'
import { Avatar, AvatarImage } from '../Components/ui/avatar'
import { Bookmark } from 'lucide-react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

export default function Job({ job }) {
    const navigate = useNavigate();

    const dayAgoFn = (mongotime) => {
        const createdAt = new Date(mongotime);
        const currentT = new Date();
        const timeD = currentT - createdAt;
        return Math.floor(timeD / (1000 * 24 * 60 * 60));
    }
  
    return (
        <div className='rounded-md border-4  hover:border-violet-500 p-2 m-2 bg-violet-50 transition-transform duration-300 hover:scale-105 shadow-xl hover:shadow-violet-100'>
        <div className='lg:p-4  rounded-md   '>
            <div className='flex items-center justify-between '>
                <p className='text-sm text-gray-500'>{dayAgoFn(job?.createdAt) === 0 ? "Today" : `${dayAgoFn(job?.createdAt)} days ago`}</p>
                <Button variant="outline" className="rounded-full h-8 lg:h-10" size="icon" >
                    <Bookmark  className='h-4 lg:h-8' />
                </Button>
            </div>
            <div className='flex items-center gap-3 my-1 lg:my-2'>
                <Button className='p-5' variant="outline" size="icon">
                    <Avatar className="w-10 h-10">
                        <AvatarImage 
                            src={job?.company?.logo} 
                            alt={`${job?.company?.name} logo`}
                            className="object-contain w-full h-full"
                        />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>India</p>
                </div>
            </div>
            <div>
                <h1 className='font-bold text-lg my-1 lg:md-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600 w-11/12'>{job?.description}</p>
            </div>
            <div className='flex items-center flex-wrap  lg:gap-1 mt-2 lg:mt-3 '>
                <Badge className={'text-blue-700 font-bold text-xs m-1 border-black hover:border-blue-500 '} variant="ghost">{job?.position} Openings</Badge>
                <Badge className={'text-red-600 font-bold text-xs m-1 border-black hover:border-red-500 '} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-green-800 font-bold text-xs m-1 border-black hover:border-green-500'} variant="ghost">{job?.salary}Lpa</Badge>
            </div>
            <div className='flex items-center  gap-2 lg:gap-4 mt-2 lg:mt-4'>
                <Button variant="outline"  className={'text-sm p-3'} onClick={() => navigate(`/description/${job?._id}`)}>Details</Button>
                <Button variant="outline" className="bg-blue-700 border-blue-700 text-sm p-3 text-white">Save For Later</Button>
            </div>
        </div>
        </div>
    )
}  