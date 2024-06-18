import {
    AiringSchedule,
    Media,
    MediaListConnection,
    MediaType,
    RecommendationArgs,
} from '../../types/anilist'
import axios, { AxiosRequestHeaders } from 'axios'
import { SearchArgs, SearchOptions, Sorts } from './schema'

import {
    GenreCollectionResponse,
    GenreThumbQuery,
    MediaDetailsQueryResponse,
    MediaListCollectionResponse,
    PageQueryResponse,
    ViewerQueryResponse,
    getUserQuery,
    mediaDefaultQuery,
    mediaDetailsQuery,
    mediaQuery,
    recentlyUpdatedQueries,
    recommendationsQuery,
    userRecommendationsQuery,
} from './documents/queries'
import Axios from '../../config/Axios'
import { Profile } from '@/hooks/useProfiles'

const url = `https://graphql.anilist.co`

interface FetchHandlerProps {
    query?: string
    variables?: {} | string
    force?: boolean
    useToken?: boolean
    token?: string | null
    manualToken?: boolean
}

const fetchHandler = async <T>({
    query,
    variables = '',
    force = false,
    useToken = true,
    token = null,
    manualToken = false,
}: FetchHandlerProps) => {
    type Response = {
        data: T
    }

    const getToken = () => localStorage.getItem('token')

    const options: any = {
        url,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        data: JSON.stringify({
            query: query,
            variables: variables,
        }),
    }

    if (getToken() != null || force || manualToken) {
        if (token && manualToken) {
            options.headers['Authorization'] = `Bearer ${token}`
        }

        if (!manualToken) {
            if (getToken() != null && useToken) {
                options.headers['Authorization'] = `Bearer ${getToken()}`
            }
        }

        const { data } = await Axios<Response>(options)

        if (!data) throw new Error("Can't get the data! check ur internet.")

        return data.data
    } else null
}

class SearchResults implements SearchOptions {
    type?: string
    page: number | null
    perPage: number | null
    search: string | null
    sort: string | null
    genres: string[] | null
    seasonYear: number | null
    season: string | null
    tags: [] | null
    format: string | null
    isAdult?: boolean
    onList: boolean | null
    results: Media[]
    hasNextPage?: boolean

    constructor({
        type = 'ANIME',
        isAdult = false,
        onList = null,
        perPage = null,
        search = null,
        sort = null,
        genres = null,
        tags = null,
        format = null,
        page = 1,
        seasonYear = null,
        season = null,
        results = [],
        hasNextPage = false,
    }: SearchOptions) {
        this.type = type
        this.isAdult = isAdult
        this.onList = onList
        this.perPage = perPage
        this.search = search
        this.sort = sort
        this.genres = genres
        this.tags = tags
        this.format = format
        this.page = page
        this.results = results
        this.seasonYear = seasonYear
        this.season = season
        this.hasNextPage = hasNextPage
    }
}

export const getUser = async (manualToken?: boolean, token?: string) => {
    const query = getUserQuery
    const res = await fetchHandler<ViewerQueryResponse>({
        query,
        manualToken: manualToken || false,
        token: token || null,
    })

    const Viewer = res?.Viewer
    const user = Viewer

    const User: Profile = {
        id: user?.id,
        username: user?.name,
        bg: user?.bannerImage,
        avatar: user?.avatar?.large,
        episodesWatched: user?.statistics?.anime?.episodesWatched,
        chapterRead: user?.statistics?.manga?.chaptersRead,
        adult: user?.options?.displayAdultContent
            ? user?.options?.displayAdultContent
            : false,
    }

    return User
}

