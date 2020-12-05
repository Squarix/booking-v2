import AuthService from "./AuthService";
import {apiUrl} from "./config";

const authService = new AuthService();

export default class BookingService {
	constructor(props) {
	}

	getBookings(params = {}) {
		const url = new URL(`${apiUrl}/users/profile/bookings`);
		Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

		return authService.fetch(url).then(res => {
			return Promise.resolve(res);
		})
	}

	getRents() {
		const url = apiUrl + '/rents/';
		return authService.fetch(url).then(res => {
			return Promise.resolve(res)
		})
	}

	updateStatus(roomId, newStatus) {
		const url = apiUrl + /rents/ + roomId;
		return authService.fetch(url, {
			method: 'PUT',
			body: JSON.stringify({
				newStatus: newStatus,
			}),
		}).then(res => {
			return Promise.resolve(res);
		})
	}
}
