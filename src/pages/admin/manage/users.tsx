/* eslint-disable react-hooks/rules-of-hooks */
import classNames from 'classnames'
import React, { useState } from 'react'
import { IoSearch } from 'react-icons/io5'
import { MdOutlineEditNote } from 'react-icons/md'

const Sorts: string[] = ['View all', 'General', 'Admin', 'Editor']

const check = (e: number) => {
    let className: string = 'left-[4px]'

    switch (e) {
        case 0:
            className = 'left-[4px]'
            break
        case 1:
            className = 'left-[74px]'
            break
        case 2:
            className = 'left-[144px]'
            break
        case 3:
            className = 'left-[214px]'
            break
    }

    return className
}

const users = () => {
    const [selectedTab, setSelectedTab] = useState<number>(0)
    const [enableSearch, setEnableSearch] = useState<boolean>(false)

    const handleTabSelect = (index: number) => {
        setSelectedTab(index)
    }

    return (
        <div className="select-none pl-[240px] w-full flex items-center mt-40">
            <div className="max-w-[1670px] w-full px-20 py-10">
                <h1 className="text-xl font-light text-slate-200">
                    All users {'(12,050)'}
                </h1>
                <div className="flex mt-3 items-center justify-between">
                    <div className="flex items-center justify-center">
                        <div className="relative h-[30px] bg-2n2 rounded-sm flex">
                            {Sorts.map((sort, index) => (
                                <button
                                    key={index}
                                    className={classNames(
                                        'duration-300 w-[70px] h-full outline-none focus:outline-none bg-transparent text-xs cursor-pointer z-[21]',
                                        index === selectedTab
                                            ? 'text-slate-200'
                                            : 'text-gray-400'
                                    )}
                                    onClick={() => handleTabSelect(index)}
                                >
                                    {sort}
                                </button>
                            ))}
                            <div
                                className={classNames(
                                    'duration-300 absolute top-[4px] w-[62px] h-[22px] rounded-sm bg-secondary shadow-[0px_2px_4px_rgba(0,0,0,0.18)]',
                                    check(selectedTab)
                                )}
                            ></div>
                        </div>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                        <div
                            onClick={() => setEnableSearch(true)}
                            className={classNames(
                                'duration-300 px-1.5 outline-none focus:outline-none h-[30px] rounded-sm border border-[#e2e8f00d] flex items-center shadow-dind bg-[#26262D]  hover:bg-[#2e2e36] gap-1.5',
                                enableSearch ? 'min-w-[160px]' : 'min-w-auto'
                            )}
                        >
                            <label className="text-base max-md:text-xl text-gray-400 cursor-pointer">
                                <IoSearch />
                            </label>
                            <input
                                className={classNames(
                                    'duration-300 text-gray-400 text-sm outline-none focus:outline-none border-0 bg-transparent w-full',
                                    enableSearch ? 'block' : 'hidden'
                                )}
                                placeholder="Search..."
                            />
                        </div>
                        <button
                            // onClick={handleOpenEditSearch}
                            className="duration-300 px-1.5 outline-none focus:outline-none h-[30px] rounded-sm border border-[#e2e8f00d] flex items-center shadow-dind bg-[#26262D]  hover:bg-[#2e2e36] gap-1.5"
                        >
                            <label className="text-base max-md:text-xl text-gray-400 cursor-pointer">
                                <MdOutlineEditNote />
                            </label>
                            <h1 className="text-xs text-gray-400">
                                Select all
                            </h1>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

users.getAdminLayout = users

export default users
