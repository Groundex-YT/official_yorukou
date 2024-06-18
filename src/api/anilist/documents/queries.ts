import { Page, Viewer, Media, MediaListConnection } from '@/types/anilist'

export type PageQueryResponse = {
    Page: Page
}

export type MediaListCollectionResponse = {
    MediaListCollection: MediaListConnection
}

export type ViewerQueryResponse = {
    Viewer: Viewer
}

export type GenreCollectionResponse = {
    GenreCollection: string[]
}

export type MediaDetailsQueryResponse = {
    Media: Media
}

export const mediaDefaultQuery = `
    id
    idMal
    isAdult
    status
    chapters
    episodes
    duration
    format
    season
    seasonYear
    seasonInt
    nextAiringEpisode {
        episode
        airingAt
    }
    type
    genres
    meanScore
    isFavourite
    bannerImage
    description
    coverImage {
        large
        extraLarge
    }
    studios(isMain:true) {
        nodes {
            id 
            name 
            siteUrl
        }
    }     
    title {
        english
        romaji
        userPreferred
    }
    countryOfOrigin
    mediaListEntry {
        private
        progress
        score(format: POINT_100)
        status
    }
    trailer { site id }
`

export const mediaQuery = (
    fields: string = mediaDefaultQuery,
    perPage: any = null
): string => `
    query (
        $page: Int = 1, 
        $id: Int,
        $duration: Int 
        $type: MediaType, 
        $isAdult: Boolean = false, 
        $search: String, 
        $format: [MediaFormat], 
        $status: MediaStatus, 
        $countryOfOrigin: CountryCode, 
        $source: MediaSource, 
        $season: MediaSeason, 
        $seasonYear: Int, 
        $year: String, 
        $onList: Boolean, 
        $yearLesser: FuzzyDateInt, 
        $yearGreater: FuzzyDateInt, 
        $episodeLesser: Int, 
        $episodeGreater: Int, 
        $durationLesser: Int, 
        $durationGreater: Int, 
        $chapterLesser: Int, 
        $chapterGreater: Int, 
        $volumeLesser: Int, 
        $volumeGreater: Int, 
        $licensedBy: [String], 
        $isLicensed: Boolean, 
        $genres: [String], 
        $excludedGenres: [String], 
        $tags: [String], 
        $excludedTags: [String], 
        $minimumTagRank: Int, 
        $sort: [MediaSort] = [POPULARITY_DESC, SCORE_DESC]
    ) {
        Page(page: $page, perPage: ${perPage ? perPage : 50}) {
            pageInfo {
                total
                perPage
                currentPage
                lastPage
                hasNextPage
            }
            media(
                id: $id, 
                type: $type, 
                season: $season, 
                format_in: $format, 
                status: $status, 
                countryOfOrigin: $countryOfOrigin, 
                source: $source, 
                search: $search, 
                onList: $onList, 
                seasonYear: $seasonYear, 
                startDate_like: $year, 
                startDate_lesser: $yearLesser, 
                startDate_greater: $yearGreater, 
                episodes_lesser: $episodeLesser, 
                duration: $duration,
                episodes_greater: $episodeGreater, 
                duration_lesser: $durationLesser, 
                duration_greater: $durationGreater, 
                chapters_lesser: $chapterLesser, 
                chapters_greater: $chapterGreater, 
                volumes_lesser: $volumeLesser, 
                volumes_greater: $volumeGreater, 
                licensedBy_in: $licensedBy, 
                isLicensed: $isLicensed, 
                genre_in: $genres, 
                genre_not_in: $excludedGenres, 
                tag_in: $tags, 
                tag_not_in: $excludedTags, 
                minimumTagRank: $minimumTagRank, 
                sort: $sort, 
                isAdult: $isAdult
            ) {
                ${fields}
            }
        }
    }           
`

export const getUserQuery = `
    {
        Viewer {
            name 
            options {
                displayAdultContent 
            } 
            avatar {
                medium
                large
            } 
            bannerImage 
            id 
            statistics {
                anime { 
                    episodesWatched
                }
                manga {
                    chaptersRead
                }
            }
        }
    }
`

export const mediaDetailsDefaultFields = `
id
mediaListEntry {
      id
      status
      score(format: POINT_100)
      progress
      private
      notes
      repeat
      customLists
      updatedAt
      startedAt {
        year
        month
        day
      }
      completedAt {
        year
        month
        day
      }
    }
idMal
title {
  romaji
  english
  native
  userPreferred
}
type
format
status
description
trailer { site id }
startDate {
  year
  month
  day
}
isFavourite
endDate {
  year
  month
  day
}
season
seasonYear
seasonInt
episodes
duration
chapters
volumes
countryOfOrigin
updatedAt
coverImage {
  extraLarge
  large
  medium
  color
}
bannerImage
genres
synonyms
averageScore
popularity
trending
favourites
tags {
  id
  name
  description
  category
  rank
  isGeneralSpoiler
  isMediaSpoiler
  isAdult
  userId
}
relations { 
    edges {
        relationType(version:2)
        node {
            id 
            idMal 
            mediaListEntry {
                progress 
                score(format:POINT_100) 
                status
            } 
                    episodes 
                    chapters 
                    nextAiringEpisode {
                        episode
                    } 
                    popularity 
                    meanScore 
                    isAdult 
                    isFavourite 
                    title {
                        english 
                        romaji 
                        userPreferred 
                    }
                    type 
                    status(version:2)
                    bannerImage 
                    coverImage {
                        large
                    }
                }
            }
        }
characters {
  edges {
    role
    node {
      id
      image {
        large
        medium
      }
      name {
        first
        middle
        last
        full
        native
        userPreferred
      }
    }
  }
}
studios {
    nodes {
        id 
        name
    }
    edges {
        isMain 
        node {
            id 
            name
        }
    }
}
isAdult
source
duration
recommendations {
  nodes {
    mediaRecommendation {
      ${mediaDefaultQuery}
    }
  }
  pageInfo {
    total
    perPage
    currentPage
    lastPage
    hasNextPage
  }
}
staffPreview: staff(perPage: 8, sort: [RELEVANCE, ID]) {
      edges {
        role
        node {
          id
          name {
            userPreferred
          }
        }
      }
    }
externalLinks {
      url
      site
    }
airingSchedule(notYetAired: true, perPage: 1) {
  nodes {
    airingAt
    episode
  }
}
nextAiringEpisode {
      episode
      airingAt
    }
`

export const recentlyUpdatedQueries = (
    page: number = 1,
    greater: number,
    lesser: number
) => `
{
        Page(page:${page},perPage:50) {
            pageInfo {
                hasNextPage
                total
            }
            airingSchedules(
                airingAt_greater: ${greater}
                airingAt_lesser: ${parseInt(`${lesser}`)}
                sort:TIME_DESC
            ) {
                episode
                airingAt
                media {
                    id
                    idMal
                    status
                    chapters
                    episodes
                    duration
                    description
                    season
                    seasonYear
                    nextAiringEpisode { episode airingAt }
                    isAdult
                    type
                    meanScore
                    isFavourite
                    bannerImage
                    countryOfOrigin
                    coverImage { large }
                    genres
                    trailer { site id }
                    title {
                        english
                        romaji
                        userPreferred
                    }
                    mediaListEntry {
                        progress
                        private
                        score(format: POINT_100)
                        status
                    }
                }
            }
        }
    }
`

export const recommendationsDefaultFields = `
id
rating
userRating
media {
  ${mediaDefaultQuery}
}
mediaRecommendation {
  ${mediaDefaultQuery}
}
`

export const recommendationsQuery = (
    fields: string = recommendationsDefaultFields
) => `
    query Recommendation (
        $page:Int = 1, 
        $perPage: Int = 20, 
        $id: Int,
        $mediaId: Int,
        $mediaRecommendationId: Int,
        $userId: Int,
        $rating: Int,
        $onList: Boolean,
        $rating_greater: Int,
        $rating_lesser: Int,
        $sort: [RecommendationSort]
    ) {
        Page(page: $page, perPage: $perPage) {
            pageInfo {
                total
                perPage
                currentPage
                lastPage
                hasNextPage
            }
            recommendations(
                id: $id,
                mediaId: $mediaId,
                mediaRecommendationId: $mediaRecommendationId,
                userId: $userId,
                rating: $rating,
                onList: $onList,
                rating_greater: $rating_greater,
                rating_lesser: $rating_lesser,
                sort: $sort
            ) {
                ${fields}
            }
        }
    }
`
export const GenreThumbQuery = (genre: string) => `
    { 
        Page (
            perPage: 10
        ) {
            media (
                genre: ${genre}, 
                sort: TRENDING_DESC, 
                type: ANIME, 
                countryOfOrigin:"JP"
            ) {
                id 
                bannerImage 
                title {
                    english 
                    romaji 
                    userPreferred
                } 
            } 
        } 
    }
`

export const userRecommendationsQuery = (
    fields: string = mediaDefaultQuery!
) => `
    { 
        Page(page: 1, perPage:30) { 
            pageInfo { 
                total 
                currentPage 
                hasNextPage 
            } 
            recommendations(sort: RATING_DESC, onList: true) { 
                rating 
                userRating 
                mediaRecommendation { 
                    ${fields}
                } 
            }
             
        } 
    }
`

export const mediaDetailsQuery = (
    id: number,
    fields: string = mediaDetailsDefaultFields
) => `
    {
        Media(id:${id}) {
            ${mediaDetailsDefaultFields}
        }
    }
`
