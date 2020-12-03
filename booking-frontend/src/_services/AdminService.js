import AuthService from "./AuthService";
import {apiUrl} from "./config";

const authService = new AuthService();

export default class AdminService {
	constructor(props) {
	}

	getHome() {
		const url = `${apiUrl}/admin/`;
		return authService.fetch(url).then(res => {
			return Promise.resolve(res);
		})
	}

	updateStatus(roomId, newStatus) {
		const url = `${apiUrl}/admin/rooms/${roomId}`;
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
