export type Maybe<T> = T | null

export interface Page {
    pageInfo: Maybe<PageInfo>
    media: Maybe<Media[]>
    characters: Maybe<Character[]>
    mediaList: Maybe<MediaList[]>
    airingSchedules: Maybe<AiringSchedule[]>
    recommendations: Maybe<Recommendation[]>
}

export interface PageInfo {
    total: Maybe<number>
    perPage: Maybe<number>
    currentPage: Maybe<number>
    lastPage: Maybe<number>
    hasNextPage: Maybe<boolean>
}

export interface MediaListConnection {
    lists: Maybe<MediaListGroup[]>
    user: Maybe<any>
    hasNextChunk: Maybe<boolean>
}

export interface MediaListGroup {
    entries: Maybe<MediaList[]>
    name: Maybe<string>
    isCustomList: Maybe<boolean>
    isSplitCompletedList: Maybe<boolean>
    status: Maybe<MediaListStatus>
}

export interface PageArgs {
    page?: number
    perPage?: number
}

export interface Media {
    id: number
    idMal: Maybe<number>
    isAdult: Maybe<boolean>
    status: Maybe<MediaStatus>
    chapters: Maybe<any>
    episodes: Maybe<number>
    duration: Maybe<number>
    format: Maybe<MediaFormat>
    startDate: Maybe<FuzzyDate>
    characters: Maybe<MediaCharacterConnection>
    endDate: Maybe<FuzzyDate>
    season: Maybe<MediaSeason>
    seasonYear: Maybe<number>
    description: Maybe<string>
    nextAiringEpisode: Maybe<AiringSchedule>
    airingSchedule: Maybe<AiringScheduleConnection>
    type: Maybe<MediaType>
    genres: Maybe<string[]>
    meanScore: Maybe<number>
    isFavourite: Maybe<boolean>
    bannerImage: Maybe<string>
    coverImage: Maybe<MediaCoverImage>
    countryOfOrigin: Maybe<string>
    title: Maybe<MediaTitle>
    mediaListEntry: Maybe<MediaList>
    relation?: Maybe<any>
    volumes: Maybe<number>
    popularity: Maybe<number>
    isLocked: Maybe<boolean>
    trending: Maybe<number>
    favourites: Maybe<number>
    synonyms: Maybe<string[]>
    tags: Maybe<MediaTag[]>
    source: Maybe<MediaSource>
    trailer: Maybe<MediaTrailer>
    updatedAt: Maybe<number>
    relations: Maybe<MediaConnection>
    trends: Maybe<MediaTrendConnection>
    externalLinks: Maybe<MediaExternalLink[]>
    streamingEpisodes: Maybe<MediaStreamingEpisode[]>
    recommendations: Maybe<RecommendationConnection>
    studios: Maybe<StudioConnection>
    siteUrl: Maybe<string>
}

export interface MediaTag {
    /** The id of the tag*/
    id: number
    /** The name of the tag*/
    name: string
    /** A general description of the tag*/
    description: Maybe<string>
    /** The categories of tags this tag belongs to*/
    category: Maybe<string>
    /** The relevance ranking of the tag out of the 100 for this media*/
    rank: Maybe<number>
    /** If the tag could be a spoiler for any media*/
    isGeneralSpoiler: Maybe<boolean>
    /** If the tag is a spoiler for this media*/
    isMediaSpoiler: Maybe<boolean>
    /** If the tag is only for adult 18+ media*/
    isAdult: Maybe<boolean>
    /** The user who submitted the tag*/
    userId: Maybe<number>
}

export interface StudioConnection {
    edges: Maybe<StudioEdge[]>
    nodes: Maybe<Studio[]>
    /** The pagination information*/
    pageInfo: Maybe<PageInfo>
}

export interface StudioEdge {
    node: Maybe<Studio>
    /** The id of the connection*/
    id: Maybe<number>
    /** If the studio is the main animation studio of the anime*/
    isMain: boolean
    /** The order the character should be displayed from the users favourites*/
    favouriteOrder: Maybe<number>
}

