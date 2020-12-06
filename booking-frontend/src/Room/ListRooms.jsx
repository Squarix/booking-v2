import React from 'react'
import Grid from "@material-ui/core/Grid";
import RoomService from "../_services/RoomService";
import CircularProgress from "@material-ui/core/CircularProgress";
import RoomCard from "./components/RoomCard";
import {Container} from "@material-ui/core";
import Footer from "../Layouts/Footer";
import Menu from "../Layouts/Menu";
import { connect } from "react-redux";
import { publicRooms } from "../reducers/room-reducer";

const roomService = new RoomService();

class ListRooms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      limit: 21,
    };
  }


  componentDidMount() {
    this.props.getPublicRooms({ urlParams: this.getSearchParams() });
  }

  getSearchParams = () => {
    const { limit, currentPage} = this.state;
    const params = new URLSearchParams();
    params.append('limit', limit);
    params.append('offset', String(limit * (currentPage - 1)));

    return params;
  }

  getRooms() {
    const { rooms, roomsLoading } = this.props;
    if (roomsLoading) return <CircularProgress/>;

    return rooms.map(room => (
      <Grid key={room.id} item xs={12} sm={6} md={4}>
        <RoomCard {...room} />
      </Grid>
    ))
  }

  render() {
    return (
        <>
          <Menu/>
          <Container fixed>
            <Grid container spacing={4} style={{padding: '50px 0 100px 0'}}>
              {this.getRooms()}
            </Grid>
          </Container>
          <Footer/>
        </>
    )
  }
}


export default connect(state => ({
  rooms: state.room.publicRooms.data,
  roomsLoading: state.room.publicRooms.pending,
}), {
  getPublicRooms: publicRooms.action,
  clearPublicRooms: publicRooms.clearAction,
})(ListRooms);
