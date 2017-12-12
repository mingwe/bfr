import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './BrustListItem.css';

export default class BrustListItem extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
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
            del all
          </button>
        </div>
      </li>
    );
  }

}
