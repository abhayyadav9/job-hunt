import React, { useEffect } from 'react';
import axios from 'axios'; // Import axios
import Navbar from '../shared/Navbar';
import ApplicantsTable from './ApplicantsTable';
import { APPLICATION_API_END_POINT } from '../utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const {applicants} = useSelector((store)=>store.application)

    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params?.id}/applicants`, {
                    withCredentials: true,
                });
                console.log(res.data.job)
              
                    dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                console.error("Error fetching applicants:", error);
            }
        };

        fetchApplicants(); // Call the function
    }, [params.id, dispatch]); // Add dependencies

    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto">
                <h1 className="font-bold text-xl">Applicants {applicants?.applications?.length}</h1>
                <ApplicantsTable />
            </div>
        </div>
    );
};

export default Applicants;
