import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useGetAllJobs()

  const searchJobHandler = () => {
      dispatch(setSearchQuery(query));
      navigate("/browse");
  }
  return (
    <div className="text-center mt-[-40px] h-screen  bg-gradient-to-b from-purple-100 to-purple-200 py-16 px-4 md:px-0">
      <div className="flex flex-col items-center mt-40 md:mt-2 gap-8 max-w-3xl mx-auto">

        {/* Badge */}
        <span className="px-5 py-2 rounded-full bg-red-100 text-red-500 font-medium text-sm md:text-base shadow-md">
          🌟 The #1 Job Portal for Professionals
        </span>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-snug text-gray-800">
          Discover, Apply & Land Your <span className="text-[#6A38C2]">Dream Job</span>
        </h1>

        {/* Description */}
        <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-2xl">
          Your dream career is just a search away! Explore thousands of jobs in tech, design, healthcare, and more. Start your journey with us and unlock the next chapter of your career path.
        </p>

        {/* Search Bar */}
        <div className="flex w-full max-w-lg shadow-lg border border-gray-300 rounded-full overflow-hidden items-center bg-white">
          <input
            type="text"
            onChange={(e)=>setQuery(e.target.value)}
            placeholder="Search for jobs by title or keyword"
            className="flex-grow p-3 text-gray-600 text-sm md:text-base outline-none border-none"
          />
          <Button 
          onClick={searchJobHandler}
          className="bg-[#6A38C2] text-white p-3 h-12 w-14 rounded-r-full hover:bg-[#542C8B] transition-all duration-200 ease-in-out">
            <Search className="h-5 w-5 " />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
