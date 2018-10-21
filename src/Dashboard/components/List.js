import React from 'react';
import { default as Item } from './Item';
import { default as AddList } from './AddList';
import { Droppable } from 'react-beautiful-dnd';

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAdd: false
    }
    this.addItem = this.addItem.bind(this);
    this.toggleAdd = this.toggleAdd.bind(this);
  }

  toggleAdd() {
    this.setState({
      showAdd: !this.state.showAdd
    })
  }

  addItem(data) {
    this.props.onAddItem(this.props.listId, data);
    this.toggleAdd();
  }

  render() {
    const { listData, getItems, onUpdateItem, onDeleteItem, listId, showModal } = this.props;
    const itemJsx = [];
    const items = getItems();
    items.forEach((item, id) => {
      itemJsx.push(<Item key={id} index={id} itemData={item} onUpdateItem={onUpdateItem} onDeleteItem={onDeleteItem} showModal={showModal} />)
    });
    return (
      <div className="column is-one-third">
       <p className="panel-heading">{listData.title}</p>
        <Droppable droppableId={listId}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="panel">
                {itemJsx}
                {provided.placeholder}
            </div>)}
        </Droppable>
        {this.state.showAdd ?
          <AddList
            primaryAction={this.addItem}
            primaryActionText={"Save"}
            onCancel={this.toggleAdd}
            isItem
          /> :
          <button onClick={this.toggleAdd} className="button">Add Item</button>
        }
      </div>
    )
  }
}
