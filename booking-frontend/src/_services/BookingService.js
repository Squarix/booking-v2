import AuthService from "./AuthService";
import {apiUrl} from "./config";

const authService = new AuthService();

export default class BookingService {
	constructor(props) {
	}

	getBookings(params = {}) {
		const url = new URL(`${apiUrl}/users/profile/bookings`);
		Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

		return authService.fetch(url).then(res => Promise.resolve(res))
	}

	getRents() {
		const url = `${apiUrl}/users/profile/rents/`;
		return authService.fetch(url);
	}

	updateStatus(bookingId, newStatus) {
		const url = `${apiUrl}/bookings/${bookingId}`;
		return authService.fetch(url, {
			method: 'PATCH',
			body: JSON.stringify({
				newStatus,
			}),
		});
	}
}