export interface Studio {
    /** The id of the studio*/
    id: number
    /** The name of the studio*/
    name: string
    /** If the studio is an animation studio or a different kind of company*/
    isAnimationStudio: boolean
    /** The media the studio has worked on*/
    media: Maybe<MediaConnection>
    /** The url for the studio page on the AniList website*/
    siteUrl: Maybe<string>
    /** If the studio is marked as favourite by the currently authenticated user*/
    isFavourite: boolean
    /** The amount of user's who have favourited the studio*/
    favourites: Maybe<number>
}

export interface MediaTrendConnection {
    edges: Maybe<MediaTrendEdge[]>
    nodes: Maybe<MediaTrend[]>
    pageInfo: Maybe<PageInfo>
}

export interface MediaCharacterConnection {
    edges: Maybe<CharacterConnection[]>
    pageInfo: Maybe<PageInfo>
}

export interface CharacterConnection {
    node: Maybe<Character>
    role: string
}

export interface AiringScheduleConnection {
    edges: Maybe<AiringScheduleEdge[]>
    nodes: Maybe<AiringSchedule[]>
    /** The pagination information*/
    pageInfo: Maybe<PageInfo>
}

export interface AiringScheduleEdge {
    node: Maybe<AiringSchedule>
    /** The id of the connection*/
    id: Maybe<number>
}

export interface MediaTrendEdge {
    node: Maybe<MediaTrend>
}

export interface MediaTrend {
    mediaId: number
    date: number
    trending: number
    averageScore: Maybe<number>
    popularity: Maybe<number>
    inProgress: Maybe<number>
    releasing: boolean
    episode: Maybe<number>
    media: Maybe<Media>
}

export enum ExternalLinkType {
    Info = 'INFO',
    Streaming = 'STREAMING',
    Social = 'SOCIAL',
}

export interface MediaStreamingEpisode {
    title: Maybe<string>
    thumbnail: Maybe<string>
    url: Maybe<string>
    site: Maybe<string>
}

export interface MediaExternalLink {
    id: number
    url: Maybe<string>
    site: string
    siteId: Maybe<number>
    type: Maybe<ExternalLinkType>
    language: Maybe<string>
    color: Maybe<string>
    icon: Maybe<string>
    notes: Maybe<string>
    isDisabled: Maybe<boolean>
}

export type MediaArgs = {
    id: number
    idMal: Maybe<number>
    isAdult: Maybe<boolean>
    status: Maybe<MediaStatus>
    chapters: Maybe<any>
    episodes: Maybe<number>
    nextAiringEpisode: Maybe<AiringSchedule>
    type: Maybe<MediaType>
    genres: Maybe<[]>
    meanScore: Maybe<number>
    isFavourite: Maybe<boolean>
    bannerImage: Maybe<string>
    coverImage: Maybe<MediaCoverImage>
    countryOfOrigin: Maybe<string>
    title: Maybe<MediaTitle>
    mediaListEntry: Maybe<MediaList>
    relation?: Maybe<any>
}

export interface MediaConnection {
    edges: Maybe<MediaEdge[]>
    nodes: Maybe<Media[]>
    pageInfo: Maybe<PageInfo>
}

export interface MediaEdge {
    node: Maybe<Media>
    id: Maybe<number>
    relationType: Maybe<MediaRelation>
    characters: Maybe<Character[]>
}

export interface MediaTitle extends Record<string, string> {
    romaji: string
    english: string
    native: string
    userPreferred: string
}

export enum MediaType {
    Anime = 'ANIME',
    Manga = 'MANGA',
}

export interface RecommendationConnection {
    edges: Maybe<RecommendationEdge[]>
    nodes: Maybe<Recommendation[]>
    pageInfo: Maybe<PageInfo>
}

export interface FuzzyDate {
    year: Maybe<number>
    month: Maybe<number>
    day: Maybe<number>
}

export interface MediaTrailer {
    id: Maybe<string>
    site: Maybe<string>
    thumbnail: Maybe<string>
}

export interface MediaCoverImage {
    extraLarge: Maybe<string>
    large: Maybe<string>
    medium: Maybe<string>
    color: Maybe<string>
}

export enum CharacterRole {
    Main = 'MAIN',
    Supporting = 'SUPPORTING',
    Background = 'BACKGROUND',
}

