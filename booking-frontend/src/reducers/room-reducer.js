import { asyncField } from "../utils/booking-actions";
import { combineFieldReducers } from "../utils/async-redux";

export const room = asyncField({
  reducerTemplate: asyncField.REDUCER_TEMPLATE.ONE_MODEL,
  actionOptions: {
    uri: 'rooms',
    method: asyncField.METHODS.GET,
  },
});

export const recommendations = asyncField({
  reducerTemplate: asyncField.REDUCER_TEMPLATE.MANY_MODELS,
  actionOptions: {
    uri: 'rooms/recommendations',
    method: asyncField.METHODS.GET,
  }
})

export const updateRoom = asyncField({
  reducerTemplate: asyncField.REDUCER_TEMPLATE.EDIT_MODEL,
  actionOptions: {
    uri: 'rooms',
    method: asyncField.METHODS.PATCH,
  }
})

export const bookings = asyncField({
  reducerTemplate: asyncField.REDUCER_TEMPLATE.MANY_MODELS,
  actionOptions: {
    uri: 'rooms',
    method: asyncField.METHODS.GET
  }
})

export const createBooking = asyncField({
  reducerTemplate: asyncField.REDUCER_TEMPLATE.CREATE_MODEL,
  actionOptions: {
    uri: 'rooms',
    method: asyncField.METHODS.POST
  }
})

export const publicRooms = asyncField({
  reducerTemplate: asyncField.REDUCER_TEMPLATE.MANY_MODELS,
  actionOptions: {
    uri: 'rooms',
    method: asyncField.METHODS.GET,
  }
})


export const userRooms = asyncField({
  reducerTemplate: asyncField.REDUCER_TEMPLATE.MANY_MODELS,
  actionOptions: {
    uri: 'users/profile/rooms',
    method: asyncField.METHODS.GET
  }
})

export default combineFieldReducers({
  bookings,
  createBooking,
  publicRooms,
  room,
  updateRoom,
  userRooms,
  recommendations,
});
