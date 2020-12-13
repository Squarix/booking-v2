import React from 'react';
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { CircularProgress, Container, withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";

import { Form, Formik, Field, connect as formikConnect } from 'formik';

import RoomService from "../_services/RoomService";
import Menu from "../Layouts/Menu";

import { MultilineTextField, OutlineTextField } from "./components/text-fields/text-fields";
import { OutlineSelectField } from "./components/select-fields/select-fields";

import RoomFilter from "./components/room-filter/room-filter";
import RoomImages from "./components/room-images/room-images";
import RoomMap from "./components/room-map/room-map";

const roomService = new RoomService();

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


class NewRoom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      countries: [],
      filterCategories: [],

      dialogOpen: false,
      dialogMessage: '',
      isFetching: false,
    };
  }

  componentDidMount() {
    roomService.getCountries().then(result => {
      result.json().then(countries => {
        this.setState({
          countries
        });
      })
    });

    roomService.getCategories().then(result => {
      result.json().then(categories => {
        this.setState({
          filterCategories: categories
        })
      })
    })
  };

  handleDialogClose = () => {
    this.setState({
      dialogOpen: false
    })
  };

  handleFormSubmit = values => {
    this.setState({
      isFetching: true,
    })

    const room = {
      countryId: values.country,
      address: values.address,
      description: values.description,
      size: values.size,
      guestsAmount: values.guestsAmount,
      price: values.price,
      city: values.city,
      lat: values.lat,
      lng: values.lng,
    };

    const { images, filters, mainImage } = values;

    let message;
    roomService.createRoom(room, filters, images, mainImage)
      .then(() => {
        message = 'Room has been created. It\'ll be published after moderator approving!';
      })
      .catch(err => {
        message = err.message;
      })
      .finally(() => {
        this.setState({
          dialogMessage: message,
          dialogOpen: true,
          isFetching: false,
        })
      });
  };

  render() {
    const { classes } = this.props;
    const { countries, filterCategories } = this.state;
    return (
      <>
        <Menu />
        <Container fixed>
          <Grid className={classes.container} container>
            <Formik
              initialValues={{
                country: null,
                city: ''
              }}
              onSubmit={this.handleFormSubmit}
              validateOnChange
              validateOnBlur
            >
              <Form className={classes.form}>
                <Grid container>
                  <Grid item xs={12} md={6} className={classes.gridItem}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="country" className={classes.countryLabel}>Country</InputLabel>
                      <Field
                        component={OutlineSelectField}
                        name="country"
                        label="Country"
                        placeholder="Country"
                        InputProps={{ name: 'country', id: 'country' }}
                        disabled
                      >
                        <MenuItem value="" />
                        {countries.map(country =>
                          <MenuItem key={country.id} value={country.id}>{country.name}</MenuItem>
                        )}
                      </Field>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6} className={classes.gridItem}>
                    <Field
                      name="city"
                      type="text"
                      label="City"
                      placeholder="City"
                      disabled
                      component={OutlineTextField}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} className={classes.gridItem}>
                    <Field
                      name="address"
                      type="text"
                      label="Address"
                      placeholder="Address"
                      component={OutlineTextField}
                      required
                    />
                  </Grid>
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
                    <RoomFilter categories={filterCategories} />
                  </Grid>
                  <Grid item xs={12} className={classes.gridItem}>
                    <RoomImages />
                  </Grid>
                  <Grid item xs={12} className={classes.gridItem}>
                    <RoomMap countries={this.state.countries} cityName="city" countryName="country" />
                  </Grid>
                  <Grid item xs={12} className={classes.gridItem}>
                    {this.state.isFetching ?
                      <CircularProgress size={32} className={classes.submitButton} /> : (
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
              <Button onClick={() => this.handleDialogClose()} color='primary'>
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(formikConnect(NewRoom));
