import React, { Component } from 'react'
import WorldMap from './WorldMap'
import { connect } from 'react-redux'
import { select } from 'd3-selection'
import { feature } from 'topojson-client'



class MapContainer extends Component {

  constructor(props) {
    super(props)
   
    this.state = {
     
    }
  }

  
  //uses topojson-client library method 'feature' to transform topo-json map data into geo-json map data
  //function is in container becaues it will not be required for map data already in geo-json format
  transformGeoData(geoData) {
    if (geoData && geoData.objects) return feature(geoData, geoData.objects.countries).features
    else return []
  }

  //join geographic and WHO orgnaization data into single structure to append to DOM 
  joinData(props, node) {
    //1.  Determine data source and filter/transform data as required
    const geoData = props ? props.geoData : this.props.geoData//ternary operator: function called first time from componentWillRecieveProps     
    const geoDataTransformed = this.transformGeoData(geoData)

    //2.  Combine data
    const mapData = geoDataTransformed
    //set the local state with the map data 
    this.setState({
      mapData: mapData
    })
  }

  //runs the function when the store has updated with the data from various data sources
  componentWillReceiveProps(nextProps) {
    this.joinData(nextProps)
  }


  render() {
    return (
      <div>
        <WorldMap
          mapData={this.state.mapData}
          width={1000}
          height={500}
          onClick={this.joinData}
        />
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    geoData: state.geoData,
  }
}

export default connect(mapStateToProps)(MapContainer)