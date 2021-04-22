import React from 'react';
import {Container} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import EditIcon from '@material-ui/icons/Edit';
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import SaveIcon from '@material-ui/icons/Save';
import IconButton from "@material-ui/core/IconButton";

import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import ProfileService from "../_services/ProfileService";
import styles from "./styles";

const profileService = new ProfileService();

class Profile extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    id: '',
    firstName: '',
    lastName: '',
    profileDescription: '',
    editable: ''
  }

  componentDidMount() {
    profileService.getProfile(this.props.match.params.id).then(user => {
      console.log(user)
      this.setState({...user})
    })
  }

  handleSave = () => {
    const {firstName, lastName, profileDescription} = this.state;
    profileService.updateProfile(this.state.id, {
      firstName, lastName, profileDescription
    }).then(res => {
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
      {key: 'Last name', value: this.state.lastName, state: 'lastName'},
      {key: 'First name', value: this.state.firstName, state: 'firstName'},
      {key: 'Profile Description', value: this.state.profileDescription, state: 'profileDescription', multi: true},
    ]
    return (
      <>
        <Container fixed>
          <Typography align="left" variant="h5" className={classes.userNameTitle}>
            User:
            {' '}
            {this.state.email}
          </Typography>
          <Divider />
          <Grid container className={classes.main} spacing={4}>
            <Grid item md={3} xs={12} direction="column" className={classes.avatarContainer}>
              <Avatar className={classes.avatarIcon}>OP</Avatar>
              <div>
                <Button href="/profile/bookings">Bookings</Button>
              </div>
              <div>
                <Button href="/profile/rents">Rents</Button>
              </div>
              <div>
                <Button href="/profile/rooms">Rooms</Button>
              </div>
              <div>
                <Button href="/profile/analytics">Analytics</Button>
              </div>
            </Grid>
            <Grid item md={8} xs={12}>
              {editables.map(editable => (
                <Grid xs={12} xl={6} item className={classes.profileEntry}>
                  <label>{editable.key}</label>
                  <div className={classes.editable}>
                    {editable.state !== this.state.editable ? (
                      <>
                        <Typography key={editable.key} variant="h6">{editable.value || 'Not set'}</Typography>
                        <IconButton
                          key={editable.state}
                          aria-label="Edit"
                          className={classes.margin}
                          onClick={() => this.handleChangeEditable(editable.state)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </>)
                        : (
                          <>
                            <TextField
                              key={editable.key}
                              id="standard-search"
                              name={editable.state}
                              multiline={editable.multi}
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
                              <SaveIcon fontSize="small" />
                            </IconButton>
                          </>
                        )}
                  </div>
                </Grid>
                )
              )}
            </Grid>
            <Grid xs={4} item>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                className={classes.button}
                startIcon={<SaveIcon />}
                onClick={this.handleSave}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }
}

export default withStyles(styles, {withTheme: true})(Profile);
