import axios from 'axios'

const GET_AGG_ENVMORT_DATA = "GET_AGG_ENVMORT_DATA"

export const getAggEnvMortData = (aggEnvMortData) => {
    return { type: GET_AGG_ENVMORT_DATA, aggEnvMortData }
}

export const gettingAggEnvMortData = () => {
    return function thunk(dispatch) {
        axios.get('/api/envMort/agg:2012')
            .then(res=>dispatch(getAggEnvMortData(res.data)))
            .catch(console.log('error fetching env mort data', err))
    }
}


export default function (state = [], action) {
    switch (action.type) {
        case GET_AGG_ENVMORT_DATA: {
            return action.aggEnvMortData
        }
        default: return state
    }
}