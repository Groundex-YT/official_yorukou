/* eslint-disable @next/next/no-img-element */
import React from 'react'
import {
    Swiper as ReactSwiper,
    SwiperSlide as ReactSwiperSlide,
} from 'swiper/react'
//@ts-ignore
import SwiperCore, { Navigation } from 'swiper'
//@ts-ignore
import type SwiperClass from 'swiper/types/swiper-class'
import 'swiper/swiper.min.css'
import 'swiper/css'
import { Media } from '@/types/anilist'
import { ImPlay2 } from 'react-icons/im'
import { MdLibraryAdd } from 'react-icons/md'
import WatchButton from '../shared/WatchButton'
import AddtoListButton from '../shared/AddtoListButton'

export type SwiperInstance = SwiperClass
export interface SwiperProps extends React.ComponentProps<typeof ReactSwiper> {
    hideNavigation?: boolean
    isOverflowHidden?: boolean
    defaultActiveSlide?: number
    children?: React.ReactNode
    data?: Media[]
    media?: Media
    isLoading?: boolean
}

SwiperCore.use([Navigation])

const Trending: React.FC<SwiperProps> = ({ data, isLoading }) => {
    return (
        <div className="w-full h-[600px] md3:h-[450px] overflow-hidden">
            <div className="w-full h-[356px] mt-[180px] md3:h-[240px]">
                <div className="css-in max-w-[1560px] px-5 w-full h-full m-[0_auto]">
                    <ReactSwiper
                        slidesPerView={1}
                        spaceBetween={14}
                        centeredSlides={true}
                        loop={true}
                        className="mySwiper"
                    >
                        {data?.map((media, i) => (
                            <ReactSwiperSlide key={i}>
                                <Card media={media} />
                            </ReactSwiperSlide>
                        ))}
                    </ReactSwiper>
                </div>
            </div>
        </div>
    )
}

const Card: React.FC<SwiperProps> = ({ media }) => {
    return (
        <div className="card-slide w-full h-full flex items-center justify-center">
            <div className="relative transition-all duration-500 card-wrapper w-full h-[312px] md3:h-[200px] bg-gray-700 rounded-[6px] grid grid-cols-[161px_1fr] md3:grid-cols-[100px_1fr] xsmax:!grid-cols-[70px_1fr] md3:gap-[13px] md3:py-0 md3:px-[13px] px-[23px] gap-[33px]">
                <div className="transition-all overflowing-image absolute insert-0 rounded-[6px] bg-gray-700 w-full h-full overflow-hidden duration-500 z-[80]">
                    <img
                        className="w-full h-full object-cover"
                        src={
                            media?.coverImage?.extraLarge!
                                ? media?.coverImage?.extraLarge!
                                : media?.coverImage?.large!
                        }
                        alt=""
                    />
                </div>
                <div className="transition-all duration-500 w-full mt-[199px] md3:mt-[90px] xsmax:!mt-[75px]">
                    <WatchButton
                        href="/anime/details/?id="
                        classAdd="w-full px-10 py-[15px] md1:text-sm md1:px-5 md1:py-2"
                    />
                    <AddtoListButton className="w-full px-10 py-[15px] md1:text-sm md1:px-5 md1:py-2 mt-[10px]" />
                </div>
                <div className="mt-[38px] md3:mt-5 w-full overflow-hidden">
                    <h2 className="text-xl md3:text-base md3:leading-[20px] font-medium leading-[28px] overflow-hidden text-slate-100 cut-word-1">
                        {media?.title?.english || media?.title?.userPreferred!}
                    </h2>
                    <span className="text-[12px] md3:text-[10px] leading-[14px] mt-[2px] cut-word-1 overflow-hidden text-slate-400">
                        Original title:{' '}
                        {media?.title?.romaji!
                            ? media?.title?.romaji!
                            : media?.title?.userPreferred!}
                    </span>
                    <h4 className="font-medium text-[13px] md3:text-[10px] leading-[15px] mt-[5px] text-slate-400">
                        Anime (2017 - 2021) - {media?.season} Seasons -{' '}
                        {media?.episodes ? media.episodes : 'null'} Episodes
                    </h4>
                    <p
                        className="w-full max-h-[52px] h-full text-[11px] leading-[13px] mt-[18px] overflow-hidden cut-word-four text-[#748899]"
                        dangerouslySetInnerHTML={{
                            __html: `${media?.description!}`,
                        }}
                    ></p>
                    <div className="w-full overflow-hidden">
                        {media?.genres?.map((genre, i) => (
                            <span
                                className="inline-flex py-[5px] px-[10px] text-[11px] leading-[13px] mt-[17px] bg-[#d9d9d9] rounded-[15px] text-[#748899]"
                                key={i}
                            >
                                {genre}
                            </span>
                        ))}
                    </div>
                    <div className="w-full md3:hidden h-[77px] mt-[18px] rounded-[6px] overflow-hidden relative">
                        <img
                            src={
                                media?.bannerImage!
                                    ? media.bannerImage
                                    : 'https://upload.wikimedia.org/wikipedia/commons/7/75/No_image_available.png'
                            }
                            alt=""
                        />
                        <div className="trailer-overlay"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Trending
