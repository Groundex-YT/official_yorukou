import { Media, MediaType } from '@/types/anilist'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Youtube from './Youtube'
import YTPlayer from 'react-youtube'
// import { classNames, mediaRedirectUrl } from '@/utils'
import Link from 'next/link'
import WatchButton from './WatchButton'
import AddtoListButton from './AddtoListButton'
import TrendingCarousel from './Carousels/TrendingCarousel'
import { TrailAnimation } from '../Animation/Trail'
import { BsFillVolumeUpFill, BsVolumeMuteFill } from 'react-icons/bs'
import Trending from '../sabs/Trending'
import BannerSkeleton from '../skeleton/BannerSkeleton'
import { VolumeFull, VolumeMuted } from '@/icons'
import UniversalButton from './UniversalButton'
import classNames from 'classnames'
import { convertMeanScore } from '@/utils'
import { useUser } from '@/context/AuthenticationContextProvider'
import EditPen from '@/icons/EditPen'
import Fanart from '@/api/fanart'

export interface BannerProps {
    type?: string
    data: Media[]
    isLoading?: boolean
}

export const bannerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
}

const Banner: React.FC<BannerProps> = ({ data, isLoading }) => {
    const [Trailer, setTrailer] = useState(false)
    const [muted, setMuted] = useState(true)
    const [current, setCurrent] = useState(0)

    const { User } = useUser()

    const isRanOnce = useRef(false)

    const [player, setPlayer] =
        useState<ReturnType<YTPlayer['getInternalPlayer']>>()

    const mute = useCallback(() => {
        if (!player) return

        player.mute()

        setMuted(true)
    }, [player])

    const unMute = useCallback(() => {
        if (!player) return

        player.unMute()

        setMuted(false)
    }, [player])

    const activeSlide = useMemo(
        () => (data ? data[current] : null),
        [data, current]
    )

    useEffect(() => {
        if (!activeSlide?.trailer) {
            setTrailer(false)
        }
    }, [activeSlide])

    useEffect(() => {
        const fetch = async () => {
            const Artwork = new Fanart()

            const res = await Artwork.Search(activeSlide?.title?.english!)

            console.log(res)
        }

        fetch()
    }, [activeSlide?.title?.english])

    return (
        <AnimatePresence>
            {/* <div className="md:hidden">
                <Trending data={data} isLoading={isLoading} />
            </div> */}
            <div className="transition-all duration-500 relative w-full h-[674px] md1:h-[500px] md2:h-[300px] md1:overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-screen md1:h-full">
                    <div className="relative w-full h-full">
                        {activeSlide?.bannerImage && !Trailer && (
                            <motion.div
                                variants={bannerVariants}
                                transition={{ duration: 0.5 }}
                                animate="animate"
                                exit="exit"
                                initial="initial"
                                className="h-0 w-full"
                                key={activeSlide?.id}
                            >
                                <Image
                                    src={activeSlide?.bannerImage!}
                                    className="h-full h-full object-cover"
                                    fill
                                    alt={
                                        activeSlide?.title?.english! ||
                                        activeSlide?.title?.userPreferred!
                                    }
                                />
                            </motion.div>
                        )}
                        {activeSlide?.type === MediaType.Anime &&
                            activeSlide?.trailer?.id &&
                            activeSlide?.trailer?.site === 'youtube' && (
                                <Youtube
                                    className={classNames(
                                        'relative w-full overflow-hidden aspect-w-16 aspect-h-9 h-[300%] -top-[100%]',
                                        !Trailer && 'hidden'
                                    )}
                                    key={activeSlide?.title?.userPreferred!}
                                    iframeClassName="absolute inset-0 h-full w-full"
                                    videoId={activeSlide?.trailer?.id}
                                    onReady={({ target }) => {
                                        setPlayer(target)
                                    }}
                                    onPlay={({ target }) => {
                                        setTrailer(true)

                                        if (!isRanOnce.current) {
                                            setMuted(true)
                                        } else if (!muted) {
                                            setMuted(false)

                                            target.unMute()
                                        }

                                        isRanOnce.current = true
                                    }}
                                    onPause={() => {
                                        setTrailer(false)
                                    }}
                                    onEnd={() => {
                                        setTrailer(false)
                                    }}
                                    onError={() => {
                                        setTrailer(false)
                                    }}
                                />
                            )}

                        <div className="absolute inset-0 bg-gradient-conic">
                            <div className="relative w-full h-full"></div>
                        </div>
                        <div className="absolute inset-0 bg-right-blend z-5"></div>
                        <div className="absolute bottom-0 left-0 right-0 h-[329px] bg-nav-blend z-5"></div>
                    </div>
                </div>
                <div className="absolute inset-0">
                    <div className="relative w-full h-full">
                        <div className="absolute left-0 bottom-0 right-0 z-10">
                            <div className="transition-all duration-500 max-w-[1560px] px-5 w-full m-auto grid grid-cols-2 md3:flex mb-24 md1:mb-10">
                                {isLoading ? (
                                    <BannerSkeleton />
                                ) : (
                                    <>
                                        <div className="w-full pr-16 flex flex-col select-none md1:pr-2">
                                            <TrailAnimation
                                                animation="fadeSlideUp"
                                                show={true}
                                                delay={700}
                                                key={
                                                    activeSlide?.title
                                                        ?.userPreferred
                                                }
                                            >
                                                <div className="transition-all duration-500 text-gray-400 text-base font-light md1:text-sm md2:text-xs">
                                                    {activeSlide?.studios?.nodes?.map(
                                                        (studio, i) => (
                                                            <span key={i}>
                                                                {studio?.name}
                                                            </span>
                                                        )
                                                    )}
                                                </div>
                                                <h1 className="transition-all cut-word-2 overflow-hidden duration-500 text-slate-200 font-bold text-[40px] mt-3 uppercase leading-[50px] md1:text-2xl md2:text-base md1:mt-2 md1:leading-[30px]">
                                                    {activeSlide?.title
                                                        ?.english ||
                                                        activeSlide?.title
                                                            ?.userPreferred}
                                                </h1>
                                                <div className="transition-all duration-500 flex items-center mt-3 gap-[18px] md1:mt-2 md1:gap-2.5">
                                                    {activeSlide?.genres?.map(
                                                        (genre, i) => (
                                                            <Link
                                                                href={
                                                                    '/browse?genre=12'
                                                                }
                                                                key={i}
                                                                className="transition-all duration-300 block bg-secondary px-6 py-1 font-bold text-[13px] md1:text-[8px] text-slate-400 capitalize rounded-md hover:hover:bg-[rgba(31,38,46,0.4)]"
                                                            >
                                                                {genre}
                                                            </Link>
                                                        )
                                                    )}
                                                </div>
                                                <div className="mt-5 md2:mt-2 flex items-center">
                                                    {[...new Array(5)].map(
                                                        (val, i) => {
                                                            return i + 1 <=
                                                                (convertMeanScore(
                                                                    activeSlide?.meanScore!,
                                                                    5
                                                                ) |
                                                                    0) ? (
                                                                <svg
                                                                    key={i}
                                                                    className="duration-300 w-4 h-4 md2:w-2.5 md2:h-2.5 text-yellow-300 me-1"
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
                                                                    className="w-4 h-4 md2:w-2.5 md2:h-2.5 text-gray-300 me-1 dark:text-gray-500"
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
                                                    <p className="ms-1 text-sm md2:text-xs font-medium text-gray-500 dark:text-gray-400">
                                                        {convertMeanScore(
                                                            activeSlide?.meanScore!,
                                                            5
                                                        ).toFixed(2)}
                                                    </p>
                                                    <p className="ms-1 text-sm md2:text-xs font-medium text-gray-500 dark:text-gray-400">
                                                        out of
                                                    </p>
                                                    <p className="ms-1 text-sm md2:text-xs font-medium text-gray-500 dark:text-gray-400">
                                                        5
                                                    </p>
                                                </div>
                                                <p
                                                    className="mt-5 text-md text-gray-400 font-light cut-word-4 overflow-hidden md1:mt-3 md1:text-sm md2:text-xs"
                                                    dangerouslySetInnerHTML={{
                                                        __html: activeSlide?.description!,
                                                    }}
                                                ></p>
                                            </TrailAnimation>
                                            <div className="transition-all duration-500 flex items-center mt-5 gap-[33px] md1:gap-4 md1:mt-4">
                                                <WatchButton
                                                    href={'/'}
                                                    classAdd="px-10 py-[15px] md1:text-sm md1:px-5 md1:py-2"
                                                />
                                                {User?.role === 'admin' ? (
                                                    <button
                                                        // onClick={HandleProfileBtn}
                                                        className="text-right"
                                                    >
                                                        <EditPen
                                                            style={{
                                                                filter: 'drop-shadow(1px 1px 2px #000)',
                                                            }}
                                                            className="bg-[rgba(0,0,0,.7)] max-w-11 max-h-11 rounded-[5rem] w-8 h-8 overflow-visible"
                                                        />
                                                    </button>
                                                ) : User?.role === 'editor' ? (
                                                    <button
                                                        // onClick={() =>
                                                        //     setIsOpen(true)
                                                        // }
                                                        className="text-right"
                                                    >
                                                        <EditPen
                                                            style={{
                                                                filter: 'drop-shadow(1px 1px 2px #000)',
                                                            }}
                                                            className="bg-[rgba(0,0,0,.7)] max-w-11 max-h-11 rounded-[5rem] w-8 h-8 md1:w-5 md1:h-5 overflow-visible"
                                                        />
                                                    </button>
                                                ) : null}
                                                {/* <AddtoListButton
                                                    data={activeSlide!}
                                                    className="px-10 py-[15px] md1:text-sm md1:px-5 md1:py-1.5"
                                                /> */}
                                            </div>
                                        </div>
                                        <div className="relative w-full select-none md3:hidden">
                                            <div className="absolute bottom-0 right-0 left-0 h-64">
                                                <div className="relative w-full h-full select-none">
                                                    <div className="absolute bottom-0 right-0 left-0">
                                                        <div className="flex relative w-full h-full justify-end">
                                                            {Trailer &&
                                                                player && (
                                                                    <UniversalButton
                                                                        onClick={
                                                                            muted
                                                                                ? unMute
                                                                                : mute
                                                                        }
                                                                        className="z-10 transition-all duration-300 w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center hover:scale-125"
                                                                    >
                                                                        {muted ? (
                                                                            <VolumeMuted className="w-8 h-8" />
                                                                        ) : (
                                                                            <VolumeFull className="w-8 h-8" />
                                                                        )}
                                                                    </UniversalButton>
                                                                )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative max-w-[1560px] px-5 w-full m-auto">
                <TrendingCarousel setCurrent={setCurrent} data={data} />
            </div>
        </AnimatePresence>
    )
}

export default Banner
