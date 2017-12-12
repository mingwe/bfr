import React, { Component, PropTypes } from 'react';
import styles from './BrustApp.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as BrustActions from '../actions/BrustActions';
import { BrustList, AddBrustInput } from '../components';

@connect(state => ({
  marklist: state.brustlist
}))

var allMarks = {
    0: {
        value: '001',
        name: 'Audi'
    },
    1: {
        value: '002',
        name: 'BMW'
    },
    2: {
        value: '331',
        name: 'Ford'
    }
};

class BrustApp extends Component {

  static propTypes = {
    marklist: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  render () {
    const { marklist: { marks }, dispatch } = this.props;
    const actions = bindActionCreators(BrustActions, dispatch);

    return (
      <div className="supah-class">
        <h1>The BRUST11</h1>
        <AddBrustInput allMarks="asd"/>
        <BrustList marklist={marks} actions={actions} />
        <p>{marks}</p>
      </div>
    );
  }
}

export default BrustApp;