import React from 'react'
import Footer from './Footer'
import Header from './Header'

import { Roboto } from 'next/font/google'
import { useUser } from '@/context/AuthenticationContextProvider'

const inter = Roboto({
    weight: ['100', '300', '400', '500', '700', '900'],
    subsets: ['latin'],
})

interface BaseLayoutProps {
    showHeader?: boolean
    showFooter?: boolean
    children?: React.ReactNode
}

const BaseLayout: React.FC<BaseLayoutProps> = ({
    children,
    showFooter = true,
    showHeader = true,
}) => {
    const { Loading } = useUser()

    return (
        <main className={`text-white w-screen h-screen ${inter.className}`}>
            {showHeader && <Header />}

            {children}

            {showFooter && <Footer />}

            {/* {Loading && (
                <div className="fixed top-0 w-full h-full flex items-center justify-center z-50">
                    <div className="relative flex justify-center items-center">
                        <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-primary"></div>
                        <img
                            src="/person.svg"
                            className="rounded-full h-28 w-28"
                        />
                    </div>
                </div>
            )} */}
        </main>
    )
}

export default BaseLayout
