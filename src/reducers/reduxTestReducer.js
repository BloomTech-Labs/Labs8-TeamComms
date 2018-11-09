import {
  REDUX_TEST
} from '../actions/types';


const initialState = {
  reduxTest: false,
  user: {
    username: "CharlieDay"
  }
}

export const reduxTest = (state = initialState, action) => {
  switch (action.type) {
    case REDUX_TEST:
      // return Object.assign({}, state, {
      //     reduxTest: true
      // })
      return { ...state,
        reduxTest: true,
      }

    default:
      return state;
  }
}