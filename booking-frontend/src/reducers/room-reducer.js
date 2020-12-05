import { asyncField } from "../utils/booking-actions";
import { combineFieldReducers } from "../utils/async-redux";

export const room = asyncField({
  reducerTemplate: asyncField.REDUCER_TEMPLATE.ONE_MODEL,
  actionOptions: {
    uri: 'rooms',
    method: asyncField.METHODS.GET,
  },
});


export default combineFieldReducers({
  room,
});