export const Search = async ({
    type,
    page = null,
    perPage = null,
    search = null,
    sort = null,
    genres = [],
    tags = [],
    format = null,
    isAdult = false,
    onList = null,
    season = null,
    seasonYear = null,
    id = null,
    hd = false,
}: SearchArgs) => {
    type variablesType = {
        type?: string
        isAdult: boolean
        page?: number | null
        perPage?: number | null
        search?: string | null
        sort?: string | null
        season?: string | null
        seasonYear?: number | null
        genres?: string[]
        tags?: []
        format?: string | null
        onList?: boolean | null
        id?: number | null
        hd?: boolean
    }
    const variables: variablesType = {
        type: type,
        isAdult: isAdult,
    }

    if (onList) variables['onList'] = onList
    if (page) variables['page'] = page
    if (id) variables['id'] = id
    if (search) variables['search'] = search
    if (Sorts(sort ? sort : '')) variables['sort'] = Sorts(sort ? sort : '')
    if (format) variables['format'] = format
    if (genres.length !== 0) variables['genres'] = genres
    if (tags.length !== 0) variables['tags'] = tags
    if (season) variables['season'] = season
    if (seasonYear) variables['seasonYear'] = seasonYear

    const res = await fetchHandler<PageQueryResponse>({
        query: mediaQuery(mediaDefaultQuery, perPage),
        variables,
        force: true,
    })

    const media = res?.Page?.media
    const pageInfo = res?.Page?.pageInfo

    if (media != null) {
        const responseArray: Media[] = []
        media.map((i) => {
            const userStatus = i.mediaListEntry?.status
            const genresArr: string[] = []
            if (i.genres != null) {
                i.genres?.forEach((genre) => {
                    genresArr.push(genre)
                })
            }

            i.relation = onList == true ? userStatus : null
            i.genres = genresArr
            responseArray.push(i)
        })

        const pageInfor = pageInfo ? pageInfo : null

        return new SearchResults({
            type: type,
            perPage: perPage!,
            search: search,
            sort: sort,
            isAdult: isAdult,
            onList: onList,
            genres: genres,
            tags: tags,
            format: format,
            results: responseArray,
            page: pageInfor?.currentPage,
            seasonYear: seasonYear,
            season: season,
            hasNextPage: pageInfor?.hasNextPage == true,
        })
    } else {
        throw new Error('Empty Response, Does your internet perhaps suck?')
    }
}

// export const recentlyUpdated = async (
//     smaller: boolean = true,
//     greater: number = 0,
//     lesser: number = new Date().getTime() / 1000 - 10000
// ) => {
//     const execute = async (page: number = 1) => {
//         let query = recentlyUpdatedQueries(page, greater, lesser)
//         const res = await fetchHandler<PageQueryResponse>({
//             query,
//             force: true,
//         })

//         return res?.Page
//     }

//     if (smaller) {
//         const res = await execute()
//         const response = res?.airingSchedules
//         const idAr = new Map<number, AiringSchedule>()
//         const listOnly: boolean = false

//         response?.map((i) => {
//             if (!idAr.has(i?.media?.id ? i.media.id : 0)) {
//                 if (!listOnly && i.media?.countryOfOrigin == 'JP') {
//                     idAr.set(i?.media?.id, i)
//                 }
//             }
//         })

//         return Array.from(idAr, ([name, value]) => value)
//     } else {
//         let i = 1
//         const list = new Map()
//         let res = null

//         const next = async () => {
//             res = await execute(i)

//             res?.airingSchedules?.map((j) => {
//                 list.set(j.media?.id, j)
//                 const it = j.media
//                 if (it?.countryOfOrigin == 'JP') {
//                     it.relation = `${j.episode},${j.airingAt}`
//                 }
//             })

//             next()

//             while (res?.pageInfo?.hasNextPage == true) {
//                 next()
//                 i++
//             }

//             return list
//         }
//     }
// }

export const recommendation = async (
    args: RecommendationArgs,
    fields?: string
) => {
    const query = recommendationsQuery(fields)

    const res = await fetchHandler<PageQueryResponse>({
        query,
        variables: args,
        force: true,
    })

    return res?.Page.recommendations
}

interface NewMedia {
    relation?: MediaType
    media: Media
}

