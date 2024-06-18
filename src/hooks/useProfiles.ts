import { getUser } from '@/api/anilist/index'
import { IUser } from '@/context/AuthenticationContextProvider'
import { Maybe } from '@/types/anilist'
import axios, { AxiosError } from 'axios'
import React from 'react'
import {
    useQuery,
    UseQueryOptions,
    useMutation,
    useQueryClient,
} from 'react-query'

export interface Profile {
    id?: Maybe<number>
    avatar?: Maybe<string>
    username?: Maybe<string>
    bg?: Maybe<string>
    adult: boolean
    episodesWatched?: Maybe<number>
    episodeWatched?: Maybe<number>
    chapterRead?: Maybe<number>
    accessToken?: Maybe<string>
}

const useProfiles = (
    user: IUser,
    options?: Omit<
        UseQueryOptions<Profile[], AxiosError, Profile[]>,
        'queryKey' | 'queryFn'
    >
) => {
    return useQuery(
        [`get-user-profiles`, user?.profiles],
        //@ts-ignore
        async ({ signal }) => {
            if (!user) return
            const promises: Profile[] = []

            for (const i in user.profiles) {
                let j = user.profiles[i]

                const updateProfile = await getUser(true, j.accessToken)
                //@ts-ignore
                updateProfile['accessToken'] = j.accessToken

                promises.push(updateProfile)
            }

            return await Promise.all(promises)
        },
        //@ts-ignore
        options
    )
}

export const useDeleteProfile = (
    user: IUser,
    id: string,
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>
) => {
    const queryClient = useQueryClient()

    return useMutation(
        async () => {
            await axios(`http://localhost:5000/api/v1/profile/delete/${id}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${user?.accessToken}`,
                },
            })
        },
        {
            onMutate: async (issueId) => {
                // cancel all queries that contain the key "issues"
                await queryClient.cancelQueries([
                    'get-user-profiles',
                    user.profiles,
                ])

                const ListData = queryClient.getQueryData<Profile[]>([
                    'get-user-profiles',
                    user,
                ])

                if (!ListData) {
                    return
                }

                const updatedData = ListData.filter(
                    (profile) => profile.id !== Number(id)
                )

                queryClient.setQueryData<Profile[]>(
                    ['get-user-profiles', user.profiles],
                    updatedData
                )

                return [...ListData]
            },
            onSuccess: () => {
                setUser((prev) => {
                    const newData: IUser | null = prev
                        ? {
                              ...prev,
                              profiles: prev?.profiles.filter(
                                  (profile) => profile.userId !== id
                              ),
                          }
                        : null

                    return newData
                })
            },
            onError: (err, issueId, context) => {
                if (context) {
                    queryClient.setQueryData(
                        ['get-user-profiles', user.profiles],
                        context
                    )
                }
            },
            onSettled: () => {
                queryClient.invalidateQueries([
                    'get-user-profiles',
                    user.profiles,
                ])
            },
        }
    )
}

export default useProfiles
