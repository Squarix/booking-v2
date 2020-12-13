import 'date-fns';
import React from 'react';
import Grid from "@material-ui/core/Grid";
import { Container, Snackbar, Typography } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import GroupIcon from '@material-ui/icons/Group';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';

import "react-datepicker/dist/react-datepicker.css";

import io from 'socket.io-client';


import DatePicker from "react-datepicker";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Alert } from "@material-ui/lab";
import InfoDialog from "../Layouts/InfoDialog";
import Menu from "../Layouts/Menu";
import { bookings, createBooking, room } from "../reducers/room-reducer";
import { apiUrl } from "../_services/config";
import styles from './styles';
import MapComponent from "../Search/components/google-map";
import { analystImageFocusAction, analystViewDatesAction } from "../global-analyst";

class ViewRoom extends React.Component {
  constructor(props) {
    super(props);

    this.io = io(apiUrl);
    this.io.on('connect', () => {
      this.io.emit('joinRoom', { id: this.props.match.params.id });
      this.io.on('newBooking', booking => {
        const { bookedDates } = this.state;
        bookedDates.push(booking);
        this.setState({ bookedDates });
      })
    })

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    this.state = {
      startDate: null,
      endDate: null,
      totalPrice: null,
      redirectCabinet: false,

      snackbar: {},
      dialogOpen: false,
      bookedDates: [],
    }
  }

  componentDidMount() {
    const roomId = this.props.match.params.id;
    this.props.fetchRoom({ id: roomId });
    this.props.fetchBookings({ id: roomId, collection: 'bookings' });
  }

  onStartDateChange = (date) => {
    this.handleDateChanged(date, null);
  };

  handleDialogClose = () => {
    this.setState({
      dialogOpen: false
    })
  };

  handleDateChanged = (newStartDate, newEndDate) => {
    const { endDate, startDate } = this.state;
    const start = newStartDate || startDate;
    const end = newEndDate || endDate;
    let days = 0;

    if (end && start) {
      days = getDifferenceInDays(start, end);
    }

    this.setState({
      totalPrice: days * this.props.room.price,
      startDate: start,
      endDate: end
    })
  }

  onEndDateChange = (date) => {
    this.handleDateChanged(null, date);
  }

  handleBooking = async () => {
    const roomId = this.props.match.params.id;
    const params = {
      arriveDate: this.state.startDate,
      endDate: this.state.endDate
    };

    await this.props.createBooking({
      id: roomId,
      collection: 'bookings',
      body: params
    });

    let message = ''; let type = 'success';
    if (this.props.bookingSuccess)
      message = 'Booking has been created!';

    if (this.props.bookingError) {
      message = this.props.bookingError.message;
      type = 'error';
    }

    this.setState({ snackbar: { open: true, message, type }})
  }

  closeSnackbar = () => {
    this.setState({ snackbar: { open: false, message: '' }})
  }

  getSnackBar() {
    const { snackbar: { open, type, message } } = this.state;
    if (!open) return null;

    return (
      <Snackbar
        anchorOrigin={{ horizontal: "center", vertical: "top"}}
        autoHideDuration={6000}
        onClose={this.closeSnackbar}
        open={open}
      >
        <Alert severity={type} onClose={this.closeSnackbar}>
          {message}
        </Alert>
      </Snackbar>
    )
  }

  onDatesOpen = () => {
    if (!this.datesOpened) {
      this.datesOpened = true;
      analystViewDatesAction(this.props.room.id);
    }
  }

  onImageFocus = id => {
    let start;
    return (isMouseOut = false) => {
      const { room: { id: roomId } } = this.props;
      if (isMouseOut) {
        const time = new Date() - start;
        if (time > 10 * 1000) {
          analystImageFocusAction(roomId, id);
        }
      } else {
        start = new Date();
      }
    }
  }

  getImageFocusHandler = id => {
    const handler = this.onImageFocus(id);
    return {
      onMouseEnter: () => handler(),
      onMouseOut: () => handler(true),
    }
  }

