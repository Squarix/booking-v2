import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FolderIcon from '@material-ui/icons/Folder';
import AddIcon from '@material-ui/icons/Add';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles({
	root: {
		width: 500,
	},

	stickToBottom: {
		width: '100%',
		position: 'fixed',
		bottom: 0,
		zIndex: 50,
		background: 'none',
	},

	container: {
		boxShadow: '0px 0px 4px #e0e0e0',
		backgroundColor: '#FFFFFF'
	},

	hover: {
		"&:hover": {
			backgroundColor: '#e0e0e0'
		}
	}

});

export default function Footer() {
	const classes = useStyles();
	const [value, setValue] = React.useState('recents');

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<BottomNavigation value={value} onChange={handleChange} className={classes.stickToBottom}>
			<div className={classes.container}>
				<BottomNavigationAction label="Rooms" href={'/rooms'} value="rooms" className={classes.hover}
				                        icon={<LocationOnIcon/>}/>
				<BottomNavigationAction label="Create Room" href={'/rooms/create'} className={classes.hover} value="Create room"
				                        icon={<AddIcon/>}/>
				<BottomNavigationAction label="Bookings" href={'/profile/bookings'} className={classes.hover} value="bookings"
				                        icon={<FolderIcon/>}/>
			</div>
		</BottomNavigation>
	);
}
