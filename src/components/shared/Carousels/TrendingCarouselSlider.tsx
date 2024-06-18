import { Media } from '@/types/anilist'
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import classNames from 'classnames'
import FrameIcon from '@/icons/FrameIcon'
import { convertMeanScore } from '@/utils'

interface TrendingCarouselSliderProps {
    data: Media
    isActive?: boolean
}

Image

const TrendingCarouselSlider: React.FC<TrendingCarouselSliderProps> = ({
    data,
    isActive,
}) => {
    return (
        <motion.div
            variants={{
                enter: {
                    opacity: 1,
                    speed: 300,
                },
                exit: {
                    opacity: 1,
                    y: 0,
                },
            }}
            animate={isActive ? 'enter' : 'exit'}
            title={data?.title?.userPreferred!}
            className={classNames(
                'group relative w-full rounded-md h-full overflow-hidden select-none p-10',
                isActive ? 'border-4 border-primary' : ''
            )}
        >
            <div className="relative w-full h-full">
                <div className="duration-300 absolute inset-0 -z-[1] w-full h-full bg-black rounded-[20px] shadow-btn rotate-6 origin-bottom-right bg-[linear-gradient(135deg,_#2563EB_-20%,_#4682eb_120%)]"></div>
                <div className="absolute border-t border-r border-white/25 inset-0 w-full h-full z-[1] rounded-[20px] bg-main_dark/65 backdrop-blur-xl overflow-hidden flex items-center">
                    <div className="relative w-full h-full grid grid-cols-[60px_1fr] items-center m-5 py-5 gap-2.5">
                        <div className="relative w-full h-full rounded-[10px] overflow-hidden shadow-bg">
                            <Image
                                src={
                                    data?.coverImage?.extraLarge ||
                                    data?.coverImage?.large!
                                }
                                className="duration-300 w-full h-full object-cover"
                                width={334}
                                height={502}
                                alt={data?.title?.userPreferred!}
                            />
                        </div>
                        <div className="w-full flex flex-col">
                            <h1 className="w-full text-slate-200 cut-word-one overflow-hidden [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">
                                {data?.title?.english! ||
                                    data?.title?.userPreferred!}
                            </h1>
                            <h2 className="q-full text-sm text-gray-400 cut-word-one overflow-hidden">
                                {data.genres?.join('/')}
                            </h2>
                            <div className="flex items-center">
                                {[...new Array(5)].map((val, i) => {
                                    return i + 1 <=
                                        (convertMeanScore(data?.meanScore!, 5) |
                                            0) ? (
                                        <svg
                                            key={i}
                                            className="w-4 h-4 text-yellow-300 me-1"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 22 20"
                                        >
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                    ) : (
                                        <svg
                                            key={i}
                                            className="w-4 h-4 text-gray-300 me-1 dark:text-gray-500"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 22 20"
                                        >
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="absolute inset-0">
                <div className="relative z-10 w-full h-full">
                    <Image
                        src={
                            data?.bannerImage! ||
                            data?.coverImage?.extraLarge ||
                            data?.coverImage?.large!
                        }
                        className="duration-300 w-full h-full object-cover"
                        width={1000}
                        height={563}
                        alt="fdkfd"
                    />
                    <div className="absolute bottom-0 inset-x-0 backdrop-blur bg-secondary/20">
                        Hello
                    </div>
                    <div
                        className={classNames(
                            'absolute inset-0 duration-300 border-2 border-black/5 bg-gradient-conic rounded-md'
                            // isActive
                            //     ? ''
                            //     : ''
                        )}
                    ></div>
                </div>
            </div> */}
        </motion.div>
    )
}

export default TrendingCarouselSlider
