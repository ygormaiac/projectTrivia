import { SET_PERSONAL_INFO } from '../actions';

const INITIAL_STATE = {
  email: '',
  name: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_PERSONAL_INFO:
    return {
      ...state,
      email: action.payload.email,
      name: action.payload.name };
  default:
    return state;
  }
};

export default userReducer;
