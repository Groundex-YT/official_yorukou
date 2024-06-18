import NestedMenu from '@/components/shared/NestedMenu'
import React from 'react'
import SearchMedia, { SearchMediaProps } from './SearchMedia'

const Menu: React.FC<SearchMediaProps> = React.memo(({ setIsOpen, isOpen }) => (
    <NestedMenu className="!w-full !h-full">
        <SearchMedia setIsOpen={setIsOpen} isOpen={isOpen} />
    </NestedMenu>
))

Menu.displayName = 'NestedMenuProfiles'

const NestedMenuUpload: React.FC<SearchMediaProps> = ({
    setIsOpen,
    isOpen,
}) => {
    return (
        <React.Fragment>
            <Menu setIsOpen={setIsOpen} isOpen={isOpen} />
        </React.Fragment>
    )
}

export default React.memo(NestedMenuUpload)
