import { asyncField } from "../utils/booking-actions";
import { combineFieldReducers } from "../utils/async-redux";

export const analytics = asyncField({
  reducerTemplate: asyncField.REDUCER_TEMPLATE.ONE_MODEL,
  actionOptions: {
    uri: 'analyst/user',
    method: asyncField.METHODS.GET,
  },
});

export default combineFieldReducers({
  analytics,
});
