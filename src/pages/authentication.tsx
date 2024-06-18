import React, {
    HTMLInputTypeAttribute,
    HtmlHTMLAttributes,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react'
import { GetStaticProps, NextPage, NextPageContext } from 'next'
import Head from '@/components/shared/Head'
import { HiMiniUserCircle } from 'react-icons/hi2'
import { BsImages } from 'react-icons/bs'
import Image from 'next/image'
import classNames from 'classnames'
import Button from '@/components/shared/Button'
import { toast } from 'react-toastify'
import { motion, Variants } from 'framer-motion'
import axios from 'axios'
import { useRouter } from 'next/router'
import { getUser } from '@/api/anilist'
import { IoClose } from 'react-icons/io5'
import { useUser } from '@/context/AuthenticationContextProvider'
import PageLoader from '@/components/shared/PageLoader'

const emailValidator = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

export const slideUp: Variants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
}

const Authentication = () => {
    const [username, setUserName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [userData, setUserData] = useState<any>()
    const [loading, setLoading] = useState<boolean>(true)

    const [isNext, setIsNext] = useState<boolean>(false)
    const [isPrev, setIsPrev] = useState<boolean>(false)
    const [form, setForm] = useState<number>(0)
    const [page, setPage] = useState<string>('login')
    const { asPath, query, replace, push } = useRouter()
    const { User, Loading } = useUser()

    const CLIENT_ID = process.env.NEXT_PUBLIC_CLINT_ID
    const CLIENT_SECRET = process.env.NEXT_PUBLIC_CLINT_SECRECT

    const fileRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (User) push('/profiles', undefined, { shallow: true })
    }, [User, push])

    useEffect(() => {
        if (query['code']) {
            setForm(1)
            const getTokenForAnilist = async () => {
                try {
                    const res = await axios(
                        `http://localhost:5000/api/v1/auth/token`,
                        {
                            method: 'POST',
                            data: {
                                client_id: CLIENT_ID,
                                client_secret: CLIENT_SECRET,
                                redirect_uri:
                                    'http://localhost:3000/authentication',
                                code: `${query['code']}`,
                            },
                        }
                    )

                    let data = res?.data

                    const ACCESS_TOKEN = data?.access_token

                    setLoading(true)

                    const getUserData = await getUser(true, ACCESS_TOKEN)

                    setUserData({ ...getUserData, token: ACCESS_TOKEN })

                    setLoading(false)
                    setIsNext(true)
                } catch (err) {
                    //@ts-ignore
                    toast.error(err.message)
                    replace('/authentication', undefined, { shallow: true })
                    return null
                }
            }

            getTokenForAnilist()
        }
    }, [CLIENT_ID, CLIENT_SECRET, query, replace])

    const usernameHandler = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setUserName(e.target.value)
        },
        []
    )

    const emailHandler = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value)
        },
        []
    )

    const passwordHandler = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value)
        },
        []
    )

    useEffect(() => {
        if (page === 'register') {
            if (!username || username.length <= 0) {
                return setIsNext(false)
            }
        }

        if (!password || password.length <= 6) {
            return setIsNext(false)
        }

        if (!email || email.length <= 0) {
            return setIsNext(false)
        }

        if (!email.match(emailValidator)) {
            return setIsNext(false)
        }

        return setIsNext(true)
    }, [username, email, password])

    const firstStep = useCallback(async () => {
        const apiChecker = axios('http://localhost:5000/api/v1/auth/checker', {
            method: 'POST',
            data: {
                username,
                email,
                password,
            },
        })

        toast.promise(apiChecker, {
            pending: {
                render() {
                    return 'Please wait just a momemt.'
                },
            },
            success: {
                render: () => {
                    setForm(1)
                    setIsNext(false)
                    setIsPrev(true)
                    localStorage.setItem(
                        'log',
                        JSON.stringify({
                            username,
                            email: email.toLocaleLowerCase(),
                            password,
                        })
                    )
                    return 'Great! one more step!!'
                },
            },
            error: {
                render({ data }) {
                    return (data as any).response.data.msg
                },
            },
        })
    }, [email, password, username])

    const finalStep = useCallback(async () => {
        const apiChecker = axios('http://localhost:5000/api/v1/auth/register', {
            method: 'POST',
            data: {
                username,
                email,
                password,
                profile: {
                    userId: `${userData?.id}`,
                    username: userData?.username,
                    avatar: userData?.avatar,
                    bg: userData?.bg,
                    isAdult: userData?.adult,
                    accessToken: userData?.token,
                },
            },
        })

        toast.promise(apiChecker, {
            pending: {
                render() {
                    return 'Please wait while we finalise your registration.'
                },
            },
            success: {
                render: ({ data }) => {
                    localStorage.removeItem('log')
                    push('/', undefined)
                    return 'Successfully registered 😁'
                },
            },
            error: {
                render({ data }) {
                    return (data as any).response.data.msg
                },
            },
        })
    }, [email, password, username, userData])

    const login = useCallback(async () => {
        const apiChecker = axios('http://localhost:5000/api/v1/auth/login', {
            method: 'POST',
            data: {
                email,
                password,
            },
            withCredentials: true,
        })

        toast.promise(apiChecker, {
            pending: {
                render() {
                    return 'Please wait while we finalise your request'
                },
            },
            success: {
                render: ({ data }) => {
                    localStorage.setItem('justlogged', 'true')
                    push('/profiles', undefined)
                    return 'Successfully logged in 😁'
                },
            },
            error: {
                render({ data }) {
                    return (data as any).response.data.msg
                },
            },
        })
    }, [email, password])

    const onSubmitHandler = useCallback(async () => {
        if (form === 0) {
            if (page === 'register') {
                return await firstStep()
            } else {
                return await login()
            }
        } else if (form === 1) {
            let loggedData = localStorage.getItem('log')
            if (!loggedData) {
                setUserName('')
                setEmail('')
                setPassword('')

                setForm(0)
                setIsNext(false)
                replace('/authentication', undefined, { shallow: true })
                return toast.error(`Resistration failed try again.`)
            }

            const logData = JSON.parse(loggedData)
            setUserName(logData.username)
            setEmail(logData.email)
            setPassword(logData.password)

            await finalStep()
        }
    }, [finalStep, firstStep, form, replace])

    const onPrevHandler = useCallback(() => {
        if (form > 0) {
            if (form === 1) {
                setForm(0)

                let value = localStorage.getItem('log')
                if (!value) return
                let newData = JSON.parse(value)
                setUserName(newData.username)
                setEmail(newData.email)
                setPassword(newData.password)
            } else if (form === 2) {
                setForm(1)
            }
        }
    }, [form])

    useEffect(() => {
        if (form > 0) {
            return setIsPrev(true)
        } else {
            setIsPrev(false)
        }
    }, [form])

    if (Loading || !User) {
        return <PageLoader />
    }

    return (
        <React.Fragment>
            <Head title="Register" />
            {!Loading && (
                <main className="w-screem h-screen flex items-center justify-center">
                    <div className="grid max-w-[1078px] w-full grid-cols-[171px_1fr] max-sm:grid-cols-1 max-h-[529px] h-full px-20 max-sm:px-10">
                        <div className="flex justify-center w-5 h-full max-sm:hidden">
                            <div className="relative w-1 h-full rounded-sm bg-secondary">
                                <div className="w-full h-1/3 bg-primary rounded-sm"></div>
                                <div className="absolute top-1/3 -mt-2.5 left-2/4 w-5 h-5 bg-primary rounded-full -translate-x-2/4 flex items-center justify-center">
                                    <span className="w-2.5 h-2.5 bg-secondary rounded-full"></span>
                                </div>
                                <div className="absolute top-2/3 -mt-2.5 left-2/4 w-5 h-5 bg-secondary rounded-full -translate-x-2/4 flex items-center justify-center">
                                    <span className="w-2.5 h-2.5 bg-unknown rounded-full"></span>
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-full flex flex-col justify-between">
                            <div>
                                <Image
                                    src={'/Logo.png'}
                                    className="h-10 w-auto mt-6 select-none"
                                    alt="Logo"
                                    width={166}
                                    height={60}
                                />
                            </div>

                            {form === 0 && (
                                <motion.div
                                    variants={slideUp}
                                    transition={{ duration: 0.2 }}
                                    animate="animate"
                                    exit="exit"
                                    initial="initial"
                                    key={page}
                                    className="duration-300 max-w-[324px] max-sm:max-w-full w-full mt-[72px] flex flex-col"
                                >
                                    <button
                                        className="group relative w-[70px] h-[70px]"
                                        onClick={() => {
                                            fileRef.current?.click()
                                        }}
                                    >
                                        <div className="absolute inset-0 bg-primary rounded-full flex items-center justify-center opacity-0 duration-300 group-hover:opacity-100">
                                            <BsImages className="w-10 h-10 text-secondary" />
                                        </div>
                                        <HiMiniUserCircle className="w-full h-full text-secondary" />
                                        <input
                                            ref={fileRef}
                                            className="hidden"
                                            type="file"
                                            src=""
                                        />
                                    </button>
                                    <form
                                        className="w-full mt-10 flex flex-col gap-2.5"
                                        action="#"
                                        autoComplete="off"
                                    >
                                        {page === 'register' && (
                                            <TextField
                                                className="font-bold"
                                                label="Name"
                                                autoComplete="false"
                                                onChange={usernameHandler}
                                                value={username}
                                            />
                                        )}
                                        <TextField
                                            className="font-bold"
                                            label="Email"
                                            type="email"
                                            autoComplete="false"
                                            onChange={emailHandler}
                                            value={email}
                                        />
                                        <TextField
                                            className="font-bold"
                                            label="Password"
                                            type="password"
                                            autoComplete="false"
                                            onChange={passwordHandler}
                                            value={password}
                                        />
                                        <p className="mt-1.5 text-sm text-secondary font-medium w-full text-right">
                                            {page === 'login'
                                                ? "Don't have an account?"
                                                : 'Already have an account?'}{' '}
                                            <span
                                                onClick={() => {
                                                    if (page === 'login') {
                                                        setPage('register')
                                                    } else {
                                                        setPage('login')
                                                    }
                                                }}
                                                className="outline-none border-0 text-primary font-bold cursor-pointer"
                                            >
                                                {page === 'login'
                                                    ? 'Sign Up'
                                                    : 'Sign In'}
                                            </span>
                                        </p>
                                    </form>
                                </motion.div>
                            )}
                            {form === 1 && !query['code'] && (
                                <motion.div
                                    variants={slideUp}
                                    transition={{ duration: 0.2 }}
                                    animate="animate"
                                    exit="exit"
                                    initial="initial"
                                    className="duration-300 max-w-full max-sm:max-w-full w-full mt-[72px] flex flex-col"
                                >
                                    <div className="w-full flex justify-center">
                                        <a
                                            href={`https://anilist.co/api/v2/oauth/authorize?client_id=${CLIENT_ID}&response_type=code`}
                                            rel="noopener noreferrer"
                                        >
                                            <div className="w-20 h-20 border-2 border-secondary flex items-center justify-center rounded-full">
                                                <Image
                                                    src={'/anilist-logo.svg'}
                                                    className="h-10 w-auto select-none"
                                                    alt="anilist logo"
                                                    width={60}
                                                    height={60}
                                                />
                                            </div>
                                        </a>
                                    </div>
                                </motion.div>
                            )}

                            {form === 1 && query['code'] && (
                                <motion.div
                                    variants={slideUp}
                                    transition={{ duration: 0.2 }}
                                    animate="animate"
                                    exit="exit"
                                    initial="initial"
                                    className="duration-300 max-w-full max-sm:max-w-full w-full mt-[72px] flex flex-col"
                                >
                                    <div className="w-full flex justify-center">
                                        <div className="max-w-[420px] w-full rounded-lg bg-secondary p-5">
                                            <div
                                                className={classNames(
                                                    `w-full relative bg-secondary-300 rounded-lg h-[174px] overflow-hidden`,
                                                    loading && 'animate-pulse'
                                                )}
                                            >
                                                {!loading && (
                                                    <>
                                                        {userData?.bg && (
                                                            <Image
                                                                src={
                                                                    userData?.bg
                                                                }
                                                                className="w-full h-full object-cover"
                                                                alt="thumb"
                                                                width={1920}
                                                                height={1080}
                                                            />
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                            <div className="pt-5 flex items-center justify-between">
                                                <div className="flex items-center gap-2.5">
                                                    <div
                                                        className={classNames(
                                                            `w-14 h-14 relative bg-secondary-300 rounded-full overflow-hidden`,
                                                            loading &&
                                                                'animate-pulse'
                                                        )}
                                                    >
                                                        {!loading && (
                                                            <Image
                                                                src={
                                                                    userData?.avatar
                                                                }
                                                                className="w-full h-full object-cover"
                                                                alt="thumb"
                                                                width={160}
                                                                height={230}
                                                            />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <h2 className="text-white text-base font-bold capitalize">
                                                            {userData?.username}
                                                        </h2>
                                                        <h2 className="text-secondary-200 text-xs font-bold leading-tight">
                                                            {
                                                                userData?.episodesWatched
                                                            }{' '}
                                                            - Watched episodes
                                                        </h2>
                                                    </div>
                                                </div>
                                                {loading ? (
                                                    <div className="w-10 h-10 rounded-full bg-secondary-300 animate-pulse"></div>
                                                ) : (
                                                    <div className="w-10 h-10 border-2 border-primary flex text-secondary-200 items-center justify-center rounded-full">
                                                        <IoClose />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            <div
                                className={classNames(
                                    `duration-300 mt-[72px] flex items-center justify-end`,
                                    page === 'login'
                                        ? 'justify-end'
                                        : 'justify-between'
                                )}
                            >
                                {page === 'register' && (
                                    <Button
                                        onClick={onPrevHandler}
                                        disabled={isPrev ? false : true}
                                    >
                                        Previous
                                    </Button>
                                )}
                                <Button
                                    onClick={onSubmitHandler}
                                    disabled={isNext ? false : true}
                                >
                                    {page === 'login'
                                        ? 'Sign In'
                                        : form === 1 && userData?.id
                                        ? 'Sign Up'
                                        : 'Continue'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </main>
            )}
        </React.Fragment>
    )
}

interface TextFieldProps extends React.HTMLProps<HTMLInputElement> {
    type?: React.HTMLInputTypeAttribute
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    inputClassName?: string
    label: string
}

const TextField: React.FC<TextFieldProps> = ({
    children,
    className,
    onChange,
    label,
    inputClassName,
    ...restProps
}) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [value, setValue] = useState<string>('')
    const [focus, setFocus] = useState<boolean>(false)

    const onValueChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value)

            onChange?.(e)
        },
        [onChange]
    )

    useEffect(() => {
        if (value.length <= 0) {
            setFocus(false)
        } else {
            setFocus(true)
        }
    }, [value])

    return (
        <div
            className={classNames(
                'relative cursor-text w-full text-secondary',
                className
            )}
            {...restProps}
        >
            <div className="relative pt-4 text-inherit">
                <input
                    ref={inputRef}
                    name="label"
                    onChange={onValueChange}
                    className={classNames(
                        'duration-300 peer py-1.5 outline-none border-0 bg-transparent w-full border-b-2 border-secondary',
                        inputClassName
                    )}
                    {...restProps}
                />
                <span className="duration-300 absolute inset-0 pointer-events-none before:duration-300 peer-focus:before:scale-x-100 before:scale-x-0 before:absolute before:w-full before:h-full before:border-b-2 before:border-primary"></span>
                <label
                    htmlFor={label}
                    className={classNames(
                        'absolute duration-300 left-0 pointer-events-none translate-y-[9px] peer-focus:text-primary peer-focus:-translate-y-[9px] peer-focus:text-xs',
                        focus && '!-translate-y-[9px] !text-xs'
                    )}
                >
                    {label}
                </label>
            </div>
        </div>
    )
}

// @ts-ignore
Authentication.getLayout = (page: any) => page

export default Authentication
