import React, { ElementType } from 'react'
import { IoSearch } from 'react-icons/io5'

interface SearchInputProps extends React.HTMLProps<HTMLInputElement> {
    isLoading: Boolean
}

const SearchInput: React.FC<SearchInputProps> = ({
    isLoading = false,
    ...restProps
}) => {
    return (
        <header className="w-full px-[1em] flex items-center border-b border-[#e2e8f00d]">
            <label className="text-[1.2vw] max-md:text-xl text-secondary-200">
                <IoSearch />
            </label>
            <input
                className="w-full bg-transparent outline-none border-0 focus:outline-none h-[2.6vw] min-h-10 mx-[1em] text-[.8vw] max-md:text-sm"
                placeholder="Search for media"
                {...restProps}
            />
        </header>
    )
}

export default SearchInput
