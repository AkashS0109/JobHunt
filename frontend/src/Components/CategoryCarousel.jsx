import React from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchQuery } from '@/redux/jobSlice';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "Full Stack Developer",
    "Data Analytics"
];

export default function CategoryCarousel() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchQueryHandler = (query) => {
        dispatch(setSearchQuery(query));
        navigate("/browse");
    };

    return (
        <div className="w-10/12 max-w-6xl mx-auto lg:my-15  my-3 relative">
            <Carousel className="relative overflow-hidden ">
                {/* Carousel Content */}
                <CarouselContent className="flex justify-between gap-4 border-violet-500">
                    {category.map((cat, index) => (
                        <CarouselItem
                            key={index}
                            className="lg:basis-1/3 basis-1/2 flex-shrink-0 flex-grow-0 border-violet-500"
                        >
                            <Button
                                variant="outline"
                                onClick={() => searchQueryHandler(cat)}
                                className="w-full rounded-full text-center hover:text-white hover:bg-violet-500 border-violet-500"
                            >
                                {cat}
                            </Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Arrows */}
                <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 transform px-2 py-1 bg-white shadow-md">
                    &#8249; {/* Replace with custom arrow icon */}
                </CarouselPrevious>
                <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 transform px-2 py-1 bg-white shadow-md">
                    &#8250; {/* Replace with custom arrow icon */}
                </CarouselNext>
            </Carousel>
        </div>
    );
}
