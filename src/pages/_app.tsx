import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import BaseLayout from '@/components/layout'
import { ToastContainer } from 'react-toastify'
import NProgress from 'nprogress'
import React, { useEffect } from 'react'
import Script from 'next/script'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import SearchModal from '@/components/shared/SearchModal'

import 'react-toastify/dist/ReactToastify.css'
import AuthenticationContextProvider from '@/context/AuthenticationContextProvider'
import { Router, useRouter } from 'next/router'
import { GA_TRACKING_ID, pageview } from '@/lib/NYC'
import useSearchModal from '@/hooks/useSearchModal'
import AdminBaseLayout from '@/components/layout/admin'

NProgress.configure({ showSpinner: false })

Router.events.on('routeChangeStart', NProgress.start)
Router.events.on('routeChangeComplete', NProgress.done)
Router.events.on('routeChangeError', NProgress.done)

interface AppPropsExtended extends AppProps {
    err: any
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            retry: 1,
        },
    },
})

export default function App({
    Component,
    pageProps,
    router,
    err,
}: AppPropsExtended) {
    const { isOpen, closeModal } = useSearchModal()
    const { asPath, query, replace, push } = useRouter()

    const getLayout =
        // @ts-ignore
        Component.getLayout ||
        //@ts-ignore
        (Component.getAdminLayout &&
            ((page: React.ReactNode) => (
                <AdminBaseLayout>{page}</AdminBaseLayout>
            ))) ||
        ((page: React.ReactNode) => <BaseLayout>{page}</BaseLayout>)

    useEffect(() => {
        const handleRouteChange = (url: string) => {
            pageview(url)
        }

        router.events.on('routeChangeComplete', handleRouteChange)

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [router.events])

    return (
        <React.Fragment>
            <script id="syncData" type="application/json"></script>

            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />

            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GA_TRACKING_ID}', {
                    page_path: window.location.pathname,
                  });
               `}
            </Script>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
                className={'absolute'}
                theme="dark"
                // toastClassName={(context) =>
                //     contextClass[context?.type || 'default'] +
                //     ' relative flex p-1 min-h-16 rounded-md justify-between overflow-hidden cursor-pointer'
                // }
            />

            <QueryClientProvider client={queryClient}>
                <AuthenticationContextProvider>
                    {getLayout(<Component {...pageProps} err={err} />)}
                    {process.env.NODE_ENV === 'development' && (
                        <ReactQueryDevtools />
                    )}
                    <SearchModal visible={isOpen} onClose={closeModal} />
                </AuthenticationContextProvider>
            </QueryClientProvider>
        </React.Fragment>
    )
}
