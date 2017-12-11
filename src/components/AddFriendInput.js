import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './AddFriendInput.css';

export default class AddFriendInput extends Component {
  static propTypes = {
    addFriend: PropTypes.func.isRequired
  }

  render () {
    return (
      <div>
      <input
        type="text"
        autoFocus="true"
        className={classnames('form-control', styles.addFriendInput)}
        placeholder="Type the name of a friend"
        value={this.state.name}
        onChange={this.handleChange.bind(this)}
        onKeyDown={this.handleSubmit.bind(this)} />
      <input
        type="text"
        autoFocus="true"
        className="input-mark"
        placeholder="Type the mark"
        value={this.state.name}
        onChange={this.handleChangeMark.bind(this)}
        onKeyDown={this.handleSubmitMark.bind(this)} />
      <input
        type="text"
        autoFocus="true"
        className="input-model"
        placeholder="Type the model"
        value={this.state.name}
        onChange={this.handleChangeModel.bind(this)}
        onKeyDown={this.handleSubmitModel.bind(this)} />
      </div>
    );    
  }

  constructor (props, context) {
    super(props, context);
    this.state = {
      name: this.props.name || '',
    };
  }

  handleChange (e) {
    this.setState({ name: e.target.value });
  }

  handleSubmit (e) {
    const name = e.target.value.trim();
    console.log(name);
    console.log(e.which);
    if (e.which === 13) {
      this.props.addFriend(name);
      this.setState({ name: '' });
    }
  }

  handleChangeMark (e) {
    this.setState({ name: e.target.value });
  }

  handleSubmitMark (e) {
    const name = e.target.value.trim();
    console.log(name);
    console.log(e.which);
    if (e.which === 13) {
      this.props.addMark(name);
      this.setState({ name: '' });
    }
  }

  handleChangeModel (e) {
    this.setState({ name: e.target.value });
  }

  handleSubmitModel (e) {
    const name = e.target.value.trim();
    console.log(name);
    console.log(e.which);
    if (e.which === 13) {
      this.props.addModel(name);
      this.setState({ name: '' });
    }
  }

}
