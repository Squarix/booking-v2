import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from "react-router-dom";
import MaterialLink from "@material-ui/core/Link";
import AuthService from '../_services/AuthService';
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";


const auth = new AuthService();
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: '#FFFFFF'
  },
  signButton: {
    marginLeft: theme.spacing(2),
    marginRight: '10px',
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}));

export default function Menu() {
  const classes = useStyles();
  let profile;
  if (auth.loggedIn())
    profile = auth.getProfile();

  const [state, setState] = React.useState({
    top: false,
  });

  const logOut = () => {
    auth.logout()
  };

  const toggleDrawer = (side, open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({...state, [side]: open});
  };

  const SignLinks = (
      <div>
        <Link to={'/sign-in'} color='black' className={classes.signButton}>
          <Button color="black" variant="outlined">Sign In</Button>
        </Link>
        <Link to={'/sign-up'} className={classes.signButton}>
          <Button color="secondary" variant="outlined">Sign Up</Button>
        </Link>
      </div>
  );

  const sideList = side => (
      <div
          className={classes.list}
          role="presentation"
          onClick={toggleDrawer(side, false)}
          onKeyDown={toggleDrawer(side, false)}
      >
        <List>
          <Link underline='none' to={'/search'}>
            <ListItem button>
              <ListItemText className="link-black" primary={'Search'}/>
            </ListItem>
          </Link>
          <Link underline='none' color='black' to={'/rooms'}>
            <ListItem button>
              <ListItemText className="link-black" primary={'Rooms'}/>
            </ListItem>
          </Link>
          <Link underline='none' color='black' to={'/profile'}>
            <ListItem button>
              <ListItemText className="link-black" primary={'Profile'}/>
            </ListItem>
          </Link>
          {auth.isUserModerator(auth.getToken()) && (
              <Link underline='none' color='black' to={'/admin'}>
                <ListItem button>
                  <ListItemText className="link-black" primary={'Admin panel'}/>
                </ListItem>
              </Link>
          )}
        </List>
        <Divider/>
        <List>
          {!auth.loggedIn() ?
              <>
                <ListItem button>
                  <Link underline='none' to={'/sign-in'}>
                    <ListItemText className="link-black" primary={'Sign in'} />
                  </Link>
                </ListItem>
                <ListItem button>
                  <Link underline='none' to={'/sign-up'}>
                    <ListItemText className="link-black" primary={'Sign up'}/>
                  </Link>
                </ListItem>
              </> :
              <ListItem button>
                <MaterialLink underline='none' onClick={logOut}>
                  <ListItemText className="link-black" primary={'Sign out'}/>
                </MaterialLink>
              </ListItem>
          }
        </List>
      </div>
  );


  return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton onClick={toggleDrawer('top', true)} edge="start" className={classes.menuButton} color="inherit"
                        aria-label="menu">
              <MenuIcon/>
            </IconButton>
            <Typography className={classes.title} variant="h6">
              <Link className={classes.title} to={'/'}>Booking</Link>
            </Typography>
            {
              auth.loggedIn() ?
                  <div><Link className={classes.title} to={'/profile'}>{profile.email}</Link></div> : SignLinks
            }
          </Toolbar>
        </AppBar>
        <SwipeableDrawer
            anchor='left'
            open={state.top}
            onClose={toggleDrawer('top', false)}
            onOpen={toggleDrawer('top', true)}
        >
          {sideList('right')}
        </SwipeableDrawer>
      </div>
  );
}
