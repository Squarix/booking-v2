import Cookie from 'js-cookie';
import decode from 'jwt-decode';
import { apiUrl } from './config';

export default class AuthService {
  constructor(domain) {
    this.domain = domain || apiUrl
    this.fetch = this.fetch.bind(this)
    this.login = this.login.bind(this)
    this.getProfile = this.getProfile.bind(this)
  }

  register(data) {
    return this.fetch(`${this.domain}/auth/register`, {
      method: 'POST',
      body: JSON.stringify(data)
    }).then(res => {
      this.setToken(res.token);
      return res;
    })
  }

  login(email, password) {
    return this.fetch(`${this.domain}/auth/authenticate`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      })
    }).then(res => {
      this.setToken(res.token)
      return res
    })
  }

  moderatorIn() {
    const token = this.getToken()
    return !!token && this.isUserModerator(token)
  }

  loggedIn() {
    const token = this.getToken()
    return !!token && !this.isTokenExpired(token)
  }

  isUserModerator(token) {
    try {
      const decoded = decode(token);
      return decoded.exp > Date.now() / 1000 && decoded.type === 'moderator';
    }
    catch (err) {
      return false
    }
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      return decoded.exp < Date.now() / 1000;
    }
    catch (err) {
      return false
    }
  }


  setToken(idToken) {
    // Saves user token to localStorage
    Cookie.set('id_token', idToken)
  }

  getToken() {
    return Cookie.get('id_token')
  }

  logout() {
    Cookie.remove('id_token')
  }

  getProfile() {
    const token = this.getToken()
    return token ? decode(token) : null;
  }


  fetch(url, options, contentType = 'application/json') {
    const headers = {
      'Accept': 'application/json',
    };

    if (contentType) {
      headers['Content-Type'] = contentType
    }

    if (this.loggedIn()) {
      headers.Authorization = `Bearer ${this.getToken()}`
    }

    return fetch(url, {
      headers,
      ...options
    })
      .then(this._checkStatus)
      .then(response => response.json())
  }

  _checkStatus(response) {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
      return response
    } 
      const error = new Error(response.statusText)
      error.response = response
      throw error
    
  }
}
