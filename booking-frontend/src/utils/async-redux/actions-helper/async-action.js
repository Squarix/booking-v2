import AbstractAction from './abstract-action';

export default class AsyncAction extends AbstractAction {
  constructor(options = AsyncAction.defaultOptions) {
    const {types, uri, method, request, defaultURLParams} = options;
    if (!request)
      throw new ReferenceError('AsyncAction: request function is undefined!');

    if (!uri) throw new ReferenceError('AsyncAction: define "uri"!');

    AsyncAction.checkMethod(method);

    super(types);

    this.defaultURLParams = AsyncAction.getURLParams(defaultURLParams);
    this.baseUri = AsyncAction.getBaseUri(uri);
    this.method = method;
    this.request = request;
  }

  checkTypes(types) {
    ['DEFAULT', 'SUCCESS', 'ERROR'].forEach(field =>
      AsyncAction.checkType(types, field)
    );
  }

  static getURLParams(urlParams) {
    if (urlParams instanceof URLSearchParams) return urlParams;

    return new URLSearchParams(urlParams);
  }

  static concatURLSearchParams(...URLSearchParamsArray) {
    return URLSearchParamsArray.map(AsyncAction.getURLParams).reduce(
      (acc, urlParams) => {
        urlParams.forEach((value, key) => acc.set(key, value));
        return acc;
      },
      new URLSearchParams()
    );
  }

  static checkMethod(method) {
    if (!Object.values(AsyncAction.METHODS).includes(method))
      throw new Error(`AsyncAction: Wrong method: ${method}`);
  }

  static getBaseUri(uri) {
    return uri.replace(/^\/|\/$/g, '');
  }

  getSuccessAction(response) {
    return {type: this.types.SUCCESS, payload: response};
  }

  getErrorAction(error) {
    return {type: this.types.ERROR, payload: error};
  }

  get func() {
    return ({
      urlParams = new URLSearchParams(),
      body = undefined,
      id = null,
      requestOptions = {},
    } = {}) => async dispatch => {

      dispatch(this.getDefaultAction(urlParams));

      const urlSearchParams = AsyncAction.concatURLSearchParams(
        this.defaultURLParams,
        urlParams
      );

      let uri = `${this.baseUri}/`;

      if (id) uri += `${id}/`;

      if (urlSearchParams.toString()) uri += `?${urlSearchParams}`;

      try {
        const requestOptionsObj = {
          uri,
          method: this.method,
          body,
          ...requestOptions,
        };

        const response = await this.request(requestOptionsObj);

        return dispatch(this.getSuccessAction(response));
      } catch (error) {
        return dispatch(this.getErrorAction(error));
      }
    };
  }
}

AsyncAction.METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
};

AsyncAction.defaultOptions = {
  uri: '',
  request: null,
  types: {
    DEFAULT: null,
    SUCCESS: null,
    ERROR: null,
  },
  method: 'GET',
  defaultURLParams: new URLSearchParams(),
};
