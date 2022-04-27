import {OPEN_MODEL,CLOSE_MODEL} from "../constants";

const initialState = {
  open: false,
};

const modelReducer = (state = initialState, action) => {
  const type = action.type;

  switch (type) {
    case OPEN_MODEL:
      return { ...state, open: true };
    case CLOSE_MODEL:
      return { ...state, open: false };
    default:
      return state;
  }
};

export default modelReducer;
