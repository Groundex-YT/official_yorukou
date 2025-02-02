import { Media } from '@/types/anilist'
import dayjs from 'dayjs'
import _ from 'lodash'

export const humanStatus = (status: string, type: string) => {
    if (status === 'CURRENT') return type === 'ANIME' ? 'Watching' : 'Reading'
    return _.startCase(status.toLocaleLowerCase())
}

export const humanType = (type: string) => {
    if (type === 'ANIME') return 'Watch'
    return 'Read'
}

export const addedToList = (type: string, status: string) => {
    const mediaType = type === 'ANIME' ? 'watch' : 'read'
    if (status === 'CURRENT') return `${mediaType}ing list`
    if (status === 'PLANNING') return `planning list`
    if (status === 'COMPLETED') return 'completed list'
}

export const addedToFavorites = (title: string, favorite: boolean) => {
    return `${title} ${!favorite ? 'added to' : 'removed from'} favorites`
}

export const progressType = (type: string) => {
    return type === 'ANIME' ? 'episodes' : 'chapters'
}

interface mediaDate {
    day: number
    month: number
    year: number
}

export const mediaDate = (data: mediaDate) => {
    if (!data.day || !data.month || !data.year) return null
    return dayjs(`${data.year}-${data.month}-${data.day}`)
}

export const mediaStatus = [
    'CURRENT',
    'PLANNING',
    'COMPLETED',
    'DROPPED',
    'PAUSED',
]
export const filteredStatus = (status: string) => {
    return mediaStatus.filter((element) => element !== status)
}

export type ScoreFormat =
    | 'POINT_100'
    | 'POINT_10_DECIMAL'
    | 'POINT_10'
    | 'POINT_5'
    | 'POINT_3'

export const scoreFormat: Record<ScoreFormat, number> = {
    POINT_100: 100,
    POINT_10_DECIMAL: 10,
    POINT_10: 10,
    POINT_5: 5,
    POINT_3: 3,
}

export const humanFormat = (format: string) => {
    if (format === 'TV_SHORT') return 'TV Short'
    if (format === 'MOVIE') return 'Movie'
    if (format === 'SPECIAL') return 'Special'
    if (format === 'MUSIC') return 'Music'
    if (format === 'MANGA') return 'Manga'
    if (format === 'NOVEL') return 'Novel'
    if (format === 'ONE_SHOT') return 'One Shot'
    return format
}

export const Sorts = (sort: string) => {
    if (sort === 'Score') return 'SCORE_DESC'
    if (sort === 'Popular') return 'POPULARITY_DESC'
    if (sort === 'Trending') return 'TRENDING_DESC'
    if (sort === 'A-Z') return 'TITLE_ENGLISH'
    if (sort === 'Z-A') return 'TITLE_ENGLISH_DESC'
    if (sort === 'Trash') return 'SCORE'
    if (sort === 'Favourite') return 'FAVOURITES_DESC'
}

export enum Sortings {
    Score = 'Score',
    Popular = 'Popular',
    Trending = 'Trending',
    A_Z = 'A-Z',
    Z_A = 'Z-A',
    Trash = 'Trash',
    Favourite = 'Favourite',
}

export const humanMediaStatus = (status: string) => {
    if (status === 'NOT_YET_RELEASED') return 'Not Yet Released'
    return _.startCase(status.toLocaleLowerCase())
}

export const humanSeason = (season: string) => {
    if (!season) return '?'
    return _.startCase(season.toLocaleLowerCase())
}

export interface SearchArgs {
    type?: string
    page?: number | null
    perPage?: number | null
    search?: string | null
    sort?: string | null
    season?: string | null
    seasonYear?: number | null
    genres?: string[]
    tags?: []
    format?: string | null
    isAdult?: boolean
    onList?: boolean | null
    id?: number | null
    hd?: boolean
    fields?: string
}

export interface SearchOptions {
    type?: string
    page?: number | null
    perPage?: number | null
    search?: string | null
    sort?: string | null
    genres?: string[] | null
    tags?: [] | null
    format?: string | null
    isAdult?: boolean
    onList?: boolean | null
    seasonYear?: number | null
    season?: string | null
    results?: Media[]
    hasNextPage?: boolean
}

export interface UserProps {
    id: number
    username: string
    bg: string | null
    avatar: string
    episodesWatched: number
    chapterRead: number
    adult: boolean
}
