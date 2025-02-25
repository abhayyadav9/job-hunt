import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        return Math.floor((Date.now() - createdAt) / (1000 * 86400));
    };

    return (
        <div className='group p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 hover:border-gray-200'>
            {/* Header Section */}
            <div className='flex items-center justify-between mb-4'>
                <span className='text-xs font-medium text-muted-foreground'>
                    {daysAgoFunction(job?.createdAt) === 0 ? 
                    "New today" : 
                    `${daysAgoFunction(job?.createdAt)}d ago`}
                </span>
                <Button 
                    variant="ghost" 
                    size="sm"
                    className="rounded-full p-2 hover:bg-purple-50/50"
                >
                    <Bookmark className='w-4 h-4 text-muted-foreground' />
                </Button>
            </div>

            {/* Company Info */}
            <div className='flex items-start gap-4 mb-6'>
                <Avatar className='w-14 h-14 border-2 border-purple-100'>
                    <AvatarImage 
                        src={job?.company?.logo} 
                        className='object-contain'
                    />
                </Avatar>
                <div>
                    <h2 className='text-lg font-semibold text-gray-900'>
                        {job?.company?.name || "Company Name"}
                    </h2>
                    <div className='flex items-center gap-2 mt-1'>
                        <span className='text-sm text-muted-foreground'>
                            {job?.location || "Location"}
                        </span>
                        <span className='text-muted-foreground'>•</span>
                        <span className='text-sm text-muted-foreground'>
                            {job?.company?.sector || "Sector"}
                        </span>
                    </div>
                </div>
            </div>

            {/* Job Details */}
            <div className='mb-6'>
                <h3 className='text-xl font-bold text-gray-900 mb-2'>
                    {job?.title}
                </h3>
                <p className='text-muted-foreground line-clamp-3'>
                    {job?.description}
                </p>
            </div>

            {/* Badges */}
            <div className='flex flex-wrap gap-2 mb-6'>
                <Badge variant="outline" className='px-3 py-1 bg-purple-50 text-purple-700'>
                    {job?.position} position{job?.position > 1 ? 's' : ''}
                </Badge>
                <Badge variant="outline" className='px-3 py-1 bg-blue-50 text-blue-700'>
                    {job?.jobType}
                </Badge>
                <Badge variant="outline" className='px-3 py-1 bg-green-50 text-green-700'>
                    ₹{job?.salary} LPA
                </Badge>
            </div>

            {/* Actions */}
            <div className='flex flex-col sm:flex-row gap-3'>
                <Button 
                    onClick={() => navigate(`/description/${job._id}`)}
                    variant="outline"
                    className='w-full sm:w-auto px-6 py-3'
                >
                    View Details
                </Button>
                <Button 
                    className='w-full sm:w-auto px-6 py-3 bg-purple-600 hover:bg-purple-700'
                >
                    Save Position
                </Button>
            </div>
        </div>
    )
}

export default Job