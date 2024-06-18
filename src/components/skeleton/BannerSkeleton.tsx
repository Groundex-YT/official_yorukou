import React from 'react'

const BannerSkeleton = () => {
    return (
        <>
            <div className="w-full pr-16 flex flex-col gap-3.5 select-none md1:pr-2">
                <div className="h-5 w-40 animate-pulse bg-gray-700 rounded-sm"></div>
                <div className="h-11 w-full animate-pulse bg-gray-700 rounded-sm"></div>
                <div className="h-7 w-70 animate-pulse bg-gray-700 rounded-sm"></div>
                <div className="h-32 w-full animate-pulse bg-gray-700 rounded-sm"></div>
            </div>
            <div className="w-full"></div>
        </>
    )
}

export default BannerSkeleton
