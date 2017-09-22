import axios from 'axios'
import { NYTIMES_API_KEY } from '../../secrets'


const GET_NYTIMES_DATA = "GET_NYTIMES_DATA"

export const getNytimesData = (nytimesData) => {
    return { type: GET_NYTIMES_DATA, nytimesData }
}

export const gettingNytimesData = () => {
    return function thunk(dispatch) {
        let url = "https://api.nytimes.com/svc/news/v3/content/all/all/0.5.json";
        return axios({
            method: 'get',
            url: url,
            params: {
                'api-key': NYTIMES_API_KEY
            }
        })
        .then(res=>console.log(res))
        .catch(console.log)
    }
}

export default function (state = [], action) {
    switch (action.type) {
        case GET_NYTIMES_DATA: {
            return action.nytimesData
        }
        default: return state
    }
}