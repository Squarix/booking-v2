import React from 'react'
import { connect } from "react-redux";

import styles from './styles';
import withStyles from '@material-ui/core/styles/withStyles';

import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";

import Menu from '../Layouts/Menu';
import RoomCard from '../Room/components/RoomCard';

import { publicRooms } from "../reducers/room-reducer";
import { filters } from "../reducers/filter-reducer";

import ApartmentIcon from '@material-ui/icons/Apartment';
import GroupIcon from "@material-ui/icons/Group";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import BookingTextField from "./components/text-field";


class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    priceMax: 1000,
    priceMin: 0,
    priceValues: [0, 1000],
    selectedFilters: {},
    guests: '',
    size: '',
    address: '',
    description: '',
    page: 1,

    rooms: []
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSliderChange = (e, val) => {
    this.setState({
      priceValues: val
    })
  }

  handleSearch = () => {
    const { guests, size, address, rooms, selectedFilters } = this.state;
    const params = new URLSearchParams();

    const requestParams = Object
      .keys({ guests, size, address, rooms })
      .filter(key => this.state[key])
      .reduce((acc, cur) => {
        acc[cur] = this.state[cur];
        return acc;
      }, {});

    requestParams.selectedFilters = Object.keys(selectedFilters).filter(key => selectedFilters[key]);

    Object.keys(requestParams).forEach(key => {
      params.append(key, requestParams[key]);
    })

    this.props.fetchRooms({ urlParams: params });
  }

  chipClicked = id => {
    const { selectedFilters } = this.state;
    selectedFilters[id] = !selectedFilters[id];

    this.setState({ selectedFilters });
  }

  componentDidMount() {
    this.props.fetchFilters();
    this.props.fetchRooms();
  }

  getFilters() {
    const { selectedFilters } = this.state;
    const getVariant = selected => selected ? 'default' : 'outlined';
    return this.props.filters?.map(({ id, filter }) =>
      <Chip
        color="primary"
        key={id}
        onClick={() => this.chipClicked(id)}
        label={filter}
        variant={getVariant(selectedFilters[id])}
      />
    )
  }

  render() {
    const { classes } = this.props;

    return (
      <>
        <Menu/>
        <Container className={classes.container}>
          <Grid container>
            <Grid item xs={12} md={3}>
              <Typography variant="h5">Search params</Typography>
              <div className={classes.margin}/>
              <BookingTextField
                name="guests"
                value={this.state.guests}
                onChange={this.handleInputChange}
                className={classes.textField}
                icon={<GroupIcon />}
              />
              <BookingTextField
                name="rooms"
                placeholder="Rooms amount"
                value={this.state.rooms}
                onChange={this.handleInputChange}
                className={classes.textField}
                icon={<ApartmentIcon />}
              />
              <BookingTextField
                name="address"
                value={this.state.address}
                onChange={this.handleInputChange}
                className={classes.textField}
                icon={<LocationOnIcon />}
              />
              <div className={classes.chipsContainer}>
                {this.getFilters()}
              </div>
              <div className={classes.margin}/>
              <Button variant='outlined' color='primary' className={classes.button} onClick={this.handleSearch}>
                Search
              </Button>
            </Grid>
            <Grid item xs={12} md={9}>
              <Grid container>
                {this.props.rooms?.map(room =>
                  <Grid key={room.id} xs={12} md={6} item className={classes.resultItem}>
                    <RoomCard {...room}/>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </>
    )
  }
}

const styledComponent = withStyles(styles, { withTheme: true })(Search);

export default connect(state => ({
  filters: state.filter.filters.data,
  rooms: state.room.publicRooms.data
}), {
  fetchRooms: publicRooms.action,
  clearRooms: publicRooms.clearAction,
  fetchFilters: filters.action,
  clearFilters: filters.clearAction,
})(styledComponent);
