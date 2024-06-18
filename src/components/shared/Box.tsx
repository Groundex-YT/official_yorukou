import React, { useEffect, useRef } from 'react'

interface BoxProps
    extends React.PropsWithChildren,
        React.HTMLProps<HTMLDivElement> {
    isOpen: boolean
    setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>
    onClose?: () => void
    func?: boolean
}

const Box: React.FC<BoxProps> = ({
    isOpen,
    setIsOpen,
    children,
    onClose,
    func = false,
    ...restProp
}) => {
    const boxRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const docuFunc = (e: MouseEvent) => {
            //@ts-ignore
            if (e.target.contains(boxRef.current)) {
                if (isOpen) {
                    if (func) {
                        onClose?.()
                    } else {
                        setIsOpen?.(false)
                    }
                }
            }
        }

        document.addEventListener('click', docuFunc)

        return () => {
            document.removeEventListener('click', docuFunc)
        }
    }, [func, isOpen, onClose, setIsOpen])

    return (
        <div {...restProp} ref={boxRef}>
            {children}
        </div>
    )
}

export default Box
