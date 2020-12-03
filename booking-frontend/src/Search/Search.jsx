import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

import SearchService from '../_services/SearchService';
import Grid from '@material-ui/core/Grid';
import Menu from '../Layouts/Menu';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import RoomCard from '../Room/components/RoomCard';
import Chip from "@material-ui/core/Chip";

const searchService = new SearchService();

const AirbnbSlider = withStyles({
  root: {
    color: '#3a8589',
    height: 3,
    padding: '13px 0',
  },
  thumb: {
    height: 27,
    width: 27,
    backgroundColor: '#fff',
    border: '1px solid currentColor',
    marginTop: -12,
    marginLeft: -13,
    boxShadow: '#ebebeb 0px 2px 2px',
    '&:focus,&:hover,&$active': {
      boxShadow: '#ccc 0px 2px 3px 1px',
    },
    '& .bar': {
      // display: inline-block !important;
      height: 9,
      width: 1,
      backgroundColor: 'currentColor',
      marginLeft: 1,
      marginRight: 1,
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 3,
  },
  rail: {
    color: '#d8d8d8',
    opacity: 1,
    height: 3,
  },
})(Slider);

function AirbnbThumbComponent(props) {
  return (
      <span {...props}>
      <span className='bar'/>
      <span className='bar'/>
      <span className='bar'/>
    </span>
  );
}


class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    priceMax: 1000,
    priceMin: 0,
    priceValues: [0, 1000],
    filters: [],
    guestsAmount: '',
    size: '',
    address: '',
    description: '',
    page: 1,

    rooms: []
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSliderChange = (e, val) => {
    this.setState({
      priceValues: val
    })
  }

  handleSearch = () => {
    const stateValues = {
      description: this.state.description,
      guestsAmount: Number.parseInt(this.state.guestsAmount),
      size: Number.parseInt(this.state.size),
      address: this.state.address,
      filters: JSON.stringify(this.state.searchFilters.filter(f => f.selected) || []),
    };

    let params = {};
    console.log(stateValues);
    Object.keys(stateValues).map(key => {
      const value = stateValues[key];
      if (value)
        params = Object.assign(params, {[key]: value})
    });

    console.log(params);
    searchService
        .doSearch(params)
        .then(res => this.setState({rooms: res}));
  }

  chipClicked = id => {
    const { searchFilters } = this.state;
    const filter = searchFilters.find(f => f.id === id)
    filter.selected = !filter.selected;

    this.setState({ searchFilters });
  }

  componentDidMount() {
    searchService.getFilters()
        .then(searchFilters => {
          console.log(searchFilters);
          this.setState({searchFilters})
        })
  }

  render() {
    const {classes} = this.props;

    return (
        <>
          <Menu/>
          <Container className={classes.container}>
            <Grid container>
              <Grid item xs={12} md={3}>
                <Typography variant={'h5'}>Search params</Typography>
                <div className={classes.margin}/>
                <TextField
                    id='outlined-error`'
                    label='Guests Amount'
                    placeholder='Guest amount'
                    name='guestsAmount'
                    value={this.state.guestsAmount}
                    onChange={this.handleInputChange}
                    className={classes.textField}
                    margin='normal'
                    variant='outlined'
                />
                <TextField
                    id='outlined-error'
                    label='Rooms amount'
                    name='size'
                    placeholder='Rooms  '
                    value={this.state.roomsAmount}
                    onChange={this.handleInputChange}
                    className={classes.textField}
                    margin='normal'
                    variant='outlined'
                />
                <TextField
                    id='outlined-error'
                    label='Address'
                    name='address'
                    value={this.state.address}
                    onChange={this.handleInputChange}
                    placeholder='enter your address'
                    className={classes.textField}
                    margin='normal'
                    variant='outlined'
                />
                <TextField
                    id='outlined-error'
                    label='Description'
                    name='description'
                    placeholder='description'
                    value={this.state.description}
                    onChange={this.handleInputChange}
                    className={classes.textField}
                    margin='normal'
                    variant='outlined'
                />
                <div className={classes.chipsContainer}>
                  {this.state.searchFilters?.map(filter => (
                      <Chip
                          color="primary"
                          key={filter.id}
                          onClick={() => this.chipClicked(filter.id)}
                          label={filter.filter}
                          variant={filter.selected ? 'default' : 'outlined'}
                      />
                  ))}
                </div>
                <div className={classes.margin}/>
                {/*<Typography gutterBottom>Price</Typography>*/}
                {/*<AirbnbSlider*/}
                {/*	ThumbComponent={AirbnbThumbComponent}*/}
                {/*	onChange={this.handleSliderChange}*/}
                {/*	value={this.state.priceValues}*/}
                {/*	getAriaLabel={index => (index === 0 ? 'Minimum price' : 'Maximum price')}*/}
                {/*	min={this.state.priceMin}*/}
                {/*	max={this.state.priceMax}*/}
                {/*	valueLabelDisplay='on'*/}
                {/*	className={classes.textField}*/}
                {/*/>*/}
                <div className={classes.margin}/>
                <Button variant='outlined' color='primary' className={classes.button} onClick={this.handleSearch}>
                  Search
                </Button>
              </Grid>
              <Grid item xs={12} md={9}>
                <Grid container>
                  {
                    this.state.rooms.map(room =>
                        <Grid key={room._id} xs={12} md={6} item className={classes.resultItem}>
                          <RoomCard id={room._id} {...room._source}/>
                        </Grid>
                    )
                  }
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </>
    )
  }
}


export default withStyles(styles, {withTheme: true})(Search);
