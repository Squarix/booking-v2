import React, { Component } from 'react';
import { connect } from "formik";

import './index.css';
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Grid from "@material-ui/core/Grid";

class RoomImages extends Component {
  handleCapture = ({ target }) => {
    const { values: { images = [] }, setFieldValue } = this.props.formik;

    if (target.files.length) {
      const reader = new FileReader();
      reader.onload = function (e) {
        target.files[0].preview = e.target.result;
        setFieldValue('images', [...images, target.files[0]]);
      };

      reader.readAsDataURL(target.files[0]);
    }
  };


  handleMainChanged = index => {
    const { setFieldValue } = this.props.formik;
    setFieldValue('mainImage', index);
  };


  render() {
    const { values: { images = [], mainImage } } = this.props.formik;
    return (
      <Grid container>
        <Grid item xs={12} className="room-images__grid-item">
          <input
            accept='image/*'
            style={{ display: 'none' }}
            id='button-file'
            name='images'
            multiple
            type='file'
            onChange={this.handleCapture}
          />
          <label htmlFor='button-file'>
            <Button
              variant='contained'
              color='secondary'
              component='span'
              startIcon={<CloudUploadIcon/>}
            >
              Upload
            </Button>
          </label>
          <Grid className="room-images__grid-item" container>
            {images.map((image, index) => (
                <Grid key={index} xs={12} md={5} item className="room-images__image-container">
                  <img onClick={() => this.handleMainChanged(index)} src={image.preview} className="room-images__image"/>
                  {(mainImage === index) && <div className="room-images__image-main"/>}
                </Grid>
              )
            )}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default connect(RoomImages);
