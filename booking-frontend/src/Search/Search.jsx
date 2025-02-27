import React from 'react'
import { connect } from "react-redux";

import './index.css';
import withStyles from '@material-ui/core/styles/withStyles';

import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';


import ApartmentIcon from '@material-ui/icons/Apartment';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ExploreIcon from '@material-ui/icons/Explore';
import GroupIcon from "@material-ui/icons/Group";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import SortIcon from '@material-ui/icons/Sort';

import { MenuItem, Select, Switch } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { Pagination } from "@material-ui/lab";
import BookingTextField from "./components/text-field";
import { menuProps } from "./constants";

import MapComponent from "./components/google-map";
import RoomRow from "../Room/components/room-row";
import { filters } from "../reducers/filter-reducer";
import { publicRooms } from "../reducers/room-reducer";
import Index from '../Room/components/room-card';
import Menu from '../Layouts/Menu';
import styles from './styles';
import { analystRoomFocusAction, analystViewAction } from "../global-analyst";


class Search extends React.Component {
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
    limit: 10,
    sortingSelect: false,
    order: '',
    viewMode: 'default',
    city: '',

    rooms: []
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleSliderChange = (e, val) => {
    this.setState({
      priceValues: val
    })
  }

  getRequestParams = () => {
    const { guests, size, address, rooms, selectedFilters, order, page, limit, city } = this.state;
    const params = new URLSearchParams();

    params.append('offset', String((page - 1) * limit));
    params.append('limit', limit);

    const requestParams = Object
      .keys({ guests, size, address, rooms, order, city })
      .filter(key => this.state[key])
      .reduce((acc, cur) => {
        acc[cur] = this.state[cur];
        return acc;
      }, {});

    requestParams.selectedFilters = Object.keys(selectedFilters).filter(key => selectedFilters[key]);

    Object.keys(requestParams).forEach(key => {
      params.append(key, requestParams[key]);
    })

    return params;
  }

  handleSearch = async () => {
    await this.props.fetchRooms({ urlParams: this.getRequestParams() });
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
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
    return this.props.filters?.map(({ id, filter }) => (
      <Chip
        color="primary"
        key={id}
        onClick={() => this.chipClicked(id)}
        label={filter}
        variant={getVariant(selectedFilters[id])}
      />
      )
    )
  }

  onPageChange = page => {
    this.setState({ page }, this.handleSearch);
  }

  getPagination() {
    const { viewMode, page, limit } = this.state;
    const { roomsCount } = this.props;
    if (viewMode !== 'default') return;

    return (
      <div className="list-rooms__pagination">
        <Pagination
          size="large"
          onChange={(e, selectedPage) => this.onPageChange(selectedPage)}
          count={Math.ceil(roomsCount / limit)}
          page={page}
          color="primary"
        />
      </div>
    )
  }

  handleView = id => {
    analystViewAction(id, this.getRequestParams().toString())
  }

  handleFocus = id => {
    let date;
    return (isBlur = false) => {
      if (isBlur) {
        const time = new Date() - date;
        if (time >= 4000) {
          analystRoomFocusAction(id, time, this.getRequestParams().toString());
        }
      } else {
        date = new Date()
      }
    }
  }

  getItemsContainer() {
    const { viewMode } = this.state;
    if (viewMode === 'default')
      return this.props.rooms?.map(room => (
        <Grid key={room.id} xs={12} item>
          <RoomRow onFocus={this.handleFocus(room.id)} onClick={() => this.handleView(room.id)} {...room} />
        </Grid>
        )
      )

    const markers = this.props.rooms?.map(
      room => ({ lat: room.lat, lng: room.lng, infoBox: <Index {...room} /> })
    );

    return (
      <MapComponent markers={markers} />
    );
  }

  openCloseSortMenu = () => {
    const { sortingSelect } = this.state;
    this.setState({ sortingSelect: !sortingSelect });
  }

  onSortChange = ({ target: { value } }) => {
    this.setState({ order: value, page: 1 }, () => {
      this.handleSearch();
      this.openCloseSortMenu();
    });
  }

  onSearch = () => {
    this.setState({ page: 1 }, () => {
      this.handleSearch();
    });
  }

  changeViewMode = ({ target: { checked } }) => {
    this.setState({ viewMode: checked ? 'map' : 'default' });
  }

  getViewModeSwitcher() {
    return (
      <Grid component="label" container alignItems="center" spacing={1}>
        <Grid item>Default</Grid>
        <Grid item>
          <Switch onChange={this.changeViewMode} />
        </Grid>
        <Grid item>Map</Grid>
      </Grid>
    );
  }

  render() {
    const { classes } = this.props;
    const { sortingSelect } = this.state;

    return (
      <>
        <Menu />
        <Container className={classes.container}>
          <Grid container>
            <Grid item xs={12} className="list-rooms__sort-container">
              {this.getViewModeSwitcher()}
              <Select
                open={sortingSelect}
                className="list-rooms__sort-select"
                onChange={this.onSortChange}
                onClose={this.openCloseSortMenu}
                MenuProps={menuProps}
              >
                <MenuItem value="ASC">
                  Price ascending
                  <ArrowUpwardIcon />
                </MenuItem>
                <MenuItem value="DESC">
                  Price descending
                  <ArrowDownwardIcon />
                </MenuItem>
                <MenuItem value="">Price default </MenuItem>
              </Select>
              <IconButton
                aria-label="change sorting"
                color="primary"
                component="span"
                onClick={this.openCloseSortMenu}
              >
                <SortIcon />
              </IconButton>
            </Grid>
            <Grid item xs={12} md={3}>
              <BookingTextField
                name="city"
                value={this.state.city}
                onChange={this.handleInputChange}
                className={classes.textField}
                icon={<ExploreIcon />}
              />
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
              <div className={classes.margin} />
              <Button variant='outlined' color='primary' className={classes.button} onClick={this.onSearch}>
                Search
              </Button>
            </Grid>
            <Grid item xs={12} md={9}>
              <Grid container>
                {this.getItemsContainer()}
                {this.getPagination()}
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
  rooms: state.room.publicRooms.data,
  roomsCount: state.room.publicRooms.count,
}), {
  fetchRooms: publicRooms.action,
  clearRooms: publicRooms.clearAction,
  fetchFilters: filters.action,
  clearFilters: filters.clearAction,
})(styledComponent);
