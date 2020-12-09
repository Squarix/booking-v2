import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { Select as MaterialSelect } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Button from "@material-ui/core/Button";
import { connect } from "formik";

import './index.css';

class RoomFilter extends Component {
  state = {
    newFilter: '',
    newFilterCategory: null,
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  handleDeleteFilter = (index) => {
    const { values: { filters }, setFieldValue } = this.props.formik;
    filters.splice(index, 1);
    setFieldValue('filters', [...filters]);
  };

  addFilter = () => {
    if (this.state.newFilter && this.state.newFilterCategory) {
      const { values: { filters = [] }, setFieldValue } = this.props.formik;
      filters.push({ filter: this.state.newFilter, categoryId: this.state.newFilterCategory, created: true });

      setFieldValue('filters', [...filters]);

      this.setState({
        newFilter: '',
        newFilterCategory: null
      })
    }
  };


  handleFilterCategoryChange = event => {
    this.setState({
      newFilterCategory: event.target.value
    })
  }

  render() {
    const { formik: { values }, categories } = this.props;
    return (
      <Grid container>
        <Grid item xs={12} className="room-filter__grid-item">
          {!!values.filters?.length && (
            <Paper className="room-filter__chips-container">
              {values.filters.map((data, index) => (
                <Chip
                  key={index}
                  label={data.filter}
                  onDelete={() => this.handleDeleteFilter(index)}
                  className="room-filter__chips-chip"
                />
              ))}
            </Paper>
          )}
        </Grid>
        <Grid item md={4} xs={12} className="room-filter__grid-item">
          <FormControl fullWidth>
            <InputLabel>Filter category</InputLabel>
            <MaterialSelect
              labelWidth={200}
              value={this.state.newFilterCategory}
              onChange={event => this.handleFilterCategoryChange(event)}
            >
              <MenuItem value=''/>
              {categories.map(category => (
                  <MenuItem key={category.id} value={category.id}>
                    {' '}
                    {category.name}
                  </MenuItem>
                )
              )}
            </MaterialSelect>
          </FormControl>
        </Grid>
        <Grid item md={4} xs={12} className="room-filter__grid-item">
          <FormControl variant='outlined' fullWidth>
            <InputLabel htmlFor='component-outlined'>
              Filter
            </InputLabel>
            <OutlinedInput
              id='component-outlined'
              labelWidth={50}
              name="newFilter"
              value={this.state.newFilter}
              onChange={this.handleInputChange}
            />
          </FormControl>
        </Grid>
        <Grid item md={4} xs={12} className="room-filter__grid-item">
          <Button variant="contained" className="room-filter__add-button" onClick={this.addFilter}>
            Add filter
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default connect(RoomFilter);
