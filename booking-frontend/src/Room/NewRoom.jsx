import React from 'react';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { CircularProgress, Container, withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import RoomService from "../_services/RoomService";
import Menu from "../Layouts/Menu";
import MapComponent from "../Search/components/google-map";

const roomService = new RoomService();

const styles = theme => ({
  form: {
    width: '60%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '100px',
  },
  formControl: {
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  gridItem: {
    padding: '10px'
  },
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing(0.5),
  },
  addButton: {
    marginTop: '25px'
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  submitButton: {
    marginTop: '50px',
    width: '100%',
    maxWidth: '350px',
  },
  imageContainer: {
    backgroundColor: '#e0e0e0',
    border: '3px solid #9e9e9e',
    margin: '10px',
    height: '100%',
    position: 'relative'
  },
  image: {
    maxWidth: '100%'
  },
  grid: {
    flexGrow: 1,
    justifyContent: 'center'
  },
  mainImage: {
    maxWidth: '100%',
    backgroundColor: '#4fc3f7',
    opacity: '0.5',
    zIndex: 2,
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0
  },
});

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);


class NewRoom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      countries: [],
      selectedCountry: '',
      cities: [],
      inputCity: '',
      selectedCity: '',
      address: '',
      description: '',
      size: '',
      guestsAmount: '',
      price: '',
      filterCategories: [],
      newFilterCategory: null,
      newFilter: '',
      filters: [],

      images: [],
      imageFiles: [],
      mainImage: 0,

      dialogOpen: false,
      dialogMessage: '',
      isFetching: false,

    };

  }

  handleMainChanged = (index) => {
    this.setState({
      mainImage: index
    })
  };

  handleCountryChanged = (e) => {
    this.setState({
      selectedCountry: e.target.value
    })
  };

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  handleCapture = ({ target }) => {
    const fileReader = new FileReader();
    const name = target.accept.includes('image') ? 'images' : 'videos';

    if (target.files.length) {
      fileReader.readAsDataURL(target.files[0]);
      fileReader.onload = (e) => {
        this.setState((prevState) => ({
          [name]: [...prevState[name], e.target.result],
          imageFiles: [...prevState.imageFiles, target.files[0]],
        }));
      };
    }
  };

  addFilter = () => {
    if (this.state.newFilter && this.state.newFilterCategory) {
      const {filters} = this.state;
      filters.push({ filter: this.state.newFilter, categoryId: this.state.newFilterCategory });
      this.setState({
        filters,
        newFilter: '',
        newFilterCategory: null
      })
    }
  };

  componentDidMount = () => {
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

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.setState({
      isFetching: true,
    })

    const room = {
      countryId: this.state.selectedCountry,
      address: this.state.address,
      description: this.state.description,
      size: this.state.size,
      guestsAmount: this.state.guestsAmount,
      price: this.state.price,
      city: this.state.selectedCity,
      lat: this.state.lat,
      lng: this.state.lng,
    };

    const { filters, imageFiles, mainImage } = this.state;
    roomService.createRoom(room, filters, imageFiles, mainImage).then((response) => {
      this.setState({
        dialogMessage: response.message,
        dialogOpen: true,
        isFetching: false,
      })
    }).catch(async err => {
      const response = await err.response.json()
      this.setState({
        dialogMessage: response.message,
        dialogOpen: true,
        isFetching: false,
      })
    });
  };

  handleDeleteFilter = (index) => {
    const {filters} = this.state;
    filters.splice(index, 1);
    this.setState({
      filters
    })
  };

  onMapSelection = ({ lat, lng }) => {
    this.reverseGeocoding(lat(), lng());
    this.setState({ lat: lat(), lng: lng() });
  }

  reverseGeocoding = (lat, lng) => {
    fetch(`http://api.positionstack.com/v1/reverse?access_key=b09129e912cd202afdea9fcaf3fbbd38&query=${lat},${lng}`)
      .then(data => data.json())
      .then(({ data }) => {
        const country = this.state.countries.find(c => c.name === data[0].country);
        this.setState({
          selectedCity: data[0].county || data[0].locality || data[0].region,
          selectedCountry: country.id
        });
      })
    ;
  }

  render() {
    const { classes } = this.props;
    const { countries, filters, filterCategories } = this.state;
    return (
      <>
        <Menu />
        <Container fixed>
          <Grid className={classes.container} container>
            <form className={classes.form} noValidate onSubmit={event => this.handleFormSubmit(event)}>
              <Grid container>
                <Grid item xs={12} md={6} className={classes.gridItem}>
                  <FormControl className={classes.formControl} fullWidth>
                    <InputLabel id="demo-simple-select-label">Country</InputLabel>
                    <Select
                      labelWidth={500}
                      value={this.state.selectedCountry}
                      disabled
                      onChange={event => this.handleCountryChanged(event)}
                    >
                      <MenuItem value="" />
                      {countries.map(country =>
                        <MenuItem key={country.id} value={country.id}>{country.name}</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6} className={classes.gridItem}>
                  <FormControl className={classes.formControl} variant="outlined" fullWidth>
                    <InputLabel htmlFor="component-outlined">
                      City
                    </InputLabel>
                    <OutlinedInput
                      disabled
                      id="component-outlined"
                      labelWidth={50}
                      name="selectedCity"
                      value={this.state.selectedCity}
                      onChange={this.handleInputChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6} className={classes.gridItem}>
                  <FormControl className={classes.formControl} variant="outlined" fullWidth>
                    <InputLabel htmlFor="component-outlined">
                      Address
                    </InputLabel>
                    <OutlinedInput
                      name="address"
                      id="component-outlined"
                      labelWidth={75}
                      value={this.state.address}
                      onChange={this.handleInputChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} className={classes.gridItem}>
                  <FormControl className={classes.formControl} variant="outlined" fullWidth>
                    <InputLabel htmlFor="component-outlined">
                      Description
                    </InputLabel>
                    <OutlinedInput
                      multiline
                      name="description"
                      id="component-outlined"
                      labelWidth={150}
                      value={this.state.description}
                      onChange={this.handleInputChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6} className={classes.gridItem}>
                  <FormControl className={classes.formControl} variant="outlined" fullWidth>
                    <InputLabel htmlFor="component-outlined">
                      Guests amount
                    </InputLabel>
                    <OutlinedInput
                      id="component-outlined"
                      labelWidth={150}
                      name="guestsAmount"
                      value={this.state.guestsAmount}
                      onChange={this.handleInputChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6} className={classes.gridItem}>
                  <FormControl className={classes.formControl} variant="outlined" fullWidth>
                    <InputLabel htmlFor="component-outlined">
                      Rooms amount
                    </InputLabel>
                    <OutlinedInput
                      name="size"
                      id="component-outlined"
                      labelWidth={150}
                      value={this.state.size}
                      onChange={this.handleInputChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6} className={classes.gridItem}>
                  <FormControl className={classes.formControl} variant="outlined" fullWidth>
                    <InputLabel htmlFor="component-outlined">
                      Today price ($)
                    </InputLabel>
                    <OutlinedInput
                      name="price"
                      id="component-outlined"
                      labelWidth={150}
                      value={this.state.price}
                      onChange={this.handleInputChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} className={classes.gridItem}>
                  {!!filters.length && (
                    <Paper className={classes.root}>
                      {filters.map((data, index) => (
                        <Chip
                          key={index}
                          label={data.filter}
                          onDelete={() => this.handleDeleteFilter(index)}
                          className={classes.chip}
                        />
                        ))}
                    </Paper>
                  )}
                </Grid>
                <Grid item md={4} xs={12} className={classes.gridItem}>
                  <FormControl className={classes.formControl} fullWidth>
                    <InputLabel id='demo-simple-select-label'>Filter category</InputLabel>
                    <Select
                      labelWidth={200}
                      value={this.state.newFilterCategory}
                      onChange={event => this.handleFilterCategoryChange(event)}
                    >
                      <MenuItem value='' />
                      {filterCategories.map(category => (
                        <MenuItem key={category.id} value={category.id}> 
                          {' '}
                          {category.name}
                        </MenuItem>
                      )
                      )}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={4} xs={12} className={classes.gridItem}>
                  <FormControl className={classes.formControl} variant='outlined' fullWidth>
                    <InputLabel htmlFor='component-outlined'>
                      Filter
                    </InputLabel>
                    <OutlinedInput
                      id='component-outlined'
                      labelWidth={50}
                      name="newFilter"
                      value={this.state.newFilter}
                      onChange={this.handleInputChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={4} xs={12} className={classes.gridItem}>
                  <Button variant="contained" className={classes.addButton} onClick={() => this.addFilter()}>
                    Add filter
                  </Button>
                </Grid>
                <Grid item xs={12} className={classes.gridItem}>
                  <input
                    accept='image/*'
                    style={{ display: 'none' }}
                    id='button-file'
                    name='images'
                    multiple
                    type='file'
                    onChange={this.handleCapture}
                  />
                  <label htmlFor='button-file'>
                    <Button
                      variant='contained'
                      color='secondary'
                      component='span'
                      startIcon={<CloudUploadIcon />}
                    >
                      Upload
                    </Button>
                  </label>
                  <Grid className={classes.grid} container>
                    {this.state.images.map((image, index) => (
                      <Grid key={index} xs={12} md={5} item className={classes.imageContainer}>
                        <img onClick={() => this.handleMainChanged(index)} src={image} className={classes.image} />
                        {this.state.mainImage === index ?
                          <div className={classes.mainImage} /> : ''}
                      </Grid>
                    )
                    )}
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <MapComponent selectable onSelect={this.onMapSelection} />
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
            </form>
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

  handleFilterCategoryChange = (event) => {
    this.setState({
      newFilterCategory: event.target.value
    })
  }
}

export default withStyles(styles, { withTheme: true })(NewRoom)
