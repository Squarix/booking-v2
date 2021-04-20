const styles = theme => ({
	header: {
		fontWeight: 'bold',
		fontSize: '36px',
	},

	carousel: {
		marginTop: '20px'
	},

	content: {
		[theme.breakpoints.up('md')]: {
			paddingLeft: '80px',
			paddingRight: '25px',
		},
		display: 'flex',
		justifyContent: 'left',
		flexDirection: 'column',
		paddingTop: '31px',
		// height: '100vh',
	},

	bodyContainer: {
		marginBottom: '100px'
	},

	sidebars: {
		marginTop: '56px',
		paddingTop: '31px',
		display: 'flex',
		justifyContent: 'left',
	},

	label: {
		fontWeight: 450,
		fontSize: '22px',
	},

	datePicker: {
		borderRadius: '15px',
		padding: '10px 15px',
		border: '2px solid #EEEEEE',
	},

	parameters: {
		fontStyle: 'normal',
		fontWeight: 'bold',
		fontSize: '24px',
		color: '#EA2340',
	},

	descriptionBlock: {
		textAlign: 'left'
	},

	roomImageDiv: {
		display: 'flex',
		height: '100%'
	},

	roomImage: {
		margin: 'auto 0'
	},

	map: {
		padding: '0 80px'
	},

	recommendation: {
		textAlign: 'left',
		padding: '0 80px',
		marginTop: theme.spacing(4),
	},
	recommendationItem: {
		margin: theme.spacing(2, 0),
	}
});

export default styles;
