import { put, fork, takeEvery, all, select } from 'redux-saga/effects';
import {
  GET_LIST_DATA,
  UPDATE_LIST_SEQUENCE,
  UPDATE_LIST,
  UPDATE_ITEM,
  DELETE_ITEM,
  ADD_NEW_LIST
} from './Dashboard.actionTypes';
import { getListDataSucess } from './Dashboard.actions';
import { listData, items, listOrder } from '../initial-data';
import _ from 'lodash';

let min = 20;
let max = 100;
let listmin = 5;
let listmax = 10;

const getData = () => {
  return { listData, items, listOrder };
}

const deleteItemFromList = (data, itemId) => {
  let result = data;
  let listData = result.listData;
  let objKeys = Object.keys(listData);
  for (let i = 0; i < objKeys.length; i++) {
    let currentSeq = listData[objKeys[i]].sequence;
    if (currentSeq.indexOf(itemId) > -1) {
      currentSeq.splice(currentSeq.indexOf(itemId), 1);
      listData[objKeys[i]].sequence = currentSeq;
    }
  }
  return result;
}

export function* getListData() {
  yield put(getListDataSucess(getData()));
}

export function* updateListSequence(action) {
  const { listId, newSequence } = action;
  let state = yield select();
  let data = _.cloneDeep(state.dashboardData);
  data.listData[listId].sequence = newSequence;
  yield put(getListDataSucess(data));
}

export function* updateList(action) {
  let { listId, updatedData } = action;
  let state = yield select();
  let listData = _.cloneDeep(state.dashboardData.listData);
  let items = _.cloneDeep(state.dashboardData.items);
  const newItemId = Math.round(Math.random() * (max - min) + min);
  items[newItemId] = { "title": updatedData.title, "desc": updatedData.desc, "comments": [] };
  listData[listId].sequence.push(newItemId);
  min = min + newItemId;
  max = max + newItemId;
  yield put(getListDataSucess({ listData, items, listOrder: state.dashboardData.listOrder }));
}

export function* updateItem(action) {
  const { itemId, updatedData } = action;
  let state = yield select();

  let data = _.cloneDeep(state.dashboardData);  
  let items = data.items;
  items[itemId].title = updatedData.title;
  items[itemId].desc = updatedData.desc;
  items[itemId].comments = updatedData.comments;
  yield put(getListDataSucess(data));
}

export function* deleteItem(action) {
  const { itemId } = action;
  let state = yield select();
  let data = _.cloneDeep(state.dashboardData);
  let items = data.items;
  delete items[itemId];
  // This deleting Item could have been done in
  // better but due to time limits making it hard-coded
  let updatedData = deleteItemFromList(data, itemId);
  yield put(getListDataSucess(updatedData));
}

export function* addNewList(action) {
  const { newData } = action;
  let state = yield select();
  let data = _.cloneDeep(state.dashboardData);
  let listData = data.listData;
  const newListId = Math.round(Math.random() * (listmax - listmin) + listmin);
  listmax = listmax + newListId;
  listmin = listmin + newListId;
  listData['list' + newListId] = { title: newData.title, sequence: [] };
  data.listOrder.listOrder.push('list' + newListId);
  yield put(getListDataSucess(data));
}

function* watchGetList() {
  yield takeEvery(GET_LIST_DATA, getListData);
}

function* watchUpdateListSequence() {
  yield takeEvery(UPDATE_LIST_SEQUENCE, updateListSequence);
}

function* watchUpdateList() {
  yield takeEvery(UPDATE_LIST, updateList);
}

function* watchUpdateItem() {
  yield takeEvery(UPDATE_ITEM, updateItem);
}

function* watchDeleteItem() {
  yield takeEvery(DELETE_ITEM, deleteItem);

}

function* watchAddList() {
  yield takeEvery(ADD_NEW_LIST, addNewList);
}

export default function* DashboardSaga() {
  yield all([
    fork(watchGetList),
    fork(watchUpdateListSequence),
    fork(watchUpdateList),
    fork(watchUpdateItem),
    fork(watchDeleteItem),
    fork(watchAddList)
  ])
}