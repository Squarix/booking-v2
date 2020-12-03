import {apiUrl} from './config';
import AuthService from './AuthService';

const authService = new AuthService();

export default class ProfileService {
	constructor(props) {
	}

	getProfile() {
		const url = `${apiUrl}/users/profile`
		return authService.fetch(url).then(profile => {
			return Promise.resolve(profile);
		})
	}

	updateProfile(id, params) {
		const url = `${apiUrl}/users/${id}`;
		return authService.fetch(url, {
			method: 'PUT',
			body: JSON.stringify({
				...params
			})
		}).then(res => {
			return Promise.resolve(res)
		})
	}

}
