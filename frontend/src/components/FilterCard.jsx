import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '@/redux/jobSlice';

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Birgunj", "Kalaiya", "Mumbai"],
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "Full Stack Developer","Software devloper"],
    },
    {
        filterType: "Salary",
        array: ["0-40k", "42-1 lakh", "1 lakh to 5 lakh"],
    },
];

export const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    };

    useEffect(() => {
        dispatch(setSearchQuery(selectedValue));
    }, [selectedValue, dispatch]);

    return (
        <div className='w-full max-w-sm bg-white p-5 rounded-md shadow-lg'>
            <h1 className='font-bold text-lg mb-3'>Filter Jobs</h1>
            <hr className='mb-3 border-gray-300' />
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {filterData?.map((data, index) => (
                    <div key={data.filterType} className='mb-4'>
                        <h1 className='font-semibold text-md mb-2'>{data?.filterType}</h1>
                        {data?.array.map((item, idx) => {
                            const itemId = `id${index}-${idx}`;
                            return (
                                <div className='flex items-center space-x-2 my-2' key={itemId}>
                                    <RadioGroupItem value={item} id={itemId} className='focus:ring-2 focus:ring-purple-500' />
                                    <Label htmlFor={itemId} className='text-sm text-gray-700'>{item}</Label>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
};
