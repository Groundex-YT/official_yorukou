import { FanartMediaType, FanartSearchResults } from '@/types/fanart'
import Axios, { AxiosRequestConfig } from 'axios'
import { method } from 'lodash'

interface FetchHandlerProps {
    type?: FanartMediaType
    query?: string
    url_v2?: boolean
}

class Fanart {
    async fetchHandler<T>({
        type = FanartMediaType.TV,
        query,
        url_v2,
    }: FetchHandlerProps) {
        try {
            let url: string

            if (url_v2) {
                url = `https://blah.com`
            } else {
                url = `https://fanart.tv/api/search.php`
            }

            const options: AxiosRequestConfig = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    referer: 'https://fanart.tv/',
                },
                url: url,
                params: {},
            }

            if (!url_v2) {
                options.params = {
                    ...options.params,
                    section: type === FanartMediaType.TV ? 'tv' : 'movies',
                    s: 'naruto',
                }
            }

            const data = await Axios<T>(options)

            return data
        } catch (err) {
            console.error(err)
        }
    }

    async Search(query: string): Promise<Array<FanartSearchResults>> {
        const res = await this.fetchHandler<Array<FanartSearchResults>>({
            query,
        })

        //@ts-ignore
        return res!
    }
}

export default Fanart
