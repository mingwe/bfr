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
    marklist: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  render () {
    const { marklist: { marks }, dispatch } = this.props;
    const actions = bindActionCreators(BrustActions, dispatch);

      var allMarks = [
          {
              value: '001',
              name: 'Audi'
          },
          {
              value: '002',
              name: 'BMW'
          },
          {
              value: '331',
              name: 'Ford'
          }
      ];

    return (
      <div className="supah-class">
        <h1>The BRUST12</h1>
        <AddBrustInput allMarks={allMarks} actions={actions}/>
        <BrustList marklist={marks} actions={actions} />
        <p>{marks}</p>
      </div>
    );
  }
}

export default BrustApp;