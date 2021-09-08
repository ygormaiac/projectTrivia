import { LOADING_GAME, SUCCESS_INITIAL_GAME, ERROR_INITIAL_GAME } from '../actions';

const INITIAL_STATE = {
  loading: false,
  error: '',
  results: [],
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOADING_GAME:
    return { ...state, loading: true };
  case SUCCESS_INITIAL_GAME:
    return { ...state, loading: false, results: action.payload };
  case ERROR_INITIAL_GAME:
    return { ...state, loading: false, error: 'Deu ruim!' };
  default:
    return state;
  }
};

export default playerReducer;
