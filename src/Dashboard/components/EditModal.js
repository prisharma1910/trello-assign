import React from 'react';
import { connect } from 'react-redux';
import { hideModal } from '../Dashboard.actions';
import _ from 'lodash';


class EditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.modalData.title || '',
      desc: this.props.modalData.desc || '',
      comments: this.props.modalData.comments || [],
      newComment: '',
      addComment: false
    }
    this.updateText = this.updateText.bind(this);
    this.updateDesc = this.updateDesc.bind(this);
    this.updateComments = this.updateComments.bind(this);
    this.addComment = this.addComment.bind(this);
    this.saveComment = this.saveComment.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps, this.props)) {
      this.setState({
        title: this.props.modalData.title || '',
        desc: this.props.modalData.desc || '',
        comments: this.props.modalData.comments || [],
        newComment: '',
        addComment: false
      })
    }
  }

  updateText(e) {
    this.setState({
      title: e.currentTarget.value
    })
  }

  updateDesc(e) {
    this.setState({
      desc: e.currentTarget.value
    });
  }

  updateComments(e) {
    this.setState({
      newComment: e.currentTarget.value
    });
  }

  addComment() {
    this.setState({
      addComment: true,
    });
  }

  saveComment() {
    let comments = Object.assign([], this.state.comments);
    comments.push(this.state.newComment);
    this.setState({
      addComment: !this.state.addComment,
      comments,
      newComment: ''
    });
  }

  onSave() {
    const { title, desc, comments } = this.state;
    this.props.modalData.onSave({
      title,
      desc,
      comments
    })
  }

  render() {
    if (!this.props.showModal) {
      return null;
    }
    const { onDelete } = this.props.modalData;
    const { title, desc, comments, newComment, addComment } = this.state;
    return (
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-content">
          <div className="field">
            <label className="label has-text-white"> Title: </label>
            <div className="control">
              <input value={title} onChange={this.updateText} placeholder={'Title'} className="input is-small" />
            </div>
          </div>
          <div className="field">
            <label className="label has-text-white"> Description: </label>
            <div className="control">
              <input value={desc} onChange={this.updateDesc} placeholder={'Description'} className="input is-small" />
            </div>
          </div>
          <div className="field">
            {comments.length > 0 && <label className="label has-text-white"> Comments: </label>}
            {comments.length > 0 && comments.map((i) => { return <p className="has-text-white" key={i}>{i}</p> })}
            {addComment ?
              <div className="control">
                <input value={newComment} onChange={this.updateComments} placeholder={'Add Comment'} className="input is-small" />
                <button onClick={this.saveComment} className="button is-link is-small is-pulled-right"> Save Comment </button>
              </div> :
              <button onClick={this.addComment} className="button is-link is-small is-pulled-right"> Add Comment </button>
            }
          </div>
          <div className="field is-grouped">
            <div className="control">
              <button onClick={this.onSave} className="button is-small is-primary"> Save </button>
            </div>
            <div className="control">
              <button onClick={onDelete} className="button is-small is-link is-danger"> Delete </button>
            </div>
            <div className="control">
              <button onClick={this.props.onCancel} className="button is-link is-small"> Cancel </button>
            </div>
          </div>
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={this.props.onCancel} ></button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { showModal, modalData } = state;
  return { showModal, modalData };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onCancel: (modalData) => {
      dispatch(hideModal(modalData))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditModal);