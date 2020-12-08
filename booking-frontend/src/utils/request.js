import Cookie from 'js-cookie';

import { apiUrl } from "../_services/config";

const GENERIC_ERROR_MESSAGE = 'Something went wrong';

export default function request(requestProps) {
  const headers = {
    'X-Requested-With': 'XMLHttpRequest',
  };

  let contentType = 'application/json';

  // Use null value as flag to reset the default application/json content type
  if (requestProps.contentType === null) contentType = undefined;

  if (requestProps.contentType) contentType = requestProps.contentType;

  if (contentType) headers['Content-Type'] = contentType;

  if (Cookie.get('id_token')) headers.Authorization = `Bearer ${Cookie.get('id_token')}`;


  const fetchOptions = {
    method: requestProps.method,
    headers,
    body: getBody(requestProps),
    signal: requestProps.signal,
    credentials: 'same-origin',
  };

  const url = requestProps.url
    ? requestProps.url
    : `${apiUrl}/${requestProps.uri}`;

  return fetch(url, fetchOptions)
    .then(response => {
      if (response.status === 204) return;

      if (!response.ok && response.json) {
        return response.json().then(res => {
          let errorText = response.statusText;

          if (res.code === -1) errorText = GENERIC_ERROR_MESSAGE;

          if (res.code === -2) errorText = res.errors.join(' / ');

          const error = new Error(errorText);
          error.statusCode = response.status;

          throw error;
        });
      }

      if (!response.ok) throw response;

      const contentType = response.headers.get('Content-Type');
      const isJson = contentType && contentType.includes('json');

      return isJson ? response.json() : response.text();
    });
}

const getBody = props => {
  // we treat null as a special "auto-detect Content-Type" mark
  if ((props.contentType || props.contentType === null) && props.body)
    return props.body;

  if (props.body) return JSON.stringify(props.body);

  return undefined;
};
