import React, { Component, PropTypes } from 'react';
import mapValues from 'lodash/object/mapValues';

import styles from './BrustList.css';


class BrustListItem extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        delAll: PropTypes.func.isRequired
    }

    render () {
        return (
            <li>
                <div>
                    <div><span>{this.props.name}</span></div>
                </div>
                <div>
                    <button className={`btn btn-default ${styles.btnAction}`} onClick={() => this.props.delAll('mark')}>
                        del all1
                    </button>
                </div>
            </li>
        );
    }

}

export default class BrustList extends Component {
  static propTypes = {
    marklist: PropTypes.object.isRequired,
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