import { combineFieldReducers } from "../utils/async-redux";
import { asyncField } from "../utils/booking-actions";

export const user = asyncField({
  reducerTemplate: asyncField.REDUCER_TEMPLATE.ONE_MODEL,
  actionOptions: {
    uri: 'users',
    method: asyncField.METHODS.GET,
  }
})


export default combineFieldReducers({
  user
});
