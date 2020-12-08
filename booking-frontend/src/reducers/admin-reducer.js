import { combineFieldReducers } from "../utils/async-redux";
import { asyncField } from "../utils/booking-actions";


export const rooms = asyncField({
  reducerTemplate: asyncField.REDUCER_TEMPLATE.MANY_MODELS,
  actionOptions: {
    uri: 'admin/rooms',
    method: asyncField.METHODS.GET,
  }
})

export const editRoom = asyncField({
  reducerTemplate: asyncField.REDUCER_TEMPLATE.EDIT_MODEL,
  actionOptions: {
    uri: 'admin/rooms',
    method: asyncField.METHODS.PATCH
  }
})

export default combineFieldReducers({
  editRoom, rooms
});
