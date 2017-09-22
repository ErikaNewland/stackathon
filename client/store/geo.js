import axios from 'axios'

const GET_GEO_DATA = 'GET_GEO_DATA'

const getGeoData = (geoData) =>{
  return { type: GET_GEO_DATA, geoData }
}

export const gettingGeoData = () =>{
  return function thunk(dispatch) {
    axios.get("https://unpkg.com/world-atlas@1/world/110m.json")
    .then(res =>  {
      return res.data
    })
    .then((data)=>{
      dispatch(getGeoData(data))
    })
  }
}


export default function (state={}, action) {
  switch(action.type) {
    case GET_GEO_DATA : {
      return action.geoData
    }
    default: return state
  }
}