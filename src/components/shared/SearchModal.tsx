import useSearchModal from '@/hooks/useSearchModal'
import React, { useCallback, useEffect, useState } from 'react'
import Box from './Box'
import SearchMediaModal from '../modals/search/components/SearchMediaModal'
import classNames from 'classnames'

interface ModalProps {
    visible?: boolean
    onClose: (e: any) => void
}

const SearchModal: React.FC<ModalProps> = ({ visible, onClose }) => {
    const [isVisible, setIsVisible] = useState(!!visible)

    const { data } = useSearchModal()

    useEffect(() => {
        setIsVisible(!!visible)
    }, [visible])

    const handleClose = useCallback(() => {
        setIsVisible(false)
        setTimeout(() => {
            onClose(data)
        }, 300)
    }, [data, onClose])

    if (!visible) return null

    return (
        <div className="duration-300 fixed inset-0 z-50 bg-[hsla(0,0%,8%,.9)] backdrop-blur-sm p-[12vh] flex items-center justify-center select-none">
            <div className="w-full h-full relative flex flex-col items-center justify-center">
                <Box
                    className={classNames(
                        `duration-300 max-w-[35vw] w-full h-full relative flex flex-col items-center justify-center`,
                        !isVisible && '-translate-y-20 opacity-0'
                    )}
                    isOpen={isVisible}
                    func
                    onClose={handleClose}
                >
                    <SearchMediaModal />
                </Box>
            </div>
        </div>
    )
}

export default SearchModal
