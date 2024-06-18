import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'top-blend':
                    'linear-gradient(180deg,rgba(0,0,0,.32),transparent)',
                'bottom-blend':
                    'linear-gradient(180deg,transparent,rgba(0,0,0,.88))',
                'gradient-radial':
                    'linear-gradient(90deg, rgba(19,1,70,1) 0%, rgba(60,0,43,1) 100%);',
                'gradient-conic':
                    'linear-gradient(to right bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3))',
                'loader-spinner':
                    'linear-gradient(45deg, transparent, transparent 40%, #3b82f6)',
                'page-indicator':
                    'linear-gradient(90deg, rgba(0,125,255,1) 0%, rgba(33,33,39,0.053658963585434205) 20%)',
                'nav-blend':
                    'linear-gradient(180deg, rgba(31, 41, 55, 0) 0%, #141519 100%)',
                'right-blend':
                    'linear-gradient(to right, #141519 40%, #141519 10%, rgba(31, 41, 55, 0.1) 100%)',
            },
            colors: {
                primary: '#3B82F6',
                'primary-on': '#1958bf',
                secondary: '#212127',
                'secondary-500': '#0C0D10',
                main_dark: '#141519',
                unknown: 'rgba(79, 79, 88, 0.30)',
                'secondary-200': '#939393',
                'secondary-300': '#292930',
                '2n2': '#111118',
            },
            boxShadow: {
                button: `rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px`,
                'button-on': `rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px`,
                dind: `rgb(16, 20, 24) 0px -1px 1px inset, rgb(11, 13, 14) 0px 1px 0.5px;`,
            },
            textShadow: {
                sm: '0 1px 2px rgb(0 0 0/40%)',
                DEFAULT: '0 2px 4px var(--tw-shadow-color)',
                lg: '0 8px 16px var(--tw-shadow-color)',
            },
            keyframes: {
                ripple: {
                    '0%': {
                        width: '0px',
                        height: '0px',
                        opacity: '0.5',
                    },
                    '100%': {
                        width: '500px',
                        height: '500px',
                        opacity: '0',
                    },
                },
                bounce: {
                    '0%, 100%': {
                        transform: 'translateY(0) scale(1,1)',
                        animationTimingFunction: 'ease-in',
                    },
                    '45%': {
                        transform: 'translateY(5em) scale(1,1)',
                        animationTimingFunction: 'linear',
                    },
                    '50%': {
                        transform: 'translateY(5em) scale(1.5,0.5)',
                        animationTimingFunction: 'linear',
                    },
                    '55%': {
                        transform: 'translateY(5em) scale(1,1)',
                        animationTimingFunction: 'ease-out',
                    },
                },
            },
            animation: {
                rip: 'ripple .7s linear infinite',
                bounce: 'bounce 1s linear infinite',
            },
            transformOrigin: {
                '2/4': '50% 50%',
            },
            screens: {
                sm: { min: '576px' },
                xsm: { min: '490px' },
                xsmax: { max: '490px' },
                md: '960px',
                mdOne: { max: '960px' },
                md1: { max: '1100px' },
                md1min: { min: '1100px' },
                md2: { max: '560px' },
                md2min: { min: '560px' },
                md3: { max: '740px' },
                md3min: { min: '740px' },
                lgmin: '1440px',
                lg: { max: '1440px' },
                b_one: { max: '1440px' },
                b_two: { max: '1440px' },
                b_three: { max: '1024px' },
                b_four: { max: '768px' },
                b_five: { max: '640px' },
                b_six: { max: '1440px' },
            },
        },
    },
    plugins: [],
}
export default config
