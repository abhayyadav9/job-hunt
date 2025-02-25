import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import useGetSingleJob from "@/hooks/useGetSingleJob";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "./utils/constant";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// Add a modal component for print preview
const PrintPreviewModal = ({ jobDetails, onClose, onPrint }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow-lg w-11/12 md:w-1/2">
                <h1 className="font-bold text-xl mb-4">Print Preview</h1>
                <div id="printable-area" className="mb-4">
                    <h2 className="text-lg font-bold">{jobDetails.title}</h2>
                    <p><strong>Location:</strong> {jobDetails.location}</p>
                    <p><strong>Description:</strong> {jobDetails.description}</p>
                    <p><strong>Salary:</strong> {jobDetails.salary} LPA</p>
                    <p><strong>Experience:</strong> {jobDetails.experience} years</p>
                    {/* Add any other details you want to show */}
                </div>
                <div className="flex justify-end">
                    <Button onClick={onPrint}>Download PDF</Button>
                    <Button onClick={onClose} className="ml-2">Close</Button>
                </div>
            </div>
        </div>
    );
};

const JobDescription = () => {
    const navigate = useNavigate()
    const { singleJob } = useSelector((store) => store.job);
    const { user } = useSelector((store) => store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);
    const [showPreview, setShowPreview] = useState(false); // State to control modal visibility

    const params = useParams();
    const jobId = params.id;

    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials:true});
            if(res.data.success){
                setIsApplied(true); // Update the local state
                const updatedSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]}
                dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
                    withCredentials: true,
                });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id)) // Ensure the state is in sync with fetched data
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    const handlePrintPDF = async () => {
        const pdf = new jsPDF();
        const printableArea = document.getElementById("printable-area");

        const canvas = await html2canvas(printableArea);
        const imgData = canvas.toDataURL("image/png");

        pdf.addImage(imgData, "PNG", 10, 10);
        pdf.save("job-posting.pdf");
        setShowPreview(false); // Close the modal after saving
    };

    return (
        <div>
            <div className="m-4">
                <Button variant="outline" className="border-separate "
                onClick={()=> navigate("/")}>Back</Button>
            </div>
            <div className="max-w-4xl border rounded-sm border-gray-400 shadow-md p-4 mx-auto my-10">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-bold text-xl">{singleJob?.title}</h1>
                    <div className="flex items-center gap-2 mt-4">
                        <Badge className={"text-blue-700 font-bold"} variant="ghost">
                            {singleJob?.position} Positions
                        </Badge>
                        <Badge className={"text-[#F83002] font-bold"} variant="ghost">
                            {singleJob?.jobType}
                        </Badge>
                        <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
                            {singleJob?.salary} LPA
                        </Badge>
                    </div>
                </div>
               
            </div>
            <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
                Job Description
            </h1>
            <div className="my-4">
                <h1 className="font-bold my-1">
                    Role:{" "}
                    <span className="pl-4 font-normal text-gray-800">
                        {singleJob?.title}
                    </span>
                </h1>
                <h1 className="font-bold my-1">
                    Location:{" "}
                    <span className="pl-4 font-normal text-gray-800">
                        {singleJob?.location}
                    </span>
                </h1>
                <h1 className="font-bold my-1">
                    Description:{" "}
                    <span className="pl-4 font-normal text-gray-800">
                        {singleJob?.description}
                    </span>
                </h1>
                <h1 className="font-bold my-1">
                    Experience:{" "}
                    <span className="pl-4 font-normal text-gray-800">
                        {singleJob?.experience} yrs
                    </span>
                </h1>
                <h1 className="font-bold my-1">
                    Salary:{" "}
                    <span className="pl-4 font-normal text-gray-800">
                        {singleJob?.salary} LPA
                    </span>
                </h1>
                <h1 className="font-bold my-1">
                    Total Applicants:{" "}
                    <span className="pl-4 font-normal text-gray-800">
                        {singleJob?.applications?.length}
                    </span>
                </h1>
                <h1 className="font-bold my-1">
                    Posted Date:{" "}
                    <span className="pl-4 font-normal text-gray-800">
                        {singleJob?.createdAt.split("T")[0]}
                    </span>
                </h1>
            </div>
            <div className="flex justify-end mt-10 gap-4">
                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
                <Button onClick={() => setShowPreview(true)}>
                    Print
                </Button>
                </div>

            {/* Print Preview Modal */}
            {showPreview && (
                <PrintPreviewModal
                    jobDetails={singleJob}
                    onClose={() => setShowPreview(false)}
                    onPrint={handlePrintPDF}
                />
            )}
        </div>
        </div>
    );
};

export default JobDescription;
