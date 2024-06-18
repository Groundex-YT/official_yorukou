import NestedMenu from '@/components/shared/NestedMenu'
import React from 'react'
import SearchMediaModal from './SearchMediaModal'

export interface SearchMediaProps {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    isOpen?: boolean
}

const SearchMedia: React.FC<SearchMediaProps> = ({ isOpen, setIsOpen }) => {
    return (
        <NestedMenu.SubMenu menuKey="profiles" title={'Search Media'}>
            <SearchMediaModal setIsOpen={setIsOpen} isOpen={isOpen} />
        </NestedMenu.SubMenu>
    )
}

export default SearchMedia
