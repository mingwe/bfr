import React, { Component, PropTypes } from 'react';
import mapValues from 'lodash/object/mapValues';

import styles from './BrustList.css';
import BrustListItem from './BrustListItem';

export default class BrustList extends Component {
  static propTypes = {
    marks: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  }

  render () {
    return (
      <div className={styles.BrustList}>
         <BrustListItem
              key={this.props.marklist.mark}
              id={this.props.marklist.mark}
              name={this.props.marklist.model}
              {...this.props.actions}
         />
      </div>
    );
  }

}
