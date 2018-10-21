import {
  GET_LIST_DATA,
  UPDATE_LIST_SEQUENCE,
  UPDATE_LIST,
  UPDATE_ITEM,
  DELETE_ITEM,
  GET_LIST_DATA_SUCCESS,
  ADD_NEW_LIST,
  SHOW_MODAL,
  HIDE_MODAL
} from './Dashboard.actionTypes';

export function getInitialData() {
  return {
    type: GET_LIST_DATA
  }
}

export function updateListSequence(listId, newSequence) {
  return {
    type: UPDATE_LIST_SEQUENCE,
    listId,
    newSequence
  }
}

export function updateList(listId, updatedData) {
  return {
    type: UPDATE_LIST,
    listId,
    updatedData
  }
}

export function updateItem(itemId, updatedData) {
  return {
    type: UPDATE_ITEM,
    itemId,
    updatedData
  }
}

export function deleteItem(itemId) {
  return {
    type: DELETE_ITEM,
    itemId
  }
}

export function getListDataSucess(data) {
  return {
    type: GET_LIST_DATA_SUCCESS,
    data
  }
}

export function addNewList(newData) {
  return {
    type: ADD_NEW_LIST,
    newData
  }
}

export function showModal(modalData) {
  return {
    type: SHOW_MODAL,
    modalData
  }
}

export function hideModal() {
  return {
    type: HIDE_MODAL
  }
}