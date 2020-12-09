import React, { Component } from 'react';
import { connect } from "formik";
import PropTypes from "prop-types";

import MapComponent from "../../../Search/components/google-map";

class RoomMap extends Component {
  onMapSelection = ({ lat, lng }) => {
    const { setFieldValue } = this.props.formik;
    this.reverseGeocoding(lat(), lng());

    setFieldValue('lat', lat());
    setFieldValue('lng', lng());
  }

  reverseGeocoding = (lat, lng) => {
    fetch(`http://api.positionstack.com/v1/reverse?access_key=b09129e912cd202afdea9fcaf3fbbd38&query=${lat},${lng}`)
      .then(data => data.json())
      .then(({ data }) => {
        const { formik: { setFieldValue }, countries, cityName, countryName } = this.props;
        const country = countries.find(c => c.name === data[0].country);

        setFieldValue(cityName, data[0].county || data[0].locality || data[0].region)
        setFieldValue(countryName, country.id);
      });
  }



  render() {
    return (
      <MapComponent selectable onSelect={this.onMapSelection} />
    );
  }
}

RoomMap.propTypes = {
  cityName: PropTypes.string.isRequired,
  countryName: PropTypes.string.isRequired,
  countries: PropTypes.array.isRequired
}

export default connect(RoomMap);
