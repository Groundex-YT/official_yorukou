import React, { useEffect, useState } from 'react'
import { motion, Variants } from 'framer-motion'
import useProfiles, { Profile } from '@/hooks/useProfiles'
import { useUser } from '@/context/AuthenticationContextProvider'
import Image from 'next/image'
import { IoAddCircleSharp } from 'react-icons/io5'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import { getUser } from '@/api/anilist'
import { toast } from 'react-toastify'

export const PopInVariant: Variants = {
    initial: { opacity: 0, scale: 1.2 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.2 },
}

const Profile = () => {
    const { User } = useUser()
    const { isLoading, isError, data } = useProfiles(User!)
    const [userData, setUserData] = useState<Profile>()
    const [ran, setRan] = useState<number>(0)

    const { replace, push, query, asPath } = useRouter()

    const CLIENT_ID = process.env.NEXT_PUBLIC_CLINT_ID_V2
    const CLIENT_SECRET = process.env.NEXT_PUBLIC_CLINT_SECRECT_V2

    useEffect(() => {
        if (query['code'] && User) {
            if (ran !== 0) return
            setRan(ran + 1)
            const getTokenForAnilist = async () => {
                try {
                    const res = await axios(
                        `http://localhost:5000/api/v1/auth/token`,
                        {
                            method: 'POST',
                            data: {
                                client_id: CLIENT_ID,
                                client_secret: CLIENT_SECRET,
                                redirect_uri: 'http://localhost:3000/profiles',
                                code: `${query['code']}`,
                            },
                        }
                    )

                    let data = res?.data

                    const ACCESS_TOKEN = data?.access_token

                    const getUserData = await getUser(true, ACCESS_TOKEN)

                    if (
                        User.profiles.some(
                            (e) => e.userId === `${getUserData.id}`
                        )
                    ) {
                        toast.error('User already exist within the account')
                        replace('/profiles', undefined, { shallow: true })
                        return
                    }

                    try {
                        await axios(
                            `http://localhost:5000/api/v1/profile/add`,
                            {
                                method: 'POST',
                                headers: {
                                    Authorization: `Bearer ${User.accessToken}`,
                                },
                                data: {
                                    userId: `${getUserData.id}`,
                                    username: getUserData.username,
                                    avatar: getUserData.avatar || '',
                                    bg: getUserData.bg || '',
                                    isAdult: getUserData.adult,
                                    accessToken: ACCESS_TOKEN,
                                },
                            }
                        )
                    } catch (err) {
                        //@ts-ignore
                        toast.error('Something went wrong. try again later')
                        replace('/profiles', undefined, { shallow: true })
                        return null
                    }

                    toast.success('Profile successfully added to this account')
                    replace('/profiles', undefined, { shallow: true })
                } catch (err) {
                    //@ts-ignore
                    toast.error(err?.message)
                    replace('/profiles', undefined, { shallow: true })
                    return null
                }
            }

            getTokenForAnilist()
        }
    }, [CLIENT_ID, CLIENT_SECRET, User, query, ran, replace])

    return (
        <div className="w-screem h-screen flex items-center text-white justify-center">
            {!isLoading && !isError && (
                <motion.div
                    variants={PopInVariant}
                    animate="animate"
                    exit="exit"
                    initial="initial"
                    className="flex flex-col items-center gap-[2.87em] select-none"
                    transition={{
                        duration: 0.1,
                        delay: 0.4,
                    }}
                >
                    <h2 className="text-[3.5vw] text-white max-md:text-3xl">
                        {"Who's Watching?"}
                    </h2>
                    <div className="flex items-center gap-[2vw]">
                        {data?.map((profile, i) => (
                            <button
                                className="group min-w-[84px] max-w-[200px] w-[10vw] flex flex-col items-center gap-[0.6em]"
                                key={i}
                            >
                                <div className="w-full max-h-[200px] min-h-[84px] h-[10vw] bg-primary relative rounded-md overflow-hidden shadow-button">
                                    <Image
                                        className="w-full h-full object-cover"
                                        src={profile.avatar!}
                                        width={160}
                                        height={230}
                                        alt="avatar"
                                    />
                                    <div className="duration-100 absolute inset-0 border-[0.3em] border-transparent rounded-md group-hover:border-primary"></div>
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
                        className="block duration-100 mt-10 text-secondary-200 border border-secondary-200 text-[1.1vw] px-[1.8vw] py-[0.37vw] hover:border-primary hover:text-primary"
                        href={'/profiles/manage'}
                    >
                        Manage profiles
                    </Link>
                </motion.div>
            )}
        </div>
    )
}

// @ts-ignore
Profile.getLayout = (page: any) => page

export default Profile
