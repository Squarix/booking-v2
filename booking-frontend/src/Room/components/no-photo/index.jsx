import React from "react";

import { Typography } from "@material-ui/core";
import PhotoCameraOutlinedIcon from "@material-ui/icons/PhotoCameraOutlined";

export default function NoPhotoPlaceholder(props) {
  return (
    <div
      className={props.className}
      style={{
      height: '200px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}
    >
      <PhotoCameraOutlinedIcon fontSize="large" />
      <Typography variant="body1">No photo provided</Typography>
    </div>
  )
}
