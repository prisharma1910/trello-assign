import React from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

import { AddList, EditModal } from './components';
import { getInitialData, updateListSequence, updateList, updateItem, deleteItem, addNewList, showModal } from './Dashboard.actions';
import { default as List } from './components/List';
import 'bulma/css/bulma.css';
import './Dashboard.css';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.getListItems = this.getListItems.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.toggleAdd = this.toggleAdd.bind(this);
    this.saveNewList = this.saveNewList.bind(this);
    this.state = { addList: false };
  }

  componentDidMount() {
    this.props.getInitialList();
  }

  toggleAdd() {
    this.setState({
      addList: !this.state.addList
    })
  }

  saveNewList(data) {
    this.props.addList(data);
    this.toggleAdd();
  }

  onDragEnd(result) {
    let sourceList = result.source.droppableId;
    let targetList = result.destination ? result.destination.droppableId : null;
    let itemId = result.draggableId;
    let sourcePos = result.source.index;
    let targetPos = result.destination && result.destination.index;
    if (sourceList === targetList) {
      let newSequence = this.props.list[sourceList].sequence;
      newSequence.splice(sourcePos, 1);
      newSequence.splice(targetPos, 0, itemId);
      this.props.updateListItemSeq(sourceList, newSequence);
    } else if (targetList) {
      let sourceListNewSeq = this.props.list[sourceList].sequence;
      sourceListNewSeq.splice(sourcePos, 1);
      let targetListNewSeq = this.props.list[targetList].sequence;
      targetListNewSeq.splice(targetPos, 0, itemId);
      this.props.updateListItemSeq(sourceList, sourceListNewSeq);
      this.props.updateListItemSeq(targetList, targetListNewSeq);
    }
  }

  getListItems(itemSequence) {
    let result = [];
    const { items } = this.props;
    for (let i = 0; i < itemSequence.length; i++) {
      result.push({ ...items[itemSequence[i]], 'itemId': itemSequence[i] });
    }
    return result;
  }

  render() {
    const { list, listOrder, updateItemData, deleteItem, addItemOnList, showModal } = this.props;
    const listJsx = [];
    if (listOrder) {
      listOrder.forEach((listId, id) => {
        listJsx.push(<List
          key={listId}
          listId={listId}
          listData={list[listId]}
          getItems={() => this.getListItems(list[listId].sequence)}
          onUpdateItem={updateItemData}
          onDeleteItem={deleteItem}
          onAddItem={addItemOnList}
          showModal={showModal}
        />)
      });
    }
    return (
      <div className="main-content">
        <header className="margin-bottom-5">
          <button onClick={this.toggleAdd} className="button is-primary is-pulled-right">Add List</button>
          <h1 className="title">Sample Trello Board</h1>
          {this.state.addList &&
            <AddList
              primaryAction={this.saveNewList}
              primaryActionText={"Save"}
              onCancel={this.toggleAdd}
            />
          }
        </header>
        <div className="list-container">
          <EditModal />
          <DragDropContext onDragEnd={this.onDragEnd}>
            <div className="columns">
              {listJsx}
            </div>
          </DragDropContext>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { dashboardData } = state;
  return dashboardData.listData ? {
    list: dashboardData.listData,
    items: dashboardData.items,
    listOrder: dashboardData.listOrder.listOrder,
  } : {};
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getInitialList: () => {
      dispatch(getInitialData())
    },
    updateListItemSeq: (listId, newSequence) => {
      dispatch(updateListSequence(listId, newSequence))
    },
    addItemOnList: (listId, updatedData) => {
      dispatch(updateList(listId, updatedData))
    },
    updateItemData: (itemId, updatedData) => {
      dispatch(updateItem(itemId, updatedData))
    },
    deleteItem: (listId, itemId) => {
      dispatch(deleteItem(listId, itemId))
    },
    addList: (listData) => {
      dispatch(addNewList(listData))
    },
    showModal: (modalData) => {
      dispatch(showModal(modalData))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);