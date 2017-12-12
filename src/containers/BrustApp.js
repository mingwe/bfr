import React, { Component, PropTypes } from 'react';
import styles from './BrustApp.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as BrustActions from '../actions/BrustActions';
import { BrustList, AddBrustInput } from '../components';

import * as MYCONST from '../constants/ApiConst';

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

      var searchUrl;

      if (marks && marks.mark && marks.model) {
         searchUrl = MYCONST.HOST_URL + 'auto/search?api_key='+MYCONST.API_KEY+'&category_id=1&countpage=50&with_photo=1&marks='+marks.mark+'&models='+marks.model;
      }
      else {
         searchUrl = false;
      }


    return (
      <div className="supah-class">
        <h1>_</h1>
        <AddBrustInput name="mark" allMarks={allMarks} actions={actions} url={MYCONST.HOST_URL + 'auto/categories/1/marks?api_key='+MYCONST.API_KEY}/>

        {marks.mark &&
          <AddBrustInput name="model" testparam={marks.mark} allMarks={allMarks} actions={actions} url={MYCONST.HOST_URL + 'auto/categories/1/marks/'+marks.mark+'/models?api_key='+MYCONST.API_KEY}/>
        }

        <BrustList marklist={marks} actions={actions} url={searchUrl} />
          {marks && <p>Selected: {marks.mark}</p>}
      </div>
    );
  }
}

export default BrustApp;