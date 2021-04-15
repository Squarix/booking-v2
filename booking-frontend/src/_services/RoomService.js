import {apiUrl} from './config';
import AuthService from './AuthService';

const authService = new AuthService();

export default class RoomService {
  constructor(props) {
    this.countries = [];
  }

  getRoomBookings(id) {
    const url = `${apiUrl}/rooms/${id}/bookings`
    return authService.fetch(url).then(bookings => Promise.resolve(bookings))
  }

  getCountries() {
    const url = `${apiUrl  }/countries`;
    return fetch(url).catch(() => []);
  }

  getRoom(id) {
    const url = `${apiUrl  }/rooms/${  id}`;
    return authService.fetch(url).then(res => Promise.resolve(res))
  }

  updateRoom(params, id) {
    const url = `${apiUrl}/rooms/${id}`
    return authService.fetch(url, {
      method: 'PUT',
      body: JSON.stringify(params)
    }).then(res => Promise.resolve(res))
  }

  createRoom(roomParams, filters = [], images = [], mainImage = null) {
    const data = new FormData();
    data.append('filters', JSON.stringify(filters));
    data.append('mainImage', mainImage);
    data.append('roomParams', JSON.stringify(roomParams));

    images.forEach(image => {
      data.append('images', image);
    });

    const url = `${apiUrl  }/rooms`;
    return authService.fetch(url, {
      method: 'POST',
      body: data
    }, false);
  }


  getRooms(limit, currentPage) {
    const offset = limit * (currentPage - 1);
    const url = `${apiUrl}/rooms?limit=${limit}&offset=${offset}&order=none`
    return authService.fetch(url).catch(err => []);
  }

  getCategories() {
    const url = `${apiUrl  }/categories`;
    return fetch(url);
  }

  bookRoom(id, params) {
    const url = `${apiUrl}/rooms/${id}/bookings`;
    return authService.fetch(url, {
      method: 'POST',
      body: JSON.stringify(params)
    });
  }

  getCities(country, startsWith) {
    const api = `http://api.geonames.org/searchJSON?username=ksuhiyp&country=${country}&maxRows=1000&style=SHORT&name_startsWith=${startsWith}`
  }
}
