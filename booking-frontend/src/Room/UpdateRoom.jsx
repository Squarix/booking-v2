import React from 'react';
import {Container} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import styles from "../Profile/styles";
import EditIcon from '@material-ui/icons/Edit';
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import SaveIcon from '@material-ui/icons/Save';
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import RoomService from "../_services/RoomService";
import Menu from "../Layouts/Menu";
import AuthService from "../_services/AuthService";
import {Redirect} from "react-router-dom";

const roomService = new RoomService();
const authService = new AuthService();

const currentUser = authService.getProfile();

class UpdateRoom extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    id: '',
    city: '',
    address: '',
    todayPrice: '',
    editable: '',
    redirect: false,
  }

  componentDidMount() {
    roomService.getRoom(this.props.match.params.id).then(room => {
      console.log(room)
      if (room.user.email === currentUser.email) {
        this.setState({
          ...room
        })
      } else {
        this.setState({
          redirect: true
        })
      }
    })
  }

  handleSave = () => {
    roomService.updateRoom({
      address: this.state.address,
      todayPrice: Number.parseInt(this.state.todayPrice)
    }, this.props.match.params.id)
        .then((res) => {
          console.log(res)
        })
  }

  handleChangeEditable(key) {
    this.setState({editable: key})
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const {classes} = this.props
    const editables = [
      {key: 'Address', value: this.state.address, state: 'address'},
      {key: 'Price', value: this.state.todayPrice, state: 'todayPrice'},
    ]
    return (
        <>
          <Menu/>
          <Container style={{marginTop: '50px'}} fixed>
            <Grid container className={classes.main} spacing={4}>
              {editables.map(editable =>
                  <Grid xs={4} item className={classes.profileEntry}>
                    <label>{editable.key}</label>
                    <div className={classes.editable}>
                      {editable.state !== this.state.editable ?
                          <>
                            <Typography key={editable.key} variant={"h5"}>{editable.value || 'Not set'}</Typography>
                            <IconButton
                                key={editable.state} aria-label="Edit" className={classes.margin}
                                onClick={() => this.handleChangeEditable(editable.state)}
                            >
                              <EditIcon fontSize="small"/>
                            </IconButton>
                          </>
                          :
                          <>
                            <TextField
                                key={editable.key}
                                id="standard-search"
                                name={editable.state}
                                label={editable.key}
                                value={editable.value || ''}
                                onChange={this.handleInputChange}
                                type="text"
                                className={classes.textField}
                                margin="normal"
                            />
                            <IconButton
                                key={editable.state}
                                aria-label="Save"
                                className={classes.margin}
                                onClick={() => this.handleChangeEditable('')}
                            >
                              <SaveIcon fontSize="small"/>
                            </IconButton>
                          </>
                      }
                    </div>
                  </Grid>
              )}
              <Grid xs={4} item>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.button}
                    startIcon={<SaveIcon/>}
                    onClick={this.handleSave}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Container>
          {
            this.state.redirect ?
                <Redirect to={'/403'}/> : ''
          }
        </>
    );
  }
}

export default withStyles(styles, {withTheme: true})(UpdateRoom);
