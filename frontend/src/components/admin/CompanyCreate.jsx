import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import { COMPANY_API_END_POINT } from '../utils/constant'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [companyName, setCompanyName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Remove the TypeScript type annotation
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!companyName.trim()) {
            toast.error('Company name is required');
            return;
        }
        setIsLoading(true);
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, 
                { companyName }, 
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            if (res.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                navigate(`/admin/companies/${res.data.company._id}`);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || 'An error occurred');
            } else {
                toast.error('An unexpected error occurred');
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto px-4'>
                <div className='my-10 space-y-2'>
                    <h1 className='font-bold text-2xl'>Your Company Name</h1>
                    <p className='text-muted-foreground'>
                        What would you like to name your company? You can change this later.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className='space-y-6'>
                    <div className='space-y-2'>
                        <Label htmlFor='companyName'>Company Name</Label>
                        <Input
                            id='companyName'
                            type='text'
                            placeholder='JobHunt, Microsoft etc.'
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>

                    <div className='flex justify-end gap-2'>
                        <Button 
                            type='button'
                            variant='outline' 
                            onClick={() => navigate('/admin/companies')}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button type='submit' disabled={!companyName || isLoading}>
                            {isLoading ? 'Creating...' : 'Continue'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CompanyCreate