import React, {
    ChangeEvent,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react'
import { Variants, motion } from 'framer-motion'
import Image from 'next/image'
import { ModalProps } from './ProfileModal'
import { Profile, useDeleteProfile } from '@/hooks/useProfiles'
import { IoMdArrowDropdown } from 'react-icons/io'
import EditPen from '@/icons/EditPen'
import classNames from 'classnames'
import { useUser } from '@/context/AuthenticationContextProvider'

export const PopInVariant: Variants = {
    initial: { opacity: 0, scale: 1.2 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.2 },
}

const EditProfilesModal: React.FC<ModalProps> = ({
    activeMenu,
    back,
    setMenu,
}) => {
    const [textValue, setTextValue] = useState<string>(
        (activeMenu?.data as Profile).username!
    )
    const [boutValue, setBoutValue] = useState<string>('')

    const handleTextInputOnChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/

            let value: string = ''

            for (let i = 0; i < e.target.value.length; i++) {
                if (!format.test(e.target.value[i])) {
                    value = value + e.target.value[i]
                }
            }

            setTextValue(value)
        },
        []
    )

    const handleBoutInputOnChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.value.length <= 16) {
                setBoutValue(e.target.value)
            }
        },
        []
    )

    const handleDeleteBtn = useCallback(() => {
        setMenu?.(
            'delete-warning',
            'Deletion Warning',
            activeMenu?.data as Profile
        )
    }, [activeMenu?.data, setMenu])

    const HandleProfileBtn = useCallback(() => {
        setMenu?.(
            'profile-selection',
            'Select your profile avatar',
            activeMenu?.data as Profile
        )
    }, [activeMenu?.data, setMenu])

    return (
        <motion.div
            variants={PopInVariant}
            animate="animate"
            exit="exit"
            initial="initial"
            transition={{
                duration: 0.4,
                delay: 0.4,
            }}
            className="relative mt-52 text-left text-white select-none"
        >
            <h1 className="text-[4vw]">Edit profile</h1>
            <div className="flex py-[2em] border-y border-secondary gap-[1.5vw]">
                <div className="max-w-[180px] min-w-20 w-[8vw] whitespace-nowrap">
                    <div className="min-w-20 w-[8vw] h-[8vw] relative rounded overflow-hidden">
                        <Image
                            className="w-full h-full object-cover"
                            src={(activeMenu?.data as Profile).avatar!}
                            width={160}
                            height={230}
                            alt="avatar"
                        />
                        <button
                            onClick={HandleProfileBtn}
                            className="absolute bottom-[7%] left-[7%]"
                        >
                            <EditPen
                                style={{
                                    filter: 'drop-shadow(1px 1px 2px #000)',
                                }}
                                className="bg-[rgba(0,0,0,.7)] max-w-11 max-h-11 rounded-[5rem] w-8 h-8 overflow-visible"
                            />
                        </button>
                    </div>
                </div>
                <div className="max-w-[500px]">
                    <EditText
                        onChange={handleTextInputOnChange}
                        value={textValue}
                    />
                    <div className="flex flex-col">
                        <div className="mt-4 text-left">
                            <h1 className="text-secondary-200 text-[1.3vw] mb-2 mt-5">
                                Language:
                            </h1>
                            <LanguageDropdowMenu />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="mt-6 text-lef">
                            <h1 className="text-secondary-200 text-[1.3vw] mb-2">
                                About me:
                            </h1>
                            <p className="text-[1vw] text-slate-100 py-6 leading-[1.2]">
                                {
                                    "Your handle is a unique name that you'll use when playing with other Netflix members across all Netflix Games."
                                }
                            </p>
                            <EditText
                                onChange={handleBoutInputOnChange}
                                value={boutValue}
                                placeholder="About me"
                            />
                            <div>
                                <p className="text-right text-[1vw]">
                                    {`${boutValue.length}/16`}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-[1.5vw] pt-[1.5vw] text-[1vw] border-t border-secondary">
                        <h1 className="text-secondary-200 text-[1.3vw] mb-2">
                            Maturity settings:
                        </h1>
                        <div>
                            <ul className="py-2.5">
                                <li className="inline-block bg-secondary rounded-sm px-2.5 py-1.5 font-medium">
                                    All maturity ratings
                                </li>
                            </ul>
                            <p className="py-2.5">
                                Show titles of <b>all maturity ratings</b> for
                                this profile.
                            </p>
                        </div>
                        <Button>
                            {(activeMenu?.data as Profile).adult
                                ? 'Disable'
                                : 'Enable'}
                        </Button>
                    </div>
                    <div className="mt-[1.5vw] pt-[1.5vw] text-[1vw] border-t border-secondary">
                        <h1 className="text-secondary-200 text-[1.3vw] mb-2">
                            Auto-play controls
                        </h1>
                    </div>
                </div>
            </div>
            <Button className="mt-[2em] mb-[1em] mr-5 !text-[1.2vw] font-bold border-white bg-white !text-black hover:bg-primary hover:!border-primary hover:!text-slate-100">
                Save
            </Button>
            <Button
                onClick={() => back?.()}
                className="mt-[2em] mb-[1em] mr-5 !text-[1.2vw] font-medium"
            >
                Cancel
            </Button>
            <Button
                onClick={handleDeleteBtn}
                className="mt-[2em] mb-[1em] mr-5 !text-[1.2vw] font-medium"
            >
                Delete profile
            </Button>
        </motion.div>
    )
}

const EditText: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
    ...restProps
}) => {
    return (
        <div className="w-full bg-secondary relative">
            <input
                type="text"
                className="w-full text-[1.3vw] text-slate-100 bg-transparent outline-none border-0 px-[.65em] py-[.3em]"
                {...restProps}
            />
        </div>
    )
}

const LanguageDropdowMenu = ({ ...restProps }) => {
    const menuRef = useRef<HTMLDivElement>(null)
    const [isOpen, setIsOpen] = useState<boolean>(false)

    useEffect(() => {
        const docuFunc = (e: MouseEvent) => {
            //@ts-ignore
            if (e.target.contains(menuRef.current)) {
                if (isOpen) {
                    setIsOpen(false)
                }
            }
        }

        document.addEventListener('click', docuFunc)

        return () => {
            document.removeEventListener('click', docuFunc)
        }
    }, [isOpen])

    const handleOnClick = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            setIsOpen(!isOpen)
        },
        [isOpen]
    )

    return (
        <div className="w-full relative">
            <div
                onClick={handleOnClick}
                className="bg-black cursor-pointer hover:bg-secondary border border-[hsla(0,0%,100%,.9)] h-[2.5rem] relative pl-2.5 pr-[50px] leading-10 inline-block text-slate-100 font-bold text-xl"
            >
                English
                <IoMdArrowDropdown className="absolute top-2/4 -translate-y-2/4 right-2.5" />
            </div>
            {isOpen && (
                <div
                    ref={menuRef}
                    className="absolute text-sm bg-black/50 border border-[hsla(0,0%,100%,.15)]"
                >
                    <ul className="py-1.5">
                        <li className="leading-[24px] pl-2.5 pr-5 py-[1px] hover:underline cursor-pointer">
                            {'English (en)'}
                        </li>
                    </ul>
                </div>
            )}
        </div>
    )
}

export const Button: React.FC<
    React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ className, children, ...restProps }) => {
    return (
        <button
            {...restProps}
            className={classNames(
                'text-[1vw] my-[1em] border border-secondary-200 px-[1.8vw] py-[0.37vw] hover:text-slate-100 text-secondary-200 hover:border-slate-100',
                className
            )}
        >
            {children}
        </button>
    )
}

export default React.memo(EditProfilesModal)
