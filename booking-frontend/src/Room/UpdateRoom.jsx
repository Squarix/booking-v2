import React, {Component} from 'react';
import { connect } from "react-redux";
import { Form, Formik, Field } from 'formik';

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Slide from "@material-ui/core/Slide";

import { CircularProgress, Container, withStyles } from "@material-ui/core";

import Menu from "../Layouts/Menu";
import { MultilineTextField, OutlineTextField } from "./components/text-fields/text-fields";
import { room, updateRoom } from "../reducers/room-reducer";

const styles = theme => ({
  form: {
    width: '60%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '100px',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  gridItem: {
    padding: '10px'
  },
  submitButton: {
    marginTop: '50px',
    width: '100%',
    maxWidth: '350px',
  },
  countryLabel: {
    left: '12px',
    top: '-3px',
  },
  grid: {
    flexGrow: 1,
    justifyContent: 'center'
  }
});

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);


class UpdateRoom extends Component {
  state = {
    dialogOpen: false,
    dialogMessage: '',
    isFetching: false,
  };

  get roomId() {
    return this.props.match.params.id;
  }

  componentDidMount() {
    this.props.fetchRoom({ id: this.roomId });
  }

  handleDialogClose = () => {
    this.setState({
      dialogOpen: false
    })
  };

  handleFormSubmit = async values => {
    const body = {
      address: values.address,
      description: values.description,
      size: values.size,
      guestsAmount: values.guestsAmount,
      price: values.price,
    };

    await this.props.editRoom({ id: this.roomId, body })

    let message;
    if (this.props.roomEditSuccess)
      message = 'Room has been updated. It\'ll be published after moderator approving!';

    if (this.props.roomEditError)
      message = this.props.roomEditError;

    this.props.clearEditRoom();

    this.setState({
      dialogMessage: message,
      dialogOpen: true,
      isFetching: false,
    });
  };

  render() {
    const { classes, room } = this.props;
    if (!room) return null;

    return (
      <>
        <Menu/>
        <Container fixed>
          <Grid className={classes.container} container>
            <Formik
              initialValues={room}
              onSubmit={this.handleFormSubmit}
              validateOnChange
              validateOnBlur
            >
              <Form className={classes.form}>
                <Grid container>
                  <Grid item xs={12} className={classes.gridItem}>
                    <Field
                      name="description"
                      type="text"
                      label="Description"
                      placeholder="Description"
                      component={MultilineTextField}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6} className={classes.gridItem}>
                    <Field
                      name="guestsAmount"
                      type="text"
                      label="Guests amount"
                      placeholder="Guests amount"
                      component={OutlineTextField}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6} className={classes.gridItem}>
                    <Field
                      name="size"
                      type="text"
                      label="Rooms amount"
                      placeholder="Rooms amount"
                      component={OutlineTextField}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6} className={classes.gridItem}>
                    <Field
                      name="price"
                      type="text"
                      label="Price ($)"
                      placeholder="Price ($)"
                      component={OutlineTextField}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} className={classes.gridItem}>
                    {this.props.roomEditPending ?
                      <CircularProgress size={32} className={classes.submitButton}/> : (
                        <Button variant="contained" color="primary" className={classes.submitButton} type="submit">
                          Submit
                        </Button>
                      )}
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </Grid>
          <Dialog
            open={this.state.dialogOpen}
            TransitionComponent={Transition}
            keepMounted
            aria-labelledby='alert-dialog-slide-title'
            aria-describedby='alert-dialog-slide-description'
          >
            <DialogTitle id='alert-dialog-slide-title'>Hey, user</DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-slide-description'>
                {this.state.dialogMessage}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleDialogClose} color='primary'>
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </>
    );
  }
}

const styledComponent = withStyles(styles, { withTheme: true })(UpdateRoom);

export default connect(state => ({
  room: state.room.room.data,
  roomEditSuccess: state.room.updateRoom.success,
  roomEditError: state.room.updateRoom.error,
  roomEditPending: state.room.updateRoom.pending,
}), {
  fetchRoom: room.action,
  clearRoom: room.clearAction,
  editRoom: updateRoom.action,
  clearEditRoom: updateRoom.clearAction,
})(styledComponent);
