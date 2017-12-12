import React, { Component, PropTypes } from 'react';
import styles from './BrustApp.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as BrustActions from '../actions/BrustActions';
import { BrustList, AddBrustInput } from '../components';

@connect(state => ({
  marklist: state.brustlist
}))


class BrustApp extends Component {

  static propTypes = {
    mark: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  render () {
    const { marklist: { marks }, dispatch } = this.props;
    const actions = bindActionCreators(BrustActions, dispatch);

    return (
      <div className={styles.brustApp}>
        <h1>The BRUST</h1>
        <AddBrustInput addMark={actions.addMark} addModel={actions.addModel}/>
        <BrustList marklist={marks} actions={actions} />
        <p>{marks}</p>
      </div>
    );
  }
}

export default BrustApp;