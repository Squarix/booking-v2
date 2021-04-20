import React from 'react';
import {connect} from "react-redux";

import Grid from "@material-ui/core/Grid";
import Pagination from "@material-ui/lab/Pagination";

import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import EmailIcon from '@material-ui/icons/Email';
import {publicRooms} from "../reducers/room-reducer";
import RoomRow from "../Room/components/room-row";
import Menu from "../Layouts/Menu";
import {user} from "../reducers/user-reducer";


class User extends React.Component {
  state = {
    page: 1,
    limit: 20,
  }
  
  componentDidMount() {
    this.handleSearch();
  }

  handleSearch = () => {
    this.props.fetchUser({ id: this.props.match.params.userId });
    this.props.fetchRooms({ urlParams: this.getRequestParams() });
  }
  
  getRequestParams() {
    const { limit, page } = this.state;
    const params = new URLSearchParams();

    params.append('offset', String((page - 1) * limit));
    params.append('limit', limit);
    params.append('userId', this.props.match.params.userId);
    
    return params;
  }

  getPagination() {
    const { page, limit } = this.state;
    const { roomsCount } = this.props;

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

  onPageChange = page => {
    this.setState({ page }, this.handleSearch);
  }

  render() {
    const { classes, user } = this.props;
    return (
      <>
        <Menu />
        <Grid container className={classes.container} justify="center">
          <Grid item xs={12} justify="flex-start" className={classes.hotelInfo}>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="h4">
                  {`${user?.firstName} ${user?.lastName}`}
                </Typography>
              </Grid>
              <Grid item xs={12} container alignItems="center">
                <EmailIcon />
                <Typography variant="subtitle1">{user?.email}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {this.props.rooms?.map(room => (
              <Grid key={room.id} xs={12} item>
                <RoomRow onFocus={() => {}} onClick={() => {}} {...room} />
              </Grid>
            ))}
          </Grid>
          <Grid item xs={12}>
            {this.getPagination()}
          </Grid>
        </Grid>
      </>
    );
  }
}

const styles = (theme) => ({
  container: {
    margin: '50px auto',
    maxWidth: 1200,
  },
  hotelInfo: {
    textAlign: 'left',
    padding: '0 0 50px 20px'
  }
})

export default connect(state => ({
  user: state.user.user.data,
  rooms: state.room.publicRooms.data,
  roomsCount: state.room.publicRooms.count,
}), {
  fetchUser: user.action,
  fetchRooms: publicRooms.action,
})(withStyles(styles)(User));