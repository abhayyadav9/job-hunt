// import React, { useState } from "react";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "../ui/carousel";
// import { Button } from "../ui/button";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { setSearchQuery } from "@/redux/jobSlice";

// const category = [
//   "Frontend Developer",
//   "Backend Developer",
//   "Full Stack Developer",
//   "Data Scientist",
//   "Graphic Designer",
// ];

// const CategoryCarousel = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate()

//   const handleSearch =(query)=>{
//     dispatch(setSearchQuery(query))
//   }
//   return (
//     <div className="bg-gradient-to-r from-purple-20 to-purple-30 py-12">
//       <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//       <h2 className="text-center p-4 text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 mb-6 ">
//   Explore Job Categories
// </h2>

//         <div className="relative flex justify-center">
//           <Carousel className=" overflow-hidden mx-10">
//           <CarouselPrevious className="p-3 bg-purple-30 rounded-full shadow-md hover:bg-purple-400 transition absolute left-0 z-10" />
//             <CarouselContent className="flex space-x-6">
//               {category.map((cat, index) => (
//                 <CarouselItem
//                   key={index}
//                   className="flex-shrink-0 justify-center flex w-40 sm:w-48 md:w-56 lg:w-64"
//                 >
//                   <Button
//                     variant="outline"
//                     className=" text-sm sm:text-base rounded-full p-5 transition-transform transform hover:scale-105 shadow-lg hover:rounded-full bg-white hover:bg-purple-200 focus:bg-purple-300 text-gray-800 border border-gray-300"
//                   >
//                     {cat}
//                   </Button>
//                 </CarouselItem>
//               ))}
//             </CarouselContent>
//           <CarouselNext className="p-3 bg-purple-20 rounded-full shadow-md hover:bg-purple-400 transition absolute right-0 z-10" />
//           </Carousel>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CategoryCarousel;

import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import { Button } from '../ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchQuery } from '@/redux/jobSlice';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = (query) => {
        dispatch(setSearchQuery(query));
        navigate("/browse");
    }

    return (
        <div>
           <h2 className="text-center p-4 text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 mb-6 ">
 Explore Job Categories
</h2>
            <Carousel className="w-full max-w-xl mx-auto my-20">
                <CarouselContent>
                    {
                        category.map((cat, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg-basis-1/3">
                                <Button onClick={()=>searchJobHandler(cat)} variant="outline" className="rounded-full">{cat}</Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel
