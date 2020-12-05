import {createReducer} from './create-reducer';

const logger = (warn, ...args) => {
  if (warn) {
    console.warn(...args);
  } else {
    console.log(...args);
  }
};

const sendWIthLog = request => async ({requestProps, onSuccess, onError}) => {
  try {
    logger(false, requestProps.method, requestProps.uri || requestProps.url);
    const response = await request(requestProps);
    logger(
      false,
      requestProps.method,
      requestProps.uri || requestProps.url,
      'success!'
    );
    onSuccess && onSuccess(response);
    return response;
  } catch (e) {
    logger(
      true,
      requestProps.method,
      requestProps.uri || requestProps.url,
      'error:',
      e
    );
    onError && onError(e);
    return null;
  }
};

const generateModelActionTypes = MODEL => {
  return {
    FETCH_MANY: `FETCH_${MODEL}S`,
    FETCH_MANY_ERROR: `FETCH_${MODEL}S_ERROR`,
    FETCH_MANY_SUCCESS: `FETCH_${MODEL}S_SUCCESS`,
    FETCH_ONE: `FETCH_${MODEL}`,
    FETCH_ONE_SUCCESS: `FETCH_${MODEL}_SUCCESS`,
    FETCH_ONE_ERROR: `FETCH_${MODEL}_ERROR`,
    CLEAR_ONE: `CLEAR_${MODEL}`,
    EDIT_ONE: `EDIT_${MODEL}`,
    EDIT_ONE_SUCCESS: `EDIT_${MODEL}_SUCCESS`,
    EDIT_ONE_ERROR: `EDIT_${MODEL}_ERROR`,
    CREATE_ONE: `CREATE_${MODEL}`,
    CREATE_ONE_SUCCESS: `CREATE_${MODEL}_SUCCESS`,
    CREATE_ONE_ERROR: `CREATE_${MODEL}_ERROR`,
    DELETE_ONE: `DELETE_${MODEL}`,
    DELETE_ONE_SUCCESS: `DELETE_${MODEL}`,
    DELETE_ONE_ERROR: `DELETE_${MODEL}_ERROR`,
  };
};

const ActionGenerator = request => (
  modelName,
  options = {
    constantPrefix: null,
    uri: null,
  }
) => {
  const send = sendWIthLog(request);
  const MODEL = options.constantPrefix || modelName.toUpperCase();
  const Model = modelName[0].toUpperCase() + modelName.toLowerCase().slice(1);
  const models = modelName.toLowerCase() + 's';
  const baseUri = options.uri || models;

  const ACTION_TYPES = generateModelActionTypes(MODEL);

  const fetchMany = urlParams => {
    urlParams = urlParams || new URLSearchParams();

    return async dispatch => {
      dispatch({type: ACTION_TYPES.FETCH_MANY, payload: urlParams});

      const requestProps = {
        uri: `${baseUri}/?${urlParams.toString()}`,
        method: 'GET',
      };
      return await send({
        requestProps,
        onSuccess: response =>
          dispatch({
            type: ACTION_TYPES.FETCH_MANY_SUCCESS,
            payload: response,
          }),
        onError: error =>
          dispatch({
            type: ACTION_TYPES.FETCH_MANY_ERROR,
            payload: error,
          }),
      });
    };
  };

  const fetchOne = modelId => {
    if (!modelId)
      throw new Error(`${Model} ID is required to view a ${modelName}`);

    return async dispatch => {
      dispatch({type: ACTION_TYPES.FETCH_ONE});

      const requestProps = {
        uri: `${baseUri}/${modelId}/`,
        method: 'GET',
      };

      return await send({
        requestProps,
        onSuccess: model =>
          dispatch({
            type: ACTION_TYPES.FETCH_ONE_SUCCESS,
            payload: model,
          }),
        onError: error =>
          dispatch({
            type: ACTION_TYPES.FETCH_ONE_ERROR,
            payload: error,
          }),
      });
    };
  };

  const clearOne = () => {
    return dispatch => {
      dispatch({type: ACTION_TYPES.CLEAR_ONE});
    };
  };

  const editOne = (modelId, editFields = {}, requestOptions = {}) => {
    if (!modelId)
      throw new Error(`${Model} ID is required to edit a ${modelName}`);

    return async dispatch => {
      dispatch({type: ACTION_TYPES.EDIT_ONE});
      const requestProps = {
        uri: `${baseUri}/${modelId}/`,
        method: 'PATCH',
        body: editFields,
        ...requestOptions,
      };

      return await send({
        requestProps,
        onSuccess: model => {
          dispatch({
            type: ACTION_TYPES.EDIT_ONE_SUCCESS,
            payload: model,
          });
        },
        onError: error => {
          dispatch({
            type: ACTION_TYPES.EDIT_ONE_ERROR,
            payload: error,
          });
        },
      });
    };
  };

  const createNewOne = modelFieldsObject => {
    return async dispatch => {
      dispatch({type: ACTION_TYPES.CREATE_ONE});
      const requestProps = {
        uri: `${baseUri}/`,
        method: 'POST',
        body: modelFieldsObject,
      };

      return await send({
        requestProps,
        onSuccess: model =>
          dispatch({
            type: ACTION_TYPES.CREATE_ONE_SUCCESS,
            payload: model,
          }),
        onError: error =>
          dispatch({
            type: ACTION_TYPES.CREATE_ONE_ERROR,
            payload: error,
          }),
      });
    };
  };

  const deleteOne = modelId => {
    return async dispatch => {
      dispatch({type: ACTION_TYPES.DELETE_ONE});
      const requestProps = {
        uri: `${baseUri}/${modelId}`,
        method: 'DELETE',
      };

      return await send({
        requestProps,
        onSuccess: model =>
          dispatch({
            type: ACTION_TYPES.DELETE_ONE_SUCCESS,
            payload: model,
          }),
        onError: error =>
          dispatch({
            type: ACTION_TYPES.DELETE_ONE_ERROR,
            payload: error,
          }),
      });
    };
  };

  const {reducer, initialState} = createReducer({ACTION_TYPES});

  return {
    fetchMany,
    fetchOne,
    clearOne,
    editOne,
    createNewOne,
    deleteOne,
    ACTION_TYPES,
    reducer,
  };
};

export default ActionGenerator;
