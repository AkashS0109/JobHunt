import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './radio-group';
import { Label } from '@radix-ui/react-label';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '@/redux/jobSlice';

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Banglore", "Hyderbad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "Data Science", "Full Stack Developer", "Data Analytics"]
    },
];

export default function FilterCard() {
    const [selected, setSelectedValue] = useState("");
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    };

    useEffect(() => {
        dispatch(setSearchQuery(selected));
    }, [selected]);

    return (
        <div className='w-full bg-white p-2 rounded-md border-gray-900'>
            <h1 className='font-bold md:text-xl'>Filter Jobs</h1>
            <hr className='mt-2 lg:mt-1' />
            <RadioGroup value={selected} onValueChange={changeHandler}>
                {filterData.map((data, idx) => (
                    <div className='p-2' key={`filter-group-${idx}`}>
                        <h1 className='font-bold lg:text-lg text-sm md:text-xl'>{data.filterType}</h1>
                        {data.array.map((item, index) => {
                            const itemId = `id-${idx}-${index}`;
                            return (
                                <div className='flex items-center md:space-x-2 space-x-1 s md:my-2 my-1 text-sm' key={itemId}>
                                    <RadioGroupItem value={item} id={itemId} />
                                    <Label htmlFor={itemId} className=''>{item}</Label>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
}
