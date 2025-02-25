import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import HeroSection from "./homePage/HeroSection";
import CategoryCarousel from "./homePage/CategoryCarousel";
import LatestJobs from "./homePage/LatestJobs";
import Footer from "./shared/Footer";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  // Fetch all jobs using a custom hook
  useGetAllJobs();


  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate to the companies page if the user is a recruiter
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, [user, navigate]); // Added user and navigate as dependencies

  return (
    <div className=" flex flex-col w-full">
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <Footer />
    </div>
  );
};

export default Home;
