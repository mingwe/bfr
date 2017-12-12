import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
// import styles from './AddBrustInput.css';

import * as MYCONST from '../constants/ApiConst';

export default class AddBrustInput extends Component {
  static propTypes = {
    addMark: PropTypes.func.isRequired
  }

    changeCurrVal (e) {

        const name = e.target.value.trim();
        this.props.actions.addMark(name);
        this.setState({ name: '' });
    }

  render () {
    var optionsTemplate = this.props.allMarks.map(function (item, index) {
      return (
          <option key={item.value}>{item.name}</option>
      )
    });
    return (
      <div>
        <select onChange={this.changeCurrVal.bind(this)}>
            {optionsTemplate}
        </select>
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

  handleChangeModel (e) {
    this.setState({ name: e.target.value });
  }

  handleSubmitModel (e) {
    const name = e.target.value.trim();
    console.log(name);
    console.log(MYCONST.API_KEY);
    if (e.which === 13) {
      this.props.addModel(name);
      this.setState({ name: '' });
    }
  }

}
