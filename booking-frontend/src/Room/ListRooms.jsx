import React from 'react'
import Grid from "@material-ui/core/Grid";
import RoomService from "../_services/RoomService";
import CircularProgress from "@material-ui/core/CircularProgress";
import RoomCard from "./components/RoomCard";
import {Container} from "@material-ui/core";
import Footer from "../Layouts/Footer";
import Menu from "../Layouts/Menu";

const roomService = new RoomService();

export default class ListRooms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      limit: 21,
      rooms: [],
      isLoading: true,
    };

  }


  componentDidMount() {
    this.getRooms()
  }

  getRooms = () => {
    this.setState({isLoading: true});
    roomService.getRooms(this.state.limit, this.state.currentPage).then(rooms => {
      console.log(rooms);
      this.setState({
        rooms: rooms,
        isLoading: false,
      })
    })
  };

  render() {
    return (
        <React.Fragment>
          <Menu/>
          <Container fixed>
            <Grid container spacing={4} style={{padding: '50px 0 100px 0'}}>
              {!this.state.isLoading ?
                  this.state.rooms.map((room, index) =>
                      <Grid key={index} item xs={12} sm={6} md={4}>
                        <RoomCard {...room} />
                      </Grid>)
                  : <CircularProgress/>
              }
            </Grid>
          </Container>
          <Footer/>
        </React.Fragment>
    )
  }
}
