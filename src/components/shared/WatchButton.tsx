import React, { ButtonHTMLAttributes } from 'react'
import Link from 'next/link'
import PlayIcon from '@/icons/PlayIcon'
import classNames from 'classnames'

interface WatchButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    href: string
    classAdd?: string
}

const WatchButton: React.FC<WatchButtonProps> = ({
    href,
    classAdd,
    ...restProps
}) => {
    return (
        <Link className="flex" href={href}>
            <button
                className={classNames(
                    'transition-all duration-300 leading-[0px] flex items-center gap-1.5 bg-blue-600 shadow-dark rounded-md font-bold text-slate-100 text-[15px] hover:bg-blue-700',
                    classAdd!
                )}
                {...restProps}
            >
                <div className="duration-300 w-[25px] h-[25px] flex items-center justify-center md1:!w-5 md1:!h-5 md2:!w-3 md2:!h-3">
                    <PlayIcon className="w-full h-full" />
                </div>
                <h1 className="text-slate-200 md2:font-light md2:text-xs">
                    Watch now
                </h1>
            </button>
        </Link>
    )
}

export default WatchButton
