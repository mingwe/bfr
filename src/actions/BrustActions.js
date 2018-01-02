import * as types from '../constants/ActionTypes';

export function addMark(name) {
  return {
    type: types.ADD_MARK,
    name
  };
}

export function addModel(name) {
  return {
    type: types.ADD_MODEL,
    name
  };
}

export function delAll(name) {
    return {
        type: types.DEL_ALL,
        name
    };
}

export function doRequest(name) {
    return {
        type: types.DO_REQUEST,
        name
    };
}