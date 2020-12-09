import React from 'react';

import { Select } from "formik-material-ui";

export function OutlineSelectField(props) {
  return (
    <Select {...props} variant="outlined" fullWidth />
  );
}
