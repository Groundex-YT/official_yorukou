'use client'

import axios from 'axios'
import { useRouter } from 'next/router'
import React, { createContext, useContext, useEffect, useState } from 'react'

enum roles {
    admin = 'admin',
    user = 'user',
    editor = 'editor',
}

export type Profile = {
    _id: string
    userId: string
    owner: string
    avatar: string
    username: string
    bg: string
    isAdult: boolean
    accessToken: string
}

export interface IUser {
    _id: string
    username: string
    email: string
    avatar: string
    role: roles
    profiles: Profile[]
    accessToken: string
}

interface IUserResponse {
    [key: string]: IUser
}

interface IAuthenticationProps {
    User: IUser | null
    Loading: boolean
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>
}

//@ts-ignore
const AuthenticationContext = createContext<IAuthenticationProps>(null)

const AuthenticationContextProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const [user, setUser] = useState<IUser | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const router = useRouter()
    const { push, replace } = router

    useEffect(() => {
        const authHandler = async () => {
            try {
                setLoading(true)
                const res = await axios(
                    'http://localhost:5000/api/v1/auth/refresh_token',
                    {
                        method: 'GET',
                        withCredentials: true,
                    }
                )

                const { accessToken } = res.data

                const userData = await axios<IUserResponse>(
                    'http://localhost:5000/api/v1/auth/me',
                    {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                        withCredentials: true,
                    }
                )

                setUser({ ...userData.data.user, accessToken })
                setLoading(false)
            } catch (err) {
                // replace('/authentication', undefined, { shallow: true })
                setLoading(false)
            }
        }

        authHandler()
    }, [router])

    return (
        <AuthenticationContext.Provider
            value={{ User: user!, Loading: loading, setUser }}
        >
            {children}
        </AuthenticationContext.Provider>
    )
}

export const useUser = () => {
    return React.useContext(AuthenticationContext)
}

export default AuthenticationContextProvider
