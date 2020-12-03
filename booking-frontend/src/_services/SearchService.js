import {apiUrl} from "./config";

export default class SearchService {
  constructor(props) {
  }

  doSearch(params) {
    const url = new URL(apiUrl + '/search');
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));


    return fetch(url)
        .then(res => res.json())
        .then(data => {
          return Promise.resolve(data);
        })
  }

  getFilters() {
    const url = `${apiUrl}/rooms/filters`;
    return fetch(url)
        .then(res => res.json())
        .then(data => {
          return Promise.resolve(data)
        })
  }
}