export const recommendations = async (userId: number) => {
    const query = userRecommendationsQuery()

    let map = new Map<number, NewMedia>()

    const res = await fetchHandler<PageQueryResponse>({
        query,
    })

    res?.Page?.recommendations?.map((media) => {
        let newMedia = media?.mediaRecommendation

        if (newMedia != null) {
            let m: NewMedia = {
                media: newMedia,
            }

            m.relation = newMedia?.type!
            map.set(m.media?.id, m)
        }
    })

    let types: Array<MediaType> = [MediaType.Anime, MediaType.Manga]

    const repeat = async (type: MediaType) => {
        const quert = `
        { MediaListCollection(userId: ${userId}, type: ${type}, status: PLANNING , sort: MEDIA_POPULARITY_DESC ) { lists { entries { media { id mediaListEntry { progress private score(format:POINT_100) status } idMal type isAdult popularity status(version: 2) chapters episodes nextAiringEpisode {episode} meanScore isFavourite format bannerImage coverImage{large} title { english romaji userPreferred } } } } } }
        `
        const res = await fetchHandler<MediaListCollectionResponse>({
            query: quert,
        })

        res?.MediaListCollection?.lists?.map((list) => {
            list?.entries?.map((mediaList) => {
                let m: NewMedia = {
                    media: mediaList?.media!,
                }

                if (
                    mediaList.status === 'RELEASING' ||
                    mediaList.status == 'FINISHED'
                ) {
                    m.relation === mediaList?.media?.type
                    map.set(m?.media?.id, m)
                }
            })
        })
    }

    for (const type of types) {
        await repeat(type)
    }

    return await Promise.all(
        Array?.from(map, ([key, value]) => ({ ...value.media })).sort(
            (a, b) => b?.meanScore! - a?.meanScore!
        )
    )
}

// export const getGenresAndTags = async () => {
//     const query = `
//         { GenreCollection }
//     `
//     const res = await fetchHandler<any>({ query, force: true })
// }

export const getTags = async (adult: boolean = false) => {
    const query = `
        { MediaTagCollection { name isAdult } }
    `
    const res = await fetchHandler<any>({ query, force: true })

    const tagsAdult: string[] = []
    const tagsDecent: string[] = []

    res.MediaTagCollection.map((tag: any) => {
        if (tag.isAdult) {
            tagsAdult.push(tag.name)
            return
        } else {
            tagsDecent.push(tag.name)
        }
    })

    if (adult) {
        return await Promise.all(tagsAdult)
    } else {
        return await Promise.all(tagsDecent)
    }
}

export const getGenres = async () => {
    const query = `
        { GenreCollection }
    `

    const Genres: string[] = []

    const res = await fetchHandler<GenreCollectionResponse>({
        query,
        force: true,
    })

    res?.GenreCollection?.map((genre) => {
        Genres.push(genre)
    })

    return await Promise.all(Genres)
}

export const getGenresWithThumb = async () => {
    const query = `
        { GenreCollection }
    `

    const Genres = []

    const res = await fetchHandler<GenreCollectionResponse>({
        query,
        force: true,
    })
}

type genreWithThumb = {
    name: string
    id: number
    thumb: string
}

export const getGenreThumb = async (genre: string) => {
    const query = GenreThumbQuery(genre)

    let Genre: genreWithThumb | undefined

    const res = await fetchHandler<PageQueryResponse>({
        query,
        force: true,
    })

    res?.Page?.media?.map((media, i) => {})
}

const standAloneFetch = async <T>({
    query,
    variables = '',
}: FetchHandlerProps) => {
    type Response = {
        data: T
    }

    const options: any = {
        method: 'post',
        url,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        data: JSON.stringify({
            query: query,
            variables: variables,
        }),
    }

    const { data } = await axios<Response>(options)

    if (!data) throw new Error("Can't get the data! check ur internet.")

    return data.data
}

export const getMediaDetails = async (
    id: number,
    userBased: boolean = false
) => {
    const query = mediaDetailsQuery(id)

    if (!userBased) {
        let res = await standAloneFetch<MediaDetailsQueryResponse>({
            query,
            force: true,
        })

        const { Media } = res!

        return Media
    }

    let res = await fetchHandler<MediaDetailsQueryResponse>({
        query,
    })

    const { Media } = res!

    return Media
}
