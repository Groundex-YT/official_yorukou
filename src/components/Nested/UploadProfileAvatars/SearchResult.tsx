import { Media } from '@/types/anilist'
import React from 'react'
import { isEmpty } from 'lodash'
import Spinner from '@/components/shared/Spinner'
import { TrailAnimation } from '@/components/Animation/Trail'
import Image from 'next/image'
import { FaAngleRight } from 'react-icons/fa6'
import { convertMeanScore } from '@/utils'

export interface SearchResultProps {
    data?: Media[]
    isLoading?: boolean
    isLoading2?: boolean
    error?: any
}

const SearchResult: React.FC<SearchResultProps> = ({
    data,
    isLoading,
    isLoading2,
    error,
}) => {
    if (error) {
        return (
            <div className="w-full w-full py-16 px-6">
                <div className="w-full flex items-center justify-center">
                    <div className="w-[50px] h-[50px]">
                        <Spinner innerClassName="!bg-secondary" />
                    </div>
                </div>
            </div>
        )
    }

    if (isLoading2) {
        return (
            <div className="w-full w-full py-16 px-6">
                <div className="w-full flex items-center justify-center">
                    <div className="w-[50px] h-[50px]">
                        <Spinner innerClassName="!bg-secondary" />
                    </div>
                </div>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className="w-full w-full py-16 px-6">
                <div className="w-full flex items-center justify-center">
                    <div className="w-[50px] h-[50px]">
                        <Spinner innerClassName="!bg-secondary" />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full min-h-[0] py-[1.5em] overflow-x-hidden flex flex-col gap-[.5em] nun_1">
            {!isLoading && !isLoading2 && (
                <React.Fragment>
                    {isEmpty(data) ? (
                        <div className="w-full py-16 px-6">
                            <h1 className="text-center text-slate-400">
                                No Data {`\\__(-_-)__/`} !!
                            </h1>
                        </div>
                    ) : (
                        <React.Fragment>
                            <TrailAnimation animation="fadeSlideLeft">
                                {data?.map((media, i) => (
                                    <div
                                        className="group px-[1em] cursor-pointer"
                                        key={i}
                                    >
                                        <div className="bg-[#26262D] rounded-md p-[1vw] max-md:p-2.5 flex items-center justify-between">
                                            <div className="flex items-center gap-[1em]">
                                                <div className="w-[2vw] min-h-10 min-w-10 h-[2vw] rounded-md overflow-hidden">
                                                    <Image
                                                        className="w-full h-full object-cover"
                                                        src={
                                                            media.coverImage
                                                                ?.extraLarge! ||
                                                            media.coverImage
                                                                ?.large!
                                                        }
                                                        width={334}
                                                        height={502}
                                                        alt="avatar"
                                                    />
                                                </div>
                                                <div className="flex flex-col">
                                                    <div className="flex items-center">
                                                        {[...new Array(5)].map(
                                                            (val, i) => {
                                                                return i + 1 <=
                                                                    (convertMeanScore(
                                                                        media?.meanScore!,
                                                                        5
                                                                    ) |
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
                                                            }
                                                        )}
                                                        <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                                                            {convertMeanScore(
                                                                media?.meanScore!,
                                                                5
                                                            ).toFixed(2)}
                                                        </p>
                                                        <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                                                            out of
                                                        </p>
                                                        <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                                                            5
                                                        </p>
                                                    </div>
                                                    <h1 className="text-[.8vw] max-md:text-sm max-w-[20vw] cut-word-one overflow-hidden">
                                                        {media.title
                                                            ?.english! ||
                                                            media.title
                                                                ?.userPreferred!}
                                                    </h1>
                                                </div>
                                            </div>
                                            <span className="duration-300 group-hover:translate-x-2">
                                                <FaAngleRight className="text-gray-500 text-[.8vw]" />
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </TrailAnimation>
                        </React.Fragment>
                    )}
                </React.Fragment>
            )}
        </div>
    )
}

export default SearchResult
