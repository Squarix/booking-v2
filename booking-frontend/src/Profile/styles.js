const styles = theme => ({
	approved: {
		color: '#00e676'
	},

	approving: {
		color: '#f9a825'
	},

	fab: {
		margin: theme.spacing(1),
	},

	declined: {
		color: '#dd2c00'
	},
	profileEntry: {
		display: 'flex',
		flexDirection: 'column'
	},
	main: {
		textAlign: 'left',
		margin: '20px 0',
		display: 'flex',
		justifyContent: 'right'
	},

	textField: {
		marginTop: '5px'
	},

	editable: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},

	tableContainer: {
		overflow: 'hidden',
		overflowX: 'scroll',
	},

	avatarContainer: {
		padding: '0 20px',
		display: 'flex',
		alignItems: 'flex-start'
	},

	avatarIcon: {
		width: '100px',
		height: '100px',
		marginBottom: '25px'
	},

	userNameTitle: {
		padding: '0 16px',
		marginTop: '50px',
		marginBottom: '20px'
	}
});

export default styles;
