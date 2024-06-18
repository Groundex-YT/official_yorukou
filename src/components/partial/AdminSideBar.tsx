'use client'

import React from 'react'
import _ from 'lodash'
import Link from 'next/link'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import { MdMovieFilter } from 'react-icons/md'
import { RiEditCircleFill } from 'react-icons/ri'
import { GiMeditation } from 'react-icons/gi'

const Pages = [
    {
        name: 'Home',
        path: '/admin/home',
    },
    {
        name: 'Media',
        path: '/admin/media',
    },
]

const Menu = [
    {
        path: '/admin/home',
        items: [
            {
                name: 'Media',
                path: '/admin/home',
                Icon: MdMovieFilter,
            },
            {
                name: 'Create',
                path: '/admin/dada',
                Icon: RiEditCircleFill,
            },
            {
                name: 'Pose',
                path: '/admin/dadad',
                Icon: GiMeditation,
            },
        ],
    },
]

const AdminSideBar = () => {
    const router = useRouter()
    const isActive = (e: any) => router.route === e.path
    const activeMenu = Menu.find((menu) => router.route === menu.path)

    return (
        <div className="min-h-full w-[220px] fixed bg-secondary float-left pt-20 select-none">
            <div className="w-full">
                <h1 className="px-7 text-sm text-gray-400">Pages</h1>
                <ul className="mt-[1em] flex flex-col">
                    {Pages.map((page, i) => (
                        <li
                            className={classNames(
                                `relative px-7 py-1.5 text-base text-gray-400 font-medium duration-300`,
                                isActive(page) && 'text-primary'
                            )}
                            key={i}
                        >
                            <Link className="block" href={page.path}>
                                {page.name}
                            </Link>
                            {isActive(page) && (
                                <span className="absolute top-0 left-0 bottom-0 w-2.5 bg-primary rounded-md -translate-x-1"></span>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="w-full mt-7">
                <h1 className="px-7 text-sm text-gray-400">Menu</h1>
                <ul className="mt-[1em] flex flex-col">
                    {activeMenu?.items.map((menu, i) => (
                        <li
                            className={classNames(
                                `relative px-7 py-1.5 text-sm text-gray-400 font-medium duration-300`,
                                isActive(menu.path) && 'text-primary'
                            )}
                            key={i}
                        >
                            <Link
                                className="flex items-center bg-[#26262D] rounded-md px-[1em] py-1.5 gap-[1em]"
                                href={menu.path}
                            >
                                <div>
                                    <menu.Icon
                                        className={classNames(
                                            'text-md',
                                            isActive(menu) && 'text-primary'
                                        )}
                                    />
                                </div>
                                <span
                                    className={classNames(
                                        isActive(menu) && 'text-primary'
                                    )}
                                >
                                    {menu.name}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default AdminSideBar
