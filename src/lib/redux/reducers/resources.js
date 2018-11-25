import { RESOURCE_FETCH_SUCCESS } from '../../components/redux/types';
import { CHANGE_LOCALE_MSGS } from '../../i18n';

export const initialState = {
  formdata: [],
  ticketgroups: [],
  tickets: [],
  photos: [],
  bookingmap: [],
  exhibitors : [],
  texts : {}
};

const reducer = (state = initialState, action) => {
  const { type, resource, data } = action;

  switch (type) {
    case RESOURCE_FETCH_SUCCESS:
      return { ...state, [resource]: data };
    break;

    case CHANGE_LOCALE_MSGS:
        return { ...state, texts: action.messages };
    break;

    default:
      return state;
  }
};

export default reducer;
