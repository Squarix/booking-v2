import React from 'react'
import 'date-fns';

import BookingService from '../_services/BookingService';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "./styles";

import Moment from 'react-moment';
import { Grid } from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

const bookingService = new BookingService();

class Bookings extends React.Component {

  handleStartDateChange = (date) => {
    this.handleDateChange('startDate', date)
  }

  handleEndDateChange = (date) => {
    this.handleDateChange('endDate', date)
  }

  handleDateChange = (name, date) => {
    this.setState({
      [name]: date
    })
    bookingService.getBookings({
      startDate: this.state.startDate ? new Date(this.state.startDate).toISOString() : '',
      endDate: this.state.endDate ? new Date(this.state.endDate).toISOString() : '',
      [name]: new Date(date).toISOString()
    }).then(bookings => {
      this.setState({
        bookings: bookings,
        isFetching: false
      })
    })
  }

  constructor(props) {
    super(props);
    console.log('hi');
  }

  state = {
    bookings: [],
    startDate: null,
    endDate: null,
    isFetching: true
  }

  componentDidMount() {
    this.setState({ isFetching: true })
    bookingService.getBookings()
      .then(bookings => {
        console.log(bookings);
        this.setState({
          bookings: bookings,
          isFetching: false
        })
      })
      .catch(error => {

      })
  }

  getClass(status) {
    const { classes } = this.props;
    if (status === 'approved')
      return classes.approved;
    else if (status === 'approving')
      return classes.approving;
    else
      return classes.declined;
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Arrive date from"
              value={this.state.startDate}
              onChange={this.handleStartDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Arrive date to"
              value={this.state.endDate}
              onChange={this.handleEndDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
        <Grid container xs={12} className={classes.tableContainer}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Room</TableCell>
                <TableCell align="right">Address</TableCell>
                <TableCell align="right">Arrive&nbsp;date</TableCell>
                <TableCell align="right">City</TableCell>
                <TableCell align="right">End&nbsp;date</TableCell>
                <TableCell align="right">Guests amount</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.bookings.map(booking => (
                <TableRow key={booking.room.id}>
                  <TableCell component="th" scope="row">
                    <a href={`/rooms/${booking.room.id}`}>
                      {booking.room.id}
                    </a>
                  </TableCell>
                  <TableCell align="right" scope="row">
                    {booking.room.address}
                  </TableCell>
                  <TableCell align="right">
                    <Moment format={'MMM Do YY'}>
                      {booking.arriveDate}
                    </Moment>
                  </TableCell>
                  <TableCell align="right">{booking.room.city.name}</TableCell>
                  <TableCell align="right">
                    <Moment format={'MMM Do YY'}>
                      {booking.endDate}
                    </Moment>
                  </TableCell>
                  <TableCell align="right">{booking.room.guestsAmount}</TableCell>
                  <TableCell align="right">{booking.price}</TableCell>
                  <TableCell align="right" className={this.getClass(booking.status)}>{booking.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </React.Fragment>
    )
  }
}


export default withStyles(styles, { withTheme: true })(Bookings);
