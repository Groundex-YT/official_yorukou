import React, { useCallback } from 'react'
import { ModalProps } from './ProfileModal'
import { motion } from 'framer-motion'
import { Button, PopInVariant } from './EditProfilesModal'
import Image from 'next/image'
import { Profile, useDeleteProfile } from '@/hooks/useProfiles'
import { useUser } from '@/context/AuthenticationContextProvider'
import { toast } from 'react-toastify'

const DeletionWarningModal: React.FC<ModalProps> = ({ activeMenu, back }) => {
    const { User, setUser } = useUser()

    const { mutate: DeleteProfile, error: DeleteError } = useDeleteProfile(
        User!,
        `${(activeMenu?.data as Profile).id!}`,
        setUser
    )

    const handleProfileDeletion = useCallback(() => {
        DeleteProfile()
        ;[...new Array(2)].map(() => {
            back?.()
        })
        toast.success(
            `${
                (activeMenu?.data as Profile).username
            } profile is off the account!!`
        )
    }, [DeleteProfile, activeMenu?.data, back])

    return (
        <motion.div
            variants={PopInVariant}
            animate="animate"
            exit="exit"
            initial="initial"
            transition={{
                duration: 0.2,
            }}
            className="relative text-left text-white select-none"
        >
            <h1 className="text-[4vw]">Delete profile?</h1>
            <div className="flex py-[2em] border-y border-secondary gap-[1.5vw]">
                <div className="max-w-[180px] min-w-20 w-[8vw] whitespace-nowrap">
                    <div className="max-w-[180px] min-w-20 w-[8vw] h-[8vw] relative rounded overflow-hidden">
                        <Image
                            className="w-full h-full object-cover"
                            src={(activeMenu?.data as Profile).avatar!}
                            width={160}
                            height={230}
                            alt="avatar"
                        />
                    </div>
                    <div className="mt-[0.6em] cut-word-one overflow-hidden text-center text-[1.3vw] text-secondary-200">
                        {(activeMenu?.data as Profile).username!}
                    </div>
                </div>
                <div className="w-[25vw] flex items-center text-initial text-[1.1vw] leading-tight">
                    {`This profile's history — including My List, ratings and
                        activity — will be gone forever, and you won't be able
                        to access it again.`}
                </div>
            </div>
            <Button
                onClick={() => back?.()}
                className="mt-[2em] mb-[1em] mr-5 !text-[1.2vw] font-bold border-white bg-white !text-black hover:bg-primary hover:!border-primary hover:!text-slate-100"
            >
                Keep profile
            </Button>
            <Button
                onClick={handleProfileDeletion}
                className="mt-[2em] mb-[1em] mr-5 !text-[1.2vw] font-medium"
            >
                Delete profile
            </Button>
        </motion.div>
    )
}

export default React.memo(DeletionWarningModal)
