import axios, { CreateAxiosDefaults } from 'axios'

export default axios.create({
    baseURL: 'https://graphql.anilist.co',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
})
