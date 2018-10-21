import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

export default class Item extends React.Component {
  constructor(props) {
    super(props);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.onDeleteItem = this.onDeleteItem.bind(this);
  }

  toggleEdit() {
    const { itemData } = this.props;
    this.props.showModal({
      title: itemData.title,
      desc: itemData.desc,
      comments: itemData.comments,
      onSave: this.updateItem,
      onDelete: this.onDeleteItem
    })
  }

  updateItem(data) {
    this.props.onUpdateItem(this.props.itemData.itemId, data);
  }

  onDeleteItem() {
    this.props.onDeleteItem(this.props.itemData.itemId);
  }

  render() {
    const { itemData, index } = this.props;

    return (
      <Draggable
        key={itemData.itemId}
        draggableId={itemData.itemId}
        index={index}
      >
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            className="panel-block"
          >
            <div className="item-container">
              <p> <strong> {itemData.title} </strong> </p>
              <span><strong>Desc</strong>: </span>{itemData.desc}
              <br />
              <span><strong>Comments</strong>: </span>{itemData.comments.length}
              <div className="is-pulled-right">
                <button onClick={this.toggleEdit} className="button is-light">Edit</button>
              </div>
            </div>
            {provided.placeholder}
          </div>
        )}
      </Draggable>
    )
  }
}