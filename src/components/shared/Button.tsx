import classNames from 'classnames'
import React, { useCallback, useRef } from 'react'

enum Variants {
    FILLIED = 'filled',
    OUTLINED = 'outlined',
}

enum Sizes {
    SMALL = 'small',
    MEDIUM = 'medium',
}

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
    variant?: Variants
    propotion?: Sizes
    className?: string
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'filled',
    propotion = 'small',
    disabled = false,
    onClick,
    type,
    className,
    ...restProps
}) => {
    const btnRef = useRef<HTMLButtonElement>(null)

    const onClickHandler = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            //@ts-ignore
            const x = e.clientX - e.target.offsetLeft
            //@ts-ignore
            const y = e.clientY - e.target.offsetTop

            const ripple = document.createElement('span')
            ripple.classList.add(
                'absolute',
                '-translate-x-2/4',
                '-translate-y-2/4',
                'bg-white',
                'rounded-full',
                'pointer-events-none',
                'w-1.5',
                'h-1.5',
                'animate-rip'
            )
            btnRef.current?.appendChild(ripple)
            ripple.style.left = x + 'px'
            ripple.style.top = y + 'px'

            setTimeout(() => {
                ripple.remove()
            }, 600)

            onClick?.(e)
        },
        [onClick]
    )

    return (
        <button
            onClick={onClickHandler}
            disabled={disabled}
            ref={btnRef}
            className={classNames(
                'relative duration-300 overflow-hidden cursor-pointer select-none',
                variant === 'filled' &&
                    !disabled &&
                    'bg-primary shadow-button hover:shadow-button-on',
                propotion === 'small' &&
                    'px-2.5 py-1.5 text-sm font-medium rounded-sm',
                'text-sm',
                disabled && 'bg-secondary text-[#2f3135] !cursor-not-allowed',
                className
            )}
            {...restProps}
        >
            {children}
        </button>
    )
}

export default Button
