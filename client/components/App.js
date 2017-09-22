import React, { Component } from 'react';
import { select, selectAll } from 'd3-selection'
import {connect} from 'react-redux'
import {gettingGeoData, gettingAggEnvMortData} from '../store'
import MapContainer from './MapContainer'


class App extends Component {
  
  componentDidMount() {
    this.props.gettingGeoData()
    this.props.gettingAggEnvMortData()

  }

  render() {
    return (
      <MapContainer/>
    )
  }

}

const mapStateToProps = (state)=> {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    gettingGeoData: function() {
      return dispatch(gettingGeoData())
    },
    gettingAggEnvMortData: function(){
      return dispatch(gettingAggEnvMortData())
    }
  } 
}

export default connect(mapStateToProps, mapDispatchToProps)(App)