import React from 'react';

export default class AddList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title || '',
      desc: this.props.description || '',
    }
    this.updateText = this.updateText.bind(this);
    this.updateDesc = this.updateDesc.bind(this);
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

  render() {
    const { isItem } = this.props;

    return (
      <React.Fragment>
        <div className="field">
          <div className="control">
            <input value={this.state.title} onChange={this.updateText} placeholder={'Title'} className="input is-small" />
          </div>
        </div>
        <div className="field">
          <div className="control">
            {isItem && <React.Fragment> <input value={this.state.desc} onChange={this.updateDesc} placeholder={'Description'} className="input is-small" /> <br /> </React.Fragment>}
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button onClick={() => this.props.primaryAction(this.state)} className="button is-small is-link"> {this.props.primaryActionText} </button>
          </div>
          <div className="control">
            {this.props.secondaryAction ? <button onClick={this.props.secondaryAction} className="button is-small is-danger is-outlined"> {this.props.secondaryActionText} </button> : null}
          </div>
          <div className="control">
            <button onClick={this.props.onCancel} className="button is-text is-small"> Cancel </button>
          </div>
        </div>
      </React.Fragment>
    )
  }
}