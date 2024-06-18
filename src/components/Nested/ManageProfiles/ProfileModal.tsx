import React, { Fragment, useCallback, useEffect } from 'react'
import { motion, Variants } from 'framer-motion'
import useProfiles, { Profile } from '@/hooks/useProfiles'
import { useUser } from '@/context/AuthenticationContextProvider'
import Image from 'next/image'
import { IoAddCircleSharp } from 'react-icons/io5'
import { TiPencil } from 'react-icons/ti'
import Link from 'next/link'
import { PopInVariant } from '@/pages/profiles'
import { Menu } from '@/components/shared/NestedMenu'

export interface ModalProps {
    setMenu?: (menuKey: string, title: string, data: any) => void
    activeMenu?: Menu
    back?: () => void
}

const ProfileModal: React.FC<ModalProps> = ({ setMenu }) => {
    const { User } = useUser()
    const { isLoading, isError, data } = useProfiles(User!)

    const CLIENT_ID = process.env.NEXT_PUBLIC_CLINT_ID_V2

    const onCLickHandler = useCallback(
        (data: Profile) => {
            setMenu?.('edit-profile', 'Edit Profile', data)
        },
        [setMenu]
    )

    return (
        <Fragment>
            {!isLoading && !isError && (
                <motion.div
                    variants={PopInVariant}
                    animate="animate"
                    exit="exit"
                    initial="initial"
                    className="flex text-white flex-col items-center gap-[2.87em] select-none"
                    transition={{
                        duration: 0.2,
                        delay: 0.4,
                    }}
                >
                    <h2 className="text-[3.5vw] max-md:text-3xl">
                        {'Manage profiles:'}
                    </h2>
                    <div className="flex items-center gap-[2vw]">
                        {data?.map((profile, i) => (
                            <button
                                className="group min-w-[84px] max-w-[200px] w-[10vw] flex flex-col items-center gap-[0.6em]"
                                key={i}
                                onClick={() => onCLickHandler(profile)}
                            >
                                <div className="w-full max-h-[200px] min-h-[84px] h-[10vw] bg-primary relative rounded-md overflow-hidden shadow-button">
                                    <Image
                                        className="w-full h-full object-cover"
                                        src={profile.avatar!}
                                        width={160}
                                        height={230}
                                        alt="avatar"
                                    />
                                    <div className="duration-100 flex text-[2.5vw] items-center justify-center absolute bg-black/50 inset-0 border-[0.1em] border-transparent rounded-md group-hover:border-primary">
                                        <TiPencil />
                                    </div>
                                </div>
                                <h1 className="capitalize px-2.5 text-[1.3vw] text-secondary-200 group-hover:text-primary max-md:text-xs">
                                    {profile.username}
                                </h1>
                            </button>
                        ))}
                        <Link
                            href={`https://anilist.co/api/v2/oauth/authorize?client_id=${CLIENT_ID}&response_type=code`}
                        >
                            <button className="group min-w-[84px] max-w-[200px] w-[10vw] flex flex-col items-center gap-[0.6em]">
                                <div className="group/item duration-100 w-full max-h-[200px] min-h-[84px] h-[10vw] bg-transparent group-hover:bg-primary relative rounded-md overflow-hidden flex items-center justify-center text-[6.3vw] text-secondary-200">
                                    <IoAddCircleSharp className="duration-100 group-hover:text-main_dark group-hover/item:text-main_dark" />
                                </div>
                                <h1 className="capitalize px-2.5 text-[1.3vw] text-secondary-200 group-hover:text-primary max-md:text-xs">
                                    Add profile
                                </h1>
                            </button>
                        </Link>
                    </div>
                    <Link
                        className="block duration-100 mt-10 bg-white text-black border border-secondary-200 hover:bg-primary text-[1.1vw] px-[1.8vw] py-[0.37vw] hover:border-primary hover:text-white"
                        href={'/profiles'}
                    >
                        Finish
                    </Link>
                </motion.div>
            )}
        </Fragment>
    )
}

export default React.memo(ProfileModal)
