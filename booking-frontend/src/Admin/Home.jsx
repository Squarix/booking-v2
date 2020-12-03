import React from 'react';
import AdminService from '../_services/AdminService';
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "../Profile/styles";
import Fab from "@material-ui/core/Fab";

import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

const adminService = new AdminService();

class Home extends React.Component {
	constructor(props) {
		super(props)
	}

	state = {
		rooms: []
	}

	componentDidMount() {
		this.updateRooms()
	}

	changeStatus(status, roomId) {
		adminService.updateStatus(roomId, status)
			.then(res => {
				console.log(res)
				this.updateRooms()
			})
			.catch(e => {
				console.log(e)
			})
	}

	updateRooms = () => {
		adminService.getHome().then(res => {
			this.setState({
				rooms: res
			})
		})
	}



	render() {
		const {classes} = this.props;

		return (
			<React.Fragment>
				<Table className={classes.table} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Room</TableCell>
							<TableCell align="right">Address</TableCell>
							<TableCell align="right">City</TableCell>
							<TableCell align="right">Description</TableCell>
							<TableCell align="right">Guests amount</TableCell>
							<TableCell align="right">Price</TableCell>
							<TableCell align="right">Rooms amount</TableCell>
							<TableCell align="right">User</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{this.state.rooms.map((room, index) => (
							<TableRow key={index}>
								<TableCell component="th" scope="row">
									<a href={`/rooms/${room.id}`}>
										{room.id}
									</a>
								</TableCell>
								<TableCell align="right" scope="row">
									{room.address}
								</TableCell>
								<TableCell align="right">
									{room.city?.name}
								</TableCell>
								<TableCell align="right">{room.description}</TableCell>
								<TableCell align="right">
									{room.guestsAmount}
								</TableCell>
								<TableCell align="right">{room.todayPrice}</TableCell>
								<TableCell align="right">{room.size}</TableCell>
								<TableCell align="right">{room.user.email}</TableCell>
								<TableCell>
									<Fab color="primary" size="small"
									     onClick={() => this.changeStatus('publicated', room.id)}
									     aria-label="Approve" className={classes.fab}>
										<CheckIcon/>
									</Fab>
									<Fab color="secondary" size="small"
									     onClick={() => this.changeStatus('declined', room.id)}
									     aria-label="Decline" className={classes.fab}>
										<ClearIcon/>
									</Fab>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</React.Fragment>
		)
	}
}

export default withStyles(styles, {withTheme: true})(Home);

