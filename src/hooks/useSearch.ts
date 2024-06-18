import { useQuery, UseQueryOptions } from 'react-query'
import { Search } from '@/api/anilist'
import { Media } from '@/types/anilist'
import { AxiosError } from 'axios'
import { SearchArgs } from '@/api/anilist/schema'

const useSearch = ({ ...restProps }: SearchArgs) => {
    return useQuery(
        [`data-search`, { ...restProps }],
        async () => {
            return Search({ ...restProps })
        },
        {
            refetchOnWindowFocus: false,
        }
    )
}

export default useSearch
