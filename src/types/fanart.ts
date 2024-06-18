export type Maybe<T> = T | null

export enum FanartMediaType {
    TV = 'TV Show',
    MOVIE = 'Movie',
}

export interface FanartSearchResults {
    id: Maybe<string>
    image_count: Maybe<string>
    link: Maybe<string>
    poster: Maybe<string>
    title: Maybe<string>
    type: Maybe<FanartMediaType>
}
