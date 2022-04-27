import { OPEN_MODEL, CLOSE_MODEL } from '../constants';

export const openModal = () => (dispatch) => {
  dispatch({ type: OPEN_MODEL });
};

export const closeModal = () => (dispatch) => {
  dispatch({ type: CLOSE_MODEL });
};