  render() {
    const { classes, room, bookings } = this.props;
    const { bookedDates } = this.state;
    if (!room)
      return null;

    const mergedBookings = [...bookings, ...bookedDates];

    return (
      <>
        <Menu />
        <Container fixed>
          <Grid container className={classes.bodyContainer}>
            <Grid md={9} xs={12} className={classes.content} item>
              <Typography variant="h1" className={classes.header}>{room.address}</Typography>
              <Carousel className={classes.carousel}>
                {room.images.map(image => (
                  <div
                    className={classes.roomImageDiv}
                    {...this.getImageFocusHandler(image.id)}
                  >
                    <img src={`${apiUrl}/${image.path}`} className={classes.roomImage} />
                  </div>
                )
                )}
              </Carousel>
              <div className={classes.descriptionBlock}>
                <Typography variant="h4">Description</Typography>
                <p className={classes.description}>
                  {room.description}
                </p>
              </div>
            </Grid>
            <InfoDialog
              open={this.state.dialogOpen}
              message={this.state.message}
              title="Booking Info"
              handleClose={this.handleDialogClose}
            />
            <Grid xs={12} md={3} className={classes.sidebars} item>
              <List>
                <ListItem className={classes.label}>
                  <GroupIcon />
                  <span>
                    {room.guestsAmount}
                    {' '}
                    guests
                  </span>
                </ListItem>
                <ListItem className={classes.label}>
                  <AttachMoneyIcon />
                  <span>
                    {' ~'}
                    {room.price}
                    {' '}
                    per day
                  </span>
                </ListItem>
                <ListItem className={classes.label}>
                  <LocationOnIcon />
                  <span>{room?.city.name}</span>
                </ListItem>
                <ListItem className={classes.label}>
                  <PermIdentityIcon />
                  <span>{room?.user.email}</span>
                </ListItem>
                <ListItem className={classes.label}>
                  <DatePicker
                    name="startDate"
                    selected={this.state.startDate}
                    className={classes.datePicker}
                    onChange={this.onStartDateChange}
                    onCalendarOpen={this.onDatesOpen}
                    placeholderText="Select start date"
                    dateFormat="d MMMM yyyy"
                    filterDate={(date) => isValidDate(mergedBookings, date, null, this.state.endDate)}
                  />
                </ListItem>
                <ListItem className={classes.label}>
                  <DatePicker
                    name="endDate"
                    className={classes.datePicker}
                    selected={this.state.endDate}
                    onChange={this.onEndDateChange}
                    placeholderText="Select end date"
                    dateFormat="d MMMM yyyy"
                    filterDate={(date) => isValidDate(mergedBookings, date, this.state.startDate, null)}
                  />
                </ListItem>
                {!!this.state.totalPrice && (
                  <>
                    <ListItem className={classes.label}>
                      <span>
                        Total:
                        {this.state.totalPrice}
                        {' '}
                        $
                      </span>
                    </ListItem>
                    <ListItem className={classes.label}>
                      <Button
                        onClick={this.handleBooking}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                      >
                        Book
                      </Button>
                    </ListItem>
                  </>
                )}
              </List>
            </Grid>
            <Grid item xs={12}>
              <MapComponent markers={[{ lat: room.lat, lng: room.lng }]} />
            </Grid>
            {
              this.state.redirectCabinet ?
                <Redirect to="/profile/bookings" /> : ''
            }
          </Grid>
          {this.getSnackBar()}
        </Container>
      </>
    )
  }
}


function checkDate(dates, searchDate) {
  for (const date of dates) {
    if (new Date(date.arriveDate) <= searchDate && searchDate <= new Date(date.endDate))
      return false
  }

  return true;
}

function isValidDate(bookedDates = [], date, startDate, endDate) {
  let minDate = new Date();
  minDate.setHours(0, 0, 0, 0);

  let maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  minDate = startDate || minDate;
  maxDate = endDate || maxDate;

  return (checkDate(bookedDates, date) && (date > minDate) && (date < maxDate))
}

function getDifferenceInDays(startDate, endDate) {
  return (endDate - startDate) / (24 * 60 * 60 * 1000)
}

const styledComponent = withStyles(styles, { withTheme: true })(ViewRoom);

export default connect(state => ({
  room: state.room.room.data,
  isRoomLoading: state.room.room.pending,
  bookings: state.room.bookings.data,
  bookingSuccess: state.room.createBooking.success,
  bookingError: state.room.createBooking.error,
  bookingPending: state.room.createBooking.pending,
}), {
  fetchRoom: room.action,
  fetchBookings: bookings.action,
  clearBookings: bookings.clearAction,
  clearRoom: room.clearAction,
  createBooking: createBooking.action,
  clearCreateBooking: createBooking.clearAction,
})(styledComponent);
