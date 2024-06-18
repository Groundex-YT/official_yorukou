/* eslint-disable react-hooks/rules-of-hooks */
import { Sortings } from '@/api/anilist/schema'
import Banner from '@/components/shared/Banner'
import Head from '@/components/shared/Head'
import useSearch from '@/hooks/useSearch'
import React from 'react'

const anime = () => {
    const { data: Trending, isLoading: isTrendingLoading } = useSearch({
        type: 'ANIME',
        sort: Sortings.Trending,
        perPage: 10,
        hd: true,
    })

    console.log(Trending)

    return (
        <React.Fragment>
            <Head
                title="Yorukou (admin) - anime"
                description="Website only made for fun and nothing more. Come and watch free both dubbed and subbed anime provided by various providers such as Zoro and so more."
            />
            <Banner data={Trending?.results!} isLoading={isTrendingLoading} />
        </React.Fragment>
    )
}

anime.getAdminLayout = anime

export default anime
