import {makeStyles} from '@material-ui/core/styles';
import React from "react";

const styles = makeStyles(theme => ({
	toolbar: {
		borderBottom: `1px solid ${theme.palette.divider}`,
	},
	toolbarTitle: {
		flex: 1,
	},
	toolbarSecondary: {
		justifyContent: 'space-between',
		overflowX: 'auto',
	},
	toolbarLink: {
		padding: theme.spacing(1),
		flexShrink: 0,
	},
	mainFeaturedPostContent: {
		position: 'relative',
		filter: 'blur(0px)',
		padding: theme.spacing(3),
		[theme.breakpoints.up('md')]: {
			padding: theme.spacing(6),
			paddingRight: 0,
		},
	},
	mainFeaturedPost: {
		textAlign: 'left',
		position: 'relative',
		backgroundColor: theme.palette.grey[800],
		color: theme.palette.common.white,
		height: 'calc(100vh - 64px)',
		backgroundImage: 'url(/background.jpg)',
		filter: 'blur(0.2px)',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
	},
	overlay: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		backgroundColor: 'rgba(0,0,0,.3)',
	},
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
		marginBottom: '100px',
	},
	gridList: {
		height: 450,
	},
	icon: {
		color: 'rgba(255, 255, 255, 0.54)',
	},

	homeContainer: {
	}
}));

export default styles;
