import { combineFieldReducers } from "../utils/async-redux";
import { asyncField } from "../utils/booking-actions";


export const filters = asyncField({
  reducerTemplate: asyncField.REDUCER_TEMPLATE.MANY_MODELS,
  actionOptions: {
    uri: 'filters',
    method: asyncField.METHODS.GET,
  }
})

export default combineFieldReducers({
  filters
});
