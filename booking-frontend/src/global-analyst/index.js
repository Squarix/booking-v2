import AuthService from '../_services/AuthService';
import { apiUrl } from '../_services/config';

const service = new AuthService(apiUrl);
const getUrl = type => `${apiUrl}/analyst/${type}`;

export const EventTypes = {
  FocusEvent: 'focus',
  FocusImageEvent: 'focusImage',
  ViewDateEvent: 'viewDate',
  ViewEvent: 'view',
}

const getBody = params => ({
  body: JSON.stringify(params),
  method: 'POST',
})

export const analystViewAction = (roomId, query) => {
  service.fetch(getUrl(EventTypes.ViewEvent), getBody({ roomId, query })).catch(() => {});
}

export const analystViewDatesAction = roomId => {
  service.fetch(getUrl(EventTypes.ViewDateEvent),  getBody({ roomId })).catch(() => {});
}

export const analystImageFocusAction = (roomId, imageId) => {
  service.fetch(getUrl(EventTypes.FocusImageEvent), getBody({ roomId, imageId })).catch(() => {});
}

export const analystRoomFocusAction = (roomId, time, query) => {
  service.fetch(getUrl(EventTypes.FocusEvent), getBody({ roomId, time, query })).catch(() => {});
}
