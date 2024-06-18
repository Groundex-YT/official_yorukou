import classNames from 'classnames'
import React, {
    PropsWithChildren,
    ReactNode,
    useCallback,
    useState,
} from 'react'

interface UniversalButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode
    className?: string
}

const UniversalButton: React.FC<UniversalButtonProps> = ({
    className,
    children,
    ...props
}) => {
    const [isActive, setIsActive] = useState(false)

    const onMouseDownHandler = useCallback(() => {
        setIsActive(true)
    }, [])

    const onMouseUpHandler = useCallback(() => {
        setIsActive(false)
    }, [])

    return (
        <button
            onMouseDown={onMouseDownHandler}
            onMouseUp={onMouseUpHandler}
            className={classNames(
                'border-transparent focus:border-transparent focus:ring-0 !outline-none focus:outline-none',
                isActive ? '!scale-75' : '!scale-100',
                className!
            )}
            {...props}
        >
            {children}
        </button>
    )
}

export default UniversalButton
