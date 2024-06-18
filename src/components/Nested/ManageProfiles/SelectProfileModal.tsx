import { motion } from 'framer-motion'
import React, { useCallback, useEffect, useState } from 'react'
import { PopInVariant } from './EditProfilesModal'
import { IoArrowBack } from 'react-icons/io5'
import Image from 'next/image'
import { ModalProps } from './ProfileModal'
import { Profile } from '@/hooks/useProfiles'
import { TiPencil } from 'react-icons/ti'
import EditPen from '@/icons/EditPen'
import { useUser } from '@/context/AuthenticationContextProvider'
import NestedMenuUpload from '@/components/Nested/UploadProfileAvatars'
import classNames from 'classnames'
import { debounce } from '@/utils'

const SelectProfileModal: React.FC<ModalProps> = ({ activeMenu, back }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const { User } = useUser()

    return (
        <div className="relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden z-50 select-none">
            <motion.div
                variants={PopInVariant}
                animate="animate"
                exit="exit"
                initial="initial"
                transition={{
                    duration: 0.2,
                }}
                className="absolute left-0 right-0 bg-[hsla(228,11%,9%,.9)] max-w-[1370px] w-full m-[0_auto_1vw] top-[7vw] p-[0_4vw_1vw_0] flex justify-between items-center"
            >
                <div className="flex items-center gap-[30px]">
                    <button
                        onClick={() => back?.()}
                        className="outline-none border-0 focus:outline-none focus:border-0 bg-transparent text-[3vw]"
                    >
                        <IoArrowBack />
                    </button>
                    <div className="flex flex-col leading-[1.2] ">
                        <h1 className="text-[2.5vw] font-medium text-slate-100 lg:text-[37.7px]">
                            Edit profile
                        </h1>
                        <h2 className="text-[2vw] font-medium text-slate-100 lg:text-[30px]">
                            Choose your profile avatar.
                        </h2>
                    </div>
                </div>
                <div className="flex items-center gap-5">
                    <div className="flex flex-col items-end text-right">
                        <h1 className="max-w-[20vw] cut-word-one overflow-hidden text-[30px]">
                            {(activeMenu?.data as Profile).username!}
                        </h1>
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
                                onClick={() => setIsOpen(true)}
                                className="text-right"
                            >
                                <EditPen
                                    style={{
                                        filter: 'drop-shadow(1px 1px 2px #000)',
                                    }}
                                    className="bg-[rgba(0,0,0,.7)] max-w-11 max-h-11 rounded-[5rem] w-8 h-8 overflow-visible"
                                />
                            </button>
                        ) : null}
                    </div>
                    <motion.div
                        variants={{
                            initial: { opacity: 0, scale: 0.6 },
                            animate: { opacity: 1, scale: 1 },
                            exit: { opacity: 0, scale: 0.6 },
                        }}
                        animate="animate"
                        exit="exit"
                        initial="initial"
                        transition={{
                            duration: 0.3,
                        }}
                        className="w-[6vw] h-[6vw] max-h-[90px] min-h-[40px] max-w-[90px] min-w-[40px] bg-primary relative rounded-md overflow-hidden shadow-button"
                    >
                        <Image
                            className="w-full h-full object-cover"
                            src={(activeMenu?.data as Profile).avatar!}
                            width={160}
                            height={230}
                            alt="avatar"
                        />
                    </motion.div>
                </div>
            </motion.div>
            <motion.div
                variants={PopInVariant}
                animate="animate"
                exit="exit"
                initial="initial"
                transition={{
                    duration: 0.2,
                }}
                className="flex mt-[9vw] max-w-[1370px] w-full py-[7vw] overflow-hidden"
            >
                <div className="w-full max-h-full">Hello</div>
            </motion.div>
            {isOpen && (
                <motion.div
                    variants={{
                        initial: { opacity: 0 },
                        animate: { opacity: 1 },
                        exit: { opacity: 0 },
                    }}
                    animate="animate"
                    exit="exit"
                    initial="initial"
                    className={classNames(
                        `duration-300 fixed inset-0 z-50 bg-[hsla(0,0%,8%,.9)] backdrop-blur-sm text-white p-[12vh] flex items-center justify-center`
                    )}
                >
                    <NestedMenuUpload setIsOpen={setIsOpen} isOpen={isOpen} />
                </motion.div>
            )}
        </div>
    )
}

export default React.memo(SelectProfileModal)
