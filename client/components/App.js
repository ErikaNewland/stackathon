import React, { Component } from 'react';
import { select, selectAll } from 'd3-selection'
import {connect} from 'react-redux'
import {gettingGeoData} from '../store'
import MapContainer from './MapContainer'


class App extends Component {
  
  componentDidMount() {
    this.props.gettingGeoData()

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
  } 
}

export default connect(mapStateToProps, mapDispatchToProps)(App)