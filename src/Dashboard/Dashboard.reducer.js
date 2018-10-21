
import {
  GET_LIST_DATA_SUCCESS,
  UPDATE_LIST_SEQUENCE_SUCCESS,
  UPDATE_LIST_SUCCESS,
  UPDATE_ITEM_SUCCESS,
  DELETE_ITEM_SUCCESS,
  SHOW_MODAL,
  HIDE_MODAL,
} from './Dashboard.actionTypes';

function dashboardData(state, action) {
  //can handle actions via switch-case for different scenarios
  const { type, data } = action;
  switch (type) {
    case GET_LIST_DATA_SUCCESS:
    case UPDATE_LIST_SEQUENCE_SUCCESS:
    case UPDATE_LIST_SUCCESS:
    case UPDATE_ITEM_SUCCESS:
    case DELETE_ITEM_SUCCESS:
      return data;
    default:
      return state.dashboardData || {};
  }
}

function showModal(state, action) {
  const { type } = action;
  switch (type) {
    case SHOW_MODAL:
      return true;
    case HIDE_MODAL:
      return false;
    default:
      return false;
  }
}

function modalData(state, action) {
  const { type, modalData } = action;
  switch (type) {
    case SHOW_MODAL:
      return modalData;
    case HIDE_MODAL:
      return {};
    default:
      return {};
  }
}

export default function DashboardReducer(state = {}, action) {
  return {
    dashboardData: dashboardData(state, action),
    showModal: showModal(false, action),
    modalData: modalData({}, action)
  }
}