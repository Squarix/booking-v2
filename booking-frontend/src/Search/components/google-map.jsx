import React, { useState } from 'react';

import { compose, withProps, withStateHandlers } from "recompose"
import { GoogleMap, InfoWindow, Marker, withGoogleMap, withScriptjs } from "react-google-maps"
import { CircularProgress } from "@material-ui/core";
import { usePosition } from 'use-position';


const MapComponent = (props) => {
  const {
    latitude,
    longitude,
  } = usePosition();

  const [selection, setSelection] = useState(null);
  const [currentMarker, setCurrentMarker] = useState(null);

  return (
    <div key={`${latitude}${longitude}`}>
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: latitude, lng: longitude }}
        onClick={e => props.selectable && (() => {
          setSelection(e.latLng);
          props.onSelect(e.latLng);
        })()}
      >
        {props.markers?.map((marker, index) =>
          <Marker position={marker} onClick={() => setCurrentMarker(index)}>
            {currentMarker === index && marker.infoBox && (
              <InfoWindow onCloseClick={() => setCurrentMarker(null)}>
                {marker.infoBox}
              </InfoWindow>
            )}
          </Marker>
        )}
        {selection && <Marker position={selection}/>}
      </GoogleMap>
    </div>
  )
};

MapComponent.propTypes = {}

export default compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDQjxQmtGjQAaARdzYCDcmnthIzO5mTgA4&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <CircularProgress/>,
    containerElement: <div style={{ height: `400px`, width: '100%' }}/>,
    mapElement: <div style={{ height: `100%` }}/>,
  }),
  withScriptjs,
  withGoogleMap
)(MapComponent);
