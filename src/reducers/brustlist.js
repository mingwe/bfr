import * as types from '../constants/ActionTypes';
import omit from 'lodash/object/omit';
import assign from 'lodash/object/assign';
import mapValues from 'lodash/object/mapValues';

const initialState = {
  marks: {}
};

export default function brust(state = initialState, action) {
  switch (action.type) {


    case types.ADD_MARK:      
      return {
        ...state,
        marks: {
          ...state.marks,
          mark: action.name
        },
      }

    case types.ADD_MODEL:      
      return {
        ...state,
        marks: {
          ...state.marks,
          model: action.name
        },
      }

    case types.DEL_ALL:
       return {
        ...state,
          marks: ''
       }

    default:
      return state;
  }
}
