import React from 'react'

const PageLoader = () => {
    return (
        <div className="w-screem h-screen flex items-center justify-center flex-wrap">
            <div className="flex m-[1.5em] w-[6em] h-[6em] justify-around">
                <div className="w-[1em] h-[1em] rounded-full origin-2/4 bg-[#f42f25] animate-[bounce_1s_linear_infinite]"></div>
                <div className="w-[1em] h-[1em] rounded-full origin-2/4 bg-[#f49725] animate-[bounce_1s_0.1s_linear_infinite]"></div>
                <div className="w-[1em] h-[1em] rounded-full origin-2/4 bg-[#255ff4] animate-[bounce_1s_0.2s_linear_infinite]"></div>
            </div>
        </div>
    )
}

export default PageLoader