export interface Character {
    id: number
    name: Maybe<CharacterName>
    image: Maybe<CharacterImage>
    description: Maybe<string>
    gender: Maybe<string>
    dateOfBirth: Maybe<FuzzyDate>
    age: Maybe<string>
    bloodType: Maybe<string>
    isFavourite: boolean
    isFavouriteBlocked: boolean
    siteUrl: Maybe<string>
    media: Maybe<MediaConnection>
    updatedAt: Maybe<number>
    favourites: Maybe<number>
    modNotes: Maybe<string>
}

export interface CharacterName {
    first: Maybe<string>
    middle: Maybe<string>
    last: Maybe<string>
    full: Maybe<string>
    native: Maybe<string>
    alternative: Maybe<string[]>
    alternativeSpoiler: Maybe<string[]>
    userPreferred: Maybe<string>
}

export interface CharacterImage {
    large: Maybe<string>
    medium: Maybe<string>
}
export interface RecommendationEdge {
    node: Maybe<Recommendation>
}

export interface Recommendation {
    id: number
    rating: Maybe<number>
    userRating: Maybe<RecommendationRating>
    media: Maybe<Media>
    mediaRecommendation: Maybe<Media>
}

export enum RecommendationRating {
    No_rating = 'NO_RATING',
    Rate_up = 'RATE_UP',
    Rate_down = 'RATE_DOWN',
}

export enum MediaRelation {
    Adaptation = 'ADAPTATION',
    Prequel = 'PREQUEL',
    Sequel = 'SEQUEL',
    Parent = 'PARENT',
    Side_story = 'SIDE_STORY',
    Character = 'CHARACTER',
    Summary = 'SUMMARY',
    Alternative = 'ALTERNATIVE',
    Spin_off = 'SPIN_OFF',
    Other = 'OTHER',
    Source = 'SOURCE',
    Compilation = 'COMPILATION',
    Contains = 'CONTAINS',
}

export interface AiringSchedule {
    id: number
    airingAt: number
    timeUntilAiring: number
    episode: number
    mediaId: number
    media: Maybe<Media>
}

export interface MediaList {
    progress: number
    score: number
    status: MediaStatus
    media: Maybe<Media>
}

export enum MediaStatus {
    Finished = 'FINISHED',
    Releasing = 'RELEASING',
    Not_yet_released = 'NOT_YET_RELEASED',
    Cancelled = 'CANCELLED',
    Hiatus = 'HIATUS',
}

export enum MediaListStatus {
    Current = 'CURRENT',
    Planning = 'PLANNING',
    Completed = 'COMPLETED',
    Dropped = 'DROPPED',
    Paused = 'PAUSED',
    Repeating = 'REPEATING',
}

export enum MediaSeason {
    Winter = 'WINTER',
    Spring = 'SPRING',
    Summer = 'SUMMER',
    Fall = 'FALL',
}

export enum MediaFormat {
    Tv = 'TV',
    Tv_short = 'TV_SHORT',
    Movie = 'MOVIE',
    Special = 'SPECIAL',
    Ova = 'OVA',
    Ona = 'ONA',
    Music = 'MUSIC',
    Manga = 'MANGA',
    Novel = 'NOVEL',
    One_shot = 'ONE_SHOT',
}

export interface Viewer {
    avatar: Maybe<Avatar>
    bannerImage: Maybe<string>
    id: Maybe<number>
    name: Maybe<string>
    options: Maybe<Options>
    statistics: Maybe<Statistics>
}

export interface Avatar {
    medium: Maybe<string>
    large: Maybe<string>
}

export interface Options {
    displayAdultContent: Maybe<boolean>
}

export interface Statistics {
    anime: Maybe<AnimeViewer>
    manga: Maybe<MangaViewer>
}

export interface AnimeViewer {
    episodesWatched: Maybe<number>
}

export interface MangaViewer {
    chaptersRead: Maybe<number>
}

export interface RecommendationArgs {
    /** Filter by recommendation id*/
    id?: number
    /** Filter by media id*/
    mediaId?: number
    /** Filter by media recommendation id*/
    mediaRecommendationId?: number
    /** Filter by user who created the recommendation*/
    userId?: number
    /** Filter by total rating of the recommendation*/
    rating?: number
    /** Filter by the media on the authenticated user's lists*/
    onList?: boolean
    /** Filter by total rating of the recommendation*/
    rating_greater?: number
    /** Filter by total rating of the recommendation*/
    rating_lesser?: number
}
