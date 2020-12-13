import React from 'react';
import { TextField } from "formik-material-ui";

import './index.css';

export function OutlineTextField(props) {
  return (
    <TextField {...props} variant="outlined" className="width-100" />
  );
}

export function MultilineTextField(props) {
  return (
    <TextField {...props} variant="outlined" multiline className="width-100" />
  );
}


