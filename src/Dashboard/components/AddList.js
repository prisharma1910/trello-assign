import React from 'react';

export default class AddList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title || '',
      desc: this.props.description || '',
    }
    this.updateText = this.updateText.bind(this);
  }

  updateText(e) {
    this.setState({
      title: e.currentTarget.value
    })
  }

  render() {
    return (
      <React.Fragment>
        <div className="field is-grouped">
          <div className="control">
            <input value={this.state.title} onChange={this.updateText} placeholder={'Title'} className="input is-small"/>
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button onClick={() => this.props.primaryAction(this.state)} className="button is-small is-link"> {this.props.primaryActionText} </button>
          </div>
          <div className="control">
            <button onClick={this.props.onCancel} className="button is-text is-small"> Cancel </button>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
