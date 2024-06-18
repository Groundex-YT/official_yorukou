import React, { useCallback, useEffect, useRef, useState } from 'react'
import SearchInput from './SearchInput'
import { motion } from 'framer-motion'
import _ from 'lodash'
import { debounce } from '@/utils'
import { MediaType } from '@/types/anilist'
import useSearch from '@/hooks/useSearch'
import SearchResult from './SearchResult'
import classNames from 'classnames'
import { PopInVariant } from '../ManageProfiles/EditProfilesModal'
import { SearchMediaProps } from './SearchMedia'

const SearchMediaModal: React.FC<SearchMediaProps> = ({
    setIsOpen,
    isOpen,
}) => {
    const [keyward, setKeyward] = useState<string>('')
    const [query, setQuery] = useState<string>('')
    const [loading, setLoading] = useState(true)
    const [type, setType] = useState<MediaType>(MediaType.Anime)
    const menuRef = useRef<HTMLDivElement>(null)

    const {
        data: AnimeData,
        isLoading: isAnimeDataLoading,
        error: AnimeError,
    } = useSearch({
        search: keyward,
        type: MediaType.Anime,
        perPage: 10,
    })

    const {
        data: MangaData,
        isLoading: isMangaDataLoading,
        error: MangaError,
    } = useSearch({
        search: keyward,
        type: MediaType.Manga,
        perPage: 10,
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleOnChange = useCallback(
        debounce((query: string) => {
            setKeyward(query)
            setLoading(false)
        }, 500),
        []
    )

    useEffect(() => {
        setLoading(true)
        handleOnChange(query)
    }, [handleOnChange, query])

    useEffect(() => {
        const docuFunc = (e: MouseEvent) => {
            //@ts-ignore
            if (e.target.contains(menuRef.current)) {
                if (isOpen) {
                    setIsOpen(false)
                }
            }
        }

        document.addEventListener('click', docuFunc)

        return () => {
            document.removeEventListener('click', docuFunc)
        }
    }, [isOpen, setIsOpen])

    return (
        <React.Fragment>
            <motion.div
                ref={menuRef}
                variants={PopInVariant}
                animate="animate"
                exit="exit"
                initial="initial"
                transition={{
                    duration: 0.3,
                }}
                className={classNames(
                    `bg-secondary max-w-[35vw] min-w-[400px] max-md:max-w-full w-full rounded-md shadow-[inset_0_1px_0_0_#ffffff0d] flex flex-col overflow-y-hidden`
                )}
            >
                <SearchInput
                    isLoading={false}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setQuery(e.target.value!)
                    }
                    value={query}
                />
                <SearchResult
                    isLoading={
                        type === MediaType.Anime
                            ? isAnimeDataLoading
                            : isMangaDataLoading
                    }
                    isLoading2={loading}
                    data={AnimeData?.results}
                    error={type === MediaType.Anime ? AnimeError : MangaError}
                />
                <footer className="flex items-center justify-end border-t border-[#e2e8f00d] text-gray-400 p-[1em] text-[.8vw] max-md:text-sm">
                    Engine powered by{' '}
                    <span className="ml-1.5 text-primary">
                        @Groundex-YT/ Pacifique Mossi
                    </span>
                </footer>
            </motion.div>
        </React.Fragment>
    )
}

export default React.memo(SearchMediaModal)
