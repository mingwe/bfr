import React, { Component, PropTypes } from 'react';
import styles from './FriendListApp.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as FriendsActions from '../actions/FriendsActions';
import { FriendList, AddFriendInput } from '../components';

@connect(state => ({
  friendlist: state.friendlist,
  marklist: state.friendlist
}))


class FriendListApp extends Component {

  static propTypes = {
    friendsById: PropTypes.object.isRequired,
    marks: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  render () {
    const { friendlist: { friendsById }, marklist: { marks }, dispatch } = this.props;
    const actions = bindActionCreators(FriendsActions, dispatch);    

    return (
      <div className={styles.friendListApp}>
        <h1>The FriendList</h1>
        <AddFriendInput addFriend={actions.addFriend} addMark={actions.addMark} addModel={actions.addModel}/>
        <FriendList friends={friendsById} marklist={marks} actions={actions} />
        <p>{marks}</p>
      </div>
    );
  }
}

export default FriendListApp;