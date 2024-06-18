import { useUser } from '@/context/AuthenticationContextProvider'
import useSearchModal from '@/hooks/useSearchModal'
import classNames from 'classnames'
import React, { useCallback } from 'react'
import { IoSearch } from 'react-icons/io5'

const Header = () => {
    const { User } = useUser()
    const { openModal } = useSearchModal()

    const handleOpenEditSearch = useCallback(() => {
        openModal()
    }, [openModal])

    return (
        <div className="select-none fixed w-full flex items-center justify-center z-50">
            <div className="duration-300 max-w-[1560px] w-full px-5 py-10 md1:py-5 md2:py-3 flex items-center justify-between">
                <div className="duration-300 flex items-center gap-5 md2:-translate-x-[300px]">
                    <div className="duration-300 relative w-20 h-20 md1:w-14 md1:h-14 md2:w-10 md2:h-10 grid grid-cols-[40%_1fr] bg-main_dark rounded-full overflow-hidden">
                        <div className="w-full h-full"></div>
                        <div className="w-full h-full bg-primary"></div>
                        <div className="duration-300 absolute w-[75px] h-[75px] md1:w-[52px] md1:h-[52px] bg-2n2 top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 rounded-full flex items-center justify-center">
                            <div className="duration-300 outline-none cursor-pointer focus:outline-none w-14 h-14 md1:w-10 md1:h-10 md2:w-8 md2:h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-[rgba(31,38,46,0.4)]">
                                <h1 className="text-slate-100 text-[.9vw] font-bold">
                                    {User?.username[0]}
                                </h1>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-start">
                        <h1 className="duration-300 text-xl md2:text-sm font-medium text-slate-200">
                            Welcome Back,{' '}
                            <span className="font-light text-gray-400">
                                {User?.username} 👋
                            </span>
                        </h1>
                        <h2 className="capitalize text-sm duration-300 md2:text-xs text-gray-600">
                            {User?.role}
                        </h2>
                    </div>
                </div>
                <div className="flex items-center">
                    <button
                        onClick={handleOpenEditSearch}
                        className={classNames(
                            'duration-300 px-1.5 outline-none focus:outline-none h-9 md2:h-8 rounded-lg min-w-[160px] md2:min-w-[auto] border border-[#e2e8f00d] flex items-center shadow-dind bg-[#26262D]  hover:bg-[#2e2e36] gap-1.5'
                        )}
                    >
                        <label className="text-base max-md:text-xl text-gray-400">
                            <IoSearch />
                        </label>
                        <h1 className="text-gray-400 md2:hidden text-sm">
                            Search...
                        </h1>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Header
