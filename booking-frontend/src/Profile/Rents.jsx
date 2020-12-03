import React from 'react'
import BookingService from '../_services/BookingService';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "./styles";

import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

import Moment from 'react-moment';
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";

const bookingService = new BookingService();

class Bookings extends React.Component {
	constructor(props) {
		super(props);
	}

	state = {
		rents: [],
		isFetching: true
	}

	componentDidMount() {
		this.setState({isFetching: true})
		this.updateRents()
	}

	updateRents() {
		bookingService.getRents()
			.then(rents => {
				console.log(rents);
				this.setState({
					rents: rents,
					isFetching: false
				})
			})
			.catch(error => {

			})
	}

	getClass(status) {
		const {classes} = this.props;
		if (status === 'approved')
			return classes.approved;
		else if (status === 'approving')
			return classes.approving;
		else
			return classes.declined;
	}

	changeStatus(status, rentId) {
		console.log(rentId, status);
		bookingService.updateStatus(rentId, status)
			.then(res => {
				console.log(res)
				this.updateRents()
			})
			.catch(e => {
				console.log(e)
			})
	}

	render() {
		const {classes} = this.props;

		return (
			<React.Fragment>
				<Grid container xs={12} className={classes.tableContainer}>
					<Table aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>Room</TableCell>
								<TableCell align="right">User</TableCell>
								<TableCell align="right">Address</TableCell>
								<TableCell align="right">Arrive&nbsp;date</TableCell>
								<TableCell align="right">City</TableCell>
								<TableCell align="right">End&nbsp;date</TableCell>
								<TableCell align="right">Guests amount</TableCell>
								<TableCell align="right">Price</TableCell>
								<TableCell align="right">Status</TableCell>
								<TableCell/>
							</TableRow>
						</TableHead>
						<TableBody>
							{this.state.rents.map((booking, index) => (
								<TableRow key={booking.index}>
									<TableCell component="th" scope="row">
										<a href={`/rooms/${booking.roomId}`}>
											{booking.roomId}
										</a>
									</TableCell>
									<TableCell align="right">
										<a href={`/users/${booking.userId}`}>
											{booking.user.email}
										</a>
									</TableCell>
									<TableCell align="right" scope="row">
										{booking.room.address}
									</TableCell>
									<TableCell align="right">
										<Moment format={'MMM Do YY'}>
											{booking.arriveDate}
										</Moment>
									</TableCell>
									<TableCell align="right">{booking.room.city.name}</TableCell>
									<TableCell align="right">
										<Moment format={'MMM Do YY'}>
											{booking.endDate}
										</Moment>
									</TableCell>
									<TableCell align="right">{booking.room.guestsAmount}</TableCell>
									<TableCell align="right">{booking.price}</TableCell>
									<TableCell align="right" className={this.getClass(booking.status)}>{booking.status}</TableCell>
									<TableCell align="right">
										{booking.status === 'approving' ?
											<React.Fragment>
												<Fab color="primary" size="small"
												     onClick={() => this.changeStatus('approved', booking.id)}
												     aria-label="Approve" className={classes.fab}>
													<CheckIcon/>
												</Fab>
												< Fab color="secondary" size="small"
												      onClick={() => this.changeStatus('declined', booking.id)}
												      aria-label="Decline" className={classes.fab}>
													<ClearIcon/>
												</Fab>
											</React.Fragment> : ''
										}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Grid>
			</React.Fragment>
		)
	}
}


export default withStyles(styles, {withTheme: true})(Bookings);
