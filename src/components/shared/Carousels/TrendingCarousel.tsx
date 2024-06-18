import { Media } from '@/types/anilist'
import React, { useEffect, useRef, useState } from 'react'
import SwiperCore from 'swiper'
import { Navigation, Pagination } from 'swiper/modules'
import {
    Swiper as ReactSwiper,
    SwiperSlide as ReactSwiperSlide,
    SwiperSlide,
} from 'swiper/react'
import 'swiper/css'
//@ts-ignore
import type SwiperClass from 'swiper/types/swiper-class'

export type SwiperInstance = SwiperClass
import TrendingCarouselSlider from './TrendingCarouselSlider'
import { isMobile } from 'react-device-detect'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import classNames from 'classnames'

SwiperCore.use([Navigation, Pagination])

interface BannerProps {
    data: Media[]
    setCurrent: (e: any) => void
}

const TrendingCarousel: React.FC<BannerProps> = ({ data, setCurrent }) => {
    const [swiper, setSwiper] = useState<SwiperInstance | null>(null)
    const [ActiveIndex, setActiveIndex] = useState<number | null>(null)

    const [info, setInfo] = useState({
        isBeginning: true,
        isEnd: false,
    })

    const slideTo = (index: number) => swiper?.slideTo(index)

    const prevBtnRef = useRef<HTMLButtonElement>(null)
    const nextBtnRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        setCurrent(ActiveIndex)
    }, [ActiveIndex, setCurrent])

    // @ts-ignore
    let debounceTimeout: NodeJS.Timeout = null

    const debounce = (fn: (...args: any[]) => void, wait: number) => {
        return (...args: any[]) => {
            const later = () => {
                //@ts-ignore
                debounceTimeout = null
                fn(...args)
            }

            clearTimeout(debounceTimeout)
            debounceTimeout = setTimeout(later, wait)
        }
    }

    return (
        <div className="relative w-full h-[200px] md1:h-[160px] md2:h-[50px]">
            <div className="absolute top-0 left-0 bottom-0 w-12 z-10">
                <div className="w-full h-full relative flex items-center justify-center">
                    <button
                        ref={prevBtnRef}
                        className="swiper-prev-button transition-all duration-300 w-10 h-10 bg-gray-700 rounded-full -translate-x-5 flex items-center justify-center hover:bg-gray-600"
                    >
                        <FiChevronLeft className="w-6 h-6 text-slate-100 text-center" />
                    </button>
                </div>
            </div>
            <ReactSwiper
                className="relative w-full h-full !overflow-hidden"
                onSwiper={setSwiper}
                speed={300}
                loop
                allowTouchMove={false}
                navigation={{
                    prevEl: prevBtnRef.current,
                    nextEl: nextBtnRef.current,
                }}
                breakpoints={{
                    1536: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                    1307: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    640: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    0: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                }}
                onBeforeInit={(swiper) => {
                    // @ts-ignore
                    // eslint-disable-next-line no-param-reassign
                    swiper.params.navigation.prevEl = prevBtnRef.current
                    // @ts-ignore
                    // eslint-disable-next-line no-param-reassign
                    swiper.params.navigation.nextEl = nextBtnRef.current

                    setActiveIndex(swiper?.realIndex)

                    swiper.slideTo(0, 0)

                    setSwiper(swiper)
                    setInfo({
                        isBeginning: swiper?.isBeginning,
                        isEnd: swiper?.isEnd,
                    })
                }}
                onInit={(swiper) => {
                    swiper.navigation.destroy()
                    swiper.navigation.init()
                    swiper.navigation.update()
                }}
                onSlideChange={(swiper) => {
                    setActiveIndex(swiper?.realIndex)
                    setInfo({
                        isBeginning: swiper?.isBeginning,
                        isEnd: swiper?.isEnd,
                    })
                }}
            >
                {data?.map((media, i) => {
                    return (
                        <SwiperSlide
                            key={media.id!}
                            className={classNames(
                                'transition-all duration-500 rounded-md w-full h-full oveflow-hidden cursor-pointer',
                                ActiveIndex === i && 'scale-105'
                            )}
                        >
                            <TrendingCarouselSlider
                                isActive={i === ActiveIndex}
                                data={media}
                            />
                        </SwiperSlide>
                    )
                })}
            </ReactSwiper>
            <div className="absolute top-0 right-0 bottom-0 w-12 z-10">
                <div className="w-full h-full relative flex items-center justify-center">
                    <button
                        ref={nextBtnRef}
                        className="transition-all duration-300 w-10 h-10 bg-gray-700 rounded-full translate-x-5 flex items-center justify-center hover:bg-gray-600"
                    >
                        <FiChevronRight className="w-6 h-6 text-center text-slate-100" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default React.memo(TrendingCarousel)
