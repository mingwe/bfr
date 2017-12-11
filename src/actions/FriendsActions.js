import * as types from '../constants/ActionTypes';

export function addFriend(name) {
  return {
    type: types.ADD_FRIEND,
    name
  };
}

export function deleteFriend(id) {
  return {
    type: types.DELETE_FRIEND,
    id
  };
}

export function starFriend(id) {
  return {
    type: types.STAR_FRIEND,
    id
  };
}

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