export const SET_PERSONAL_INFO = 'SET_PERSONAL_INFO';
export const LOADING_GAME = 'LOADING_API';
export const SUCCESS_INITIAL_GAME = 'SUCCESS_INITIAL_GAME';
export const ERROR_INITIAL_GAME = 'ERROR_INITIAL_GAME';

export const saveLoginInfo = (payload) => ({
  type: SET_PERSONAL_INFO,
  payload,
});

export const loadingGame = (payload) => ({
  type: LOADING_GAME,
  payload,
});

export const successGame = (payload) => ({
  type: SUCCESS_INITIAL_GAME,
  payload,
});

export const errorGame = (error) => ({
  type: ERROR_INITIAL_GAME,
  error,
});

// export const fetchGameAPI = (dispatch) => {
//   dispatch(loadingGame());
//   fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
//     .then((response) => response.json()
//       .then((data) => {
//         dispatch(successGame(data)),
//         dispatch(errorGame())
//       }
//     ));
// }

export function fetchGameAPI() {
  return async (dispatch) => {
    const token = JSON.parse(localStorage.getItem('token'));
    dispatch(loadingGame());
    try {
      const data = await (await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)).json();
      return dispatch(successGame(data.results));
    } catch (error) {
      return dispatch(errorGame(error));
    }
  };
}
