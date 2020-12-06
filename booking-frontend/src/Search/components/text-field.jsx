import React from "react";
import PropTypes from 'prop-types'

import { capitalize, InputAdornment, TextField } from "@material-ui/core";

export default function BookingTextField({ name, label, placeholder, icon, onChange, value, className }) {
  const defaultLabel = capitalize(name);
  const defaultPlaceholder = capitalize(name)
  return (
    <TextField
      id='outlined-error'
      label={label || defaultLabel}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder || defaultPlaceholder}
      className={className}
      margin='normal'
      variant='outlined'
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {icon}
          </InputAdornment>
        )
      }}
    />
  )
}

TextField.propTypes = {
  icon: PropTypes.object,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  className: PropTypes.object,
  placeholder: PropTypes.string,
}
