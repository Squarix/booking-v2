const styles = theme => ({
	margin: {
		height: theme.spacing(3),
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 250,
	},

	container: {
		marginTop: '50px',
		marginBottom: '150px'
	},

	resultItem: {
		padding: '20px'
	},

	chipsContainer: {
		display: 'flex',
		justifyContent: 'center',
		flexWrap: 'wrap',
		'& > *': {
			margin: theme.spacing(0.5),
		},
	}
});

export default styles;
