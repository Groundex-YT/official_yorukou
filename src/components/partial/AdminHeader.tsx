import { useUser } from '@/context/AuthenticationContextProvider'
import useSearchModal from '@/hooks/useSearchModal'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback } from 'react'
import { IoSearch } from 'react-icons/io5'
import { MdOutlineMenu } from 'react-icons/md'

const AdminHeader = () => {
    const { User } = useUser()
    const { openModal } = useSearchModal()

    const handleOpenEditSearch = useCallback(() => {
        openModal()
    }, [openModal])

    return (
        <div className="w-full bg-secondary fixed top-0 z-50">
            <div className="max-w-[1920px] w-full px-7 py-2.5 m-auto flex items-center justify-between">
                <div className="flex items-center justify-center gap-[1em]">
                    <button className="outline-none focus:outline-none p-1.5 text-[1.3vw] border-2 border-[#e2e8f00d] rounded-md">
                        <MdOutlineMenu />
                    </button>

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
                <div className="flex items-center justify-end select-none gap-[1em]">
                    <button
                        onClick={handleOpenEditSearch}
                        className="duration-300 px-1.5 outline-none focus:outline-none h-9 rounded-lg min-w-[160px] border border-[#e2e8f00d] flex items-center shadow-dind bg-[#26262D]  hover:bg-[#2e2e36] gap-1.5"
                    >
                        <label className="text-base max-md:text-xl text-gray-400">
                            <IoSearch />
                        </label>
                        <h1 className="text-gray-400 text-sm">Search...</h1>
                    </button>
                    <button className="duration-300 outline-none focus:outline-none w-9 h-9 rounded-lg border border-[#e2e8f00d] flex items-center justify-center hover:bg-[rgba(31,38,46,0.4)]">
                        <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center">
                            {User?.username[0]}
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AdminHeader
