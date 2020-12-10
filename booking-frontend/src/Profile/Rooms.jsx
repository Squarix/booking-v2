import React, { Component } from 'react'
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import withStyles from "@material-ui/core/styles/withStyles";

import Grid from "@material-ui/core/Grid";
import styles from "./styles";
import { connect } from "react-redux";
import { userRooms } from "../reducers/room-reducer";
import { Pagination } from "@material-ui/lab";

class Rooms extends Component {
  state = {
    limit: 20,
    page: 1
  }

  componentDidMount() {
    this.fetchRooms();
  }

  fetchRooms() {
    const { limit, page } = this.state;
    const urlParams = new URLSearchParams();
    urlParams.append('offset', String(limit * (page - 1)));
    urlParams.append('limit', limit);

    this.props.fetchRooms({ urlParams });
  }


  onPageChange = page => {
    this.setState({ page }, this.fetchRooms);
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
    if (!rooms) return null;

    return (
      <>
        <Grid container xs={12} className={classes.tableContainer}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Apartment</TableCell>
                <TableCell align="center">Guests</TableCell>
                <TableCell align="center">Rooms</TableCell>
                <TableCell align="center">Address</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">City</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {rooms.map(room => (
                <TableRow key={room.id}>
                  <TableCell component="th" scope="row">
                    <a href={`/rooms/${room.id}`}>
                      {room.id}
                    </a>
                  </TableCell>
                  <TableCell align="center">
                    {room.guestsAmount}
                  </TableCell>
                  <TableCell align="center" scope="row">
                    {room.size}
                  </TableCell>
                  <TableCell align="center">
                    {room.address}
                  </TableCell>
                  <TableCell align="center">
                    {room.description}
                  </TableCell>
                  <TableCell align="center">
                    {room.status}
                  </TableCell>
                  <TableCell align="center">
                    {room.price}
                  </TableCell>
                  <TableCell align="center">
                    <a href={`/rooms/${room.id}`}>View</a>
                    {'  '}
                    <a href={`/rooms/${room.id}/update`} target="_blank" rel="noopener norefferer">
                      Edit
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {this.getPagination()}
        </Grid>
      </>
    )
  }
}


const styledComponent = withStyles(styles, { withTheme: true })(Rooms);

export default connect(state => ({
  rooms: state.room.userRooms.data,
  roomsCount: state.room.userRooms.count,
}), {
  fetchRooms: userRooms.action,
})(styledComponent);
