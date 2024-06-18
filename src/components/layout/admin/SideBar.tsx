'use client'

import React, { useEffect } from 'react'
import _ from 'lodash'
import Link from 'next/link'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import Image from 'next/image'
import { useUser } from '@/context/AuthenticationContextProvider'
import { IoIosArrowDown, IoMdLogOut } from 'react-icons/io'
import { IoSettingsOutline } from 'react-icons/io5'
import { MdBroadcastOnHome } from 'react-icons/md'
import { MdQueryStats, MdMovieEdit } from 'react-icons/md'
import { PiBooksLight, PiFolderUser } from 'react-icons/pi'

const Pages = [
    {
        name: 'Dashboard',
        path: '/admin/home',
        Icon: MdBroadcastOnHome,
    },
    {
        name: 'Performance',
        path: '/admin/media',
        Icon: MdQueryStats,
    },
]

const Contents = [
    {
        name: 'Anime',
        path: '/admin/manage/anime',
        Icon: MdMovieEdit,
    },
    {
        name: 'Manga',
        path: '/admin/manage/manga',
        Icon: PiBooksLight,
    },
    {
        name: 'Users',
        path: '/admin/manage/users',
        Icon: PiFolderUser,
    },
]

const SideBar = () => {
    const { User } = useUser()
    const router = useRouter()
    const isActive = (e: any) => router.route === e.path

    useEffect(() => {
        console.log(User)
    }, [User])

    return (
        <div className="min-h-full z-[999] w-[240px] -translate-x-[250px] fixed backdrop-blur bg-main_dark/75 pt-7 flex flex-col justify-between select-none overflow-hidden shadow-button">
            <div className="w-full">
                <div className="w-full">
                    <div className="px-7">
                        <Link
                            className={classNames(
                                'block select-none transition-all duration-500 h-7'
                            )}
                            href={'/'}
                        >
                            <Image
                                className="h-full w-auto"
                                src={'/Logo.png'}
                                alt="Logo"
                                width={166}
                                height={60}
                            />
                        </Link>
                    </div>
                    <h1 className="px-7 text-xs text-gray-500 mt-7 uppercase">
                        Pages
                    </h1>
                    <ul className="mt-[1em] flex flex-col">
                        {Pages.map((page, i) => (
                            <li
                                className={classNames(
                                    `relative text-gray-400 duration-300`,
                                    isActive(page) && 'text-primary'
                                )}
                                key={i}
                            >
                                <Link
                                    className="block gap-2 px-7 py-1.5 text-xs font-medium flex items-center"
                                    href={page.path}
                                >
                                    <page.Icon className="text-2xl font-extralight"></page.Icon>
                                    <span>{page.name}</span>
                                    {isActive(page) && (
                                        <span className="absolute top-0 right-0 bottom-0 w-2.5 bg-primary rounded-md translate-x-1"></span>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="w-full mt-6">
                    <h1 className="px-7 text-xs text-gray-500 uppercase">
                        contents
                    </h1>
                    <ul className="mt-[1em] flex flex-col">
                        {Contents?.map((menu, i) => (
                            <li
                                className={classNames(
                                    `relative text-gray-400 duration-300`,
                                    isActive(menu) && 'text-primary'
                                )}
                                key={i}
                            >
                                <Link
                                    className="block gap-2 px-7 py-1.5 text-xs font-medium flex items-center"
                                    href={menu.path}
                                >
                                    <menu.Icon className="text-2xl font-extralight"></menu.Icon>
                                    <span>{menu.name}</span>
                                    {isActive(menu) && (
                                        <span className="absolute top-0 right-0 bottom-0 w-2.5 bg-primary rounded-md translate-x-1"></span>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="w-full mt-6">
                    <h1 className="px-7 text-xs text-gray-500 uppercase">
                        Database
                    </h1>
                    <ul className="mt-[1em] flex flex-col">
                        {/* {Contents?.map((menu, i) => (
                            <li
                                className={classNames(
                                    `relative text-gray-400 duration-300`,
                                    isActive(menu) && 'text-primary'
                                )}
                                key={i}
                            >
                                <Link
                                    className="block gap-2 px-7 py-1.5 text-xs font-medium flex items-center"
                                    href={menu.path}
                                >
                                    <menu.Icon className="text-2xl font-extralight"></menu.Icon>
                                    <span>{menu.name}</span>
                                    {isActive(menu) && (
                                        <span className="absolute top-0 right-0 bottom-0 w-2.5 bg-primary rounded-md translate-x-1"></span>
                                    )}
                                </Link>
                            </li>
                        ))} */}
                    </ul>
                </div>
            </div>
            <div className="w-full p-7">
                <button className="w-full flex items-center gap-[.5vw] outline-none focus:outline-none p-2.5 text-[1.3vw] bg-[#111118] rounded-lg">
                    <div className="duration-300 outline-none focus:outline-none w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:bg-[rgba(31,38,46,0.4)]">
                        <h1 className="text-slate-100 text-[.9vw] font-bold">
                            {User?.username[0]}
                        </h1>
                    </div>
                    <div className="flex flex-col items-start">
                        <h1 className="text-[.6vw] text-slate-300">
                            {User?.username}
                        </h1>
                        <h2 className="text-[.5vw] text-gray-500">
                            {User?.role}
                        </h2>
                    </div>
                    <div className="flex flex-col text-gray-500 text-[.5vw]">
                        <IoIosArrowDown className="rotate-180" />
                        <IoIosArrowDown />
                    </div>
                </button>
                <ul className="mt-7">
                    <li
                        className={classNames(
                            `relative py-1.5 text-[.7vw] font-medium duration-300 text-slate-300`
                        )}
                    >
                        <button className="flex items-center rounded-md gap-[1em] border-0 outline-none focus:outline-none">
                            <div className="text-slate-300">
                                <IoSettingsOutline className="text-slate-300" />
                            </div>
                            <span>Settings</span>
                        </button>
                    </li>
                    <li
                        className={classNames(
                            `relative py-1.5 text-[.7vw] font-medium duration-300 text-slate-300`
                        )}
                    >
                        <button className="flex items-center rounded-md gap-[1em] border-0 outline-none focus:outline-none">
                            <div className="text-slate-300">
                                <IoMdLogOut className="text-slate-300" />
                            </div>
                            <span>Logout</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SideBar
