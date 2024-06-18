import classNames from 'classnames'
import React, { PropsWithChildren } from 'react'
import { ImSpinner2 } from 'react-icons/im'

interface SpinnerProps extends PropsWithChildren {
    className?: string
    innerClassName?: string
}

const Spinner: React.FC<SpinnerProps> = ({
    children,
    className,
    innerClassName,
}) => {
    return (
        <div
            className={classNames(
                'loader w-full h-full rounded-full bg-loader-spinner p-[3px]',
                className!
            )}
        >
            <div
                className={classNames(
                    'w-full h-full bg-gray-800 rounded-full',
                    innerClassName!
                )}
            ></div>
        </div>
    )
}

export const Loader: React.FC<SpinnerProps> = ({
    children,
    className,
    innerClassName,
}) => {
    return (
        <div
            className={classNames(
                'loaderv1 w-full h-full rounded-full',
                className!
            )}
        >
            <ImSpinner2
                className={classNames('w-full h-full', innerClassName!)}
            />
        </div>
    )
}

export default Spinner
