import React from 'react';
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import withStyles from "@material-ui/core/styles/withStyles";
import Fab from "@material-ui/core/Fab";

import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import { connect } from "react-redux";
import { Snackbar } from "@material-ui/core";
import { Alert, Pagination } from "@material-ui/lab";
import { editRoom, rooms } from "../reducers/admin-reducer";
import styles from "../Profile/styles";

import './index.css';

class Home extends React.Component {
  state = {
    page: 1,
    limit: 20,

    snackbar: {},
  }

  componentDidMount() {
    this.updateRooms()
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

  async changeStatus(status, roomId) {
    await this.props.editRoom({ id: roomId, body: { status }});
    let message; let type;
    if (this.props.editRoomSuccess) {
      message = 'Room successfully edited';
      type = 'success'
      this.updateRooms();
    } else if (this.props.editRoomError) {
      message = `Room edit was failed: ${  this.props.editRoomError}`;
      type = 'error';
    }

    this.setState({ snackbar: { type, message, open: true }});
  }

  updateRooms = () => {
    const { limit, page } = this.state;
    const urlParams = new URLSearchParams();
    urlParams.append('offset', String(limit * (page - 1)));
    urlParams.append('limit', limit);

    this.props.fetchRooms({ urlParams });
  }

  onPageChange = page => {
    this.setState({ page }, this.updateRooms);
  }

  getPagination() {
    const { page, limit } = this.state;
    const { roomsCount } = this.props;

    return (
      <div className="admin-rooms__pagination">
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


  render() {
    const { classes, rooms } = this.props;

    return (
      <>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Room</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">City</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Guests amount</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Rooms amount</TableCell>
              <TableCell align="center">User</TableCell>
              <TableCell align="center" />
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms.map((room, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  <a href={`/rooms/${room.id}`}>
                    {room.id}
                  </a>
                </TableCell>
                <TableCell align="center" scope="row">
                  {room.address}
                </TableCell>
                <TableCell align="center">
                  {room.city?.name}
                </TableCell>
                <TableCell align="center">
                  {room.description}
                </TableCell>
                <TableCell align="center">
                  {room.guestsAmount}
                </TableCell>
                <TableCell align="center">{room.todayPrice}</TableCell>
                <TableCell align="center">{room.size}</TableCell>
                <TableCell align="center">{room.user.email}</TableCell>
                <TableCell>
                  <Fab
                    aria-label="Approve"
                    className={classes.fab}
                    color="primary"
                    onClick={() => this.changeStatus('published', room.id)}
                    size="small"
                  >
                    <CheckIcon />
                  </Fab>
                  <Fab
                    aria-label="Decline"
                    className={classes.fab}
                    color="secondary"
                    onClick={() => this.changeStatus('declined', room.id)}
                    size="small"
                  >
                    <ClearIcon />
                  </Fab>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {this.getPagination()}
        {this.getSnackBar()}
      </>
    )
  }
}

const styledComponent = withStyles(styles, { withTheme: true })(Home);

export default connect(state => ({
  rooms: state.admin.rooms.data,
  roomsCount: state.admin.rooms.count,
  editRoomSuccess: state.admin.editRoom.success,
  editRoomError: state.admin.editRoom.error,
}), {
  fetchRooms: rooms.action,
  clearRooms: rooms.clearAction,
  editRoom: editRoom.action,
  clearEditRoom: editRoom.clearAction,
})(styledComponent);

