import React, { Component, PropTypes } from 'react';
//import styles from './BrustApp.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as BrustActions from '../actions/BrustActions';
import { BrustList, AddBrustInput } from '../components';
import BrustFilter from '../components/BrustFilter';

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

      var searchUrl, options, filter;

      if (Object.keys(this.props.marklist.filter).length) {
          filter = this.props.marklist.filter;

          filter = Object.keys(filter).map(function (item, index) {
              return (
                  '&'+item+'='+filter[item]
              )
          });
          filter = filter.join('');
          console.log(filter);
      }
      else {
          console.log('filter unset');
          console.log(this.props.marklist.filter.length);
          filter = '';
      }

      if (marks && marks.mark && marks.model) {
         searchUrl = MYCONST.HOST_URL + 'auto/search?api_key='+MYCONST.API_KEY+'&category_id=1&countpage=50&with_photo=1&marka_id[0]='+marks.mark+'&model_id[0]='+marks.model+filter;
         console.log('searchurl');
         console.log(searchUrl);
      }
      else {
         searchUrl = false;
      }


    return (
      <div className="supah-class container">
          <h1 className="mt-4 mb-3">Find your rusty dream...</h1>

          <div className="search-menu row">
              <div className="col-xs-12 col-md-6">
                  <AddBrustInput name="mark" actions={actions} url={MYCONST.HOST_URL + 'auto/categories/1/marks?api_key='+MYCONST.API_KEY}/>

                  {marks.mark &&
                  <AddBrustInput name="model" mark={marks.mark} actions={actions} url={MYCONST.HOST_URL + 'auto/categories/1/marks/'+marks.mark+'/models?api_key='+MYCONST.API_KEY}/>
                  }

                  <BrustFilter actions={actions} name="Order by" apiname="order_by" values="0;1;2" ftype="select" />
                  <BrustFilter actions={actions} name="Gearbox" apiname="gearbox[1]" values="ANY/0;MT/1;AT/2;TT/3" ftype="select" />
              </div>
              <div className="col-xs-12 col-md-6">
                  <BrustFilter actions={actions} name="Drive wheel" apiname="drive_id" values="ANY/0;AWD/1;FWD/2;RWD/3" ftype="select" needrequest="driverTypes" needcat/>
                  <BrustFilter actions={actions} name="Year from" apiname="s_yers" values="1950" ftype="text" />
                  <BrustFilter actions={actions} name="Year till" apiname="po_yers" values="2018" ftype="text" />

                  <BrustFilter actions={actions} name="Fuel" apiname="type[0]" values="ANY/0;Benzine/1;Diesel/2;BenzineGas/3" ftype="select" needrequest="type"/>
                  {/*<BrustFilter actions={actions} name="capacity" apiname="idk" values="2;4;5" ftype="radio" />*/}
              </div>


          </div>


          <BrustList marklist={marks} actions={actions} url={searchUrl} single={this.props.marklist.single}/>
          {marks && <p>Selected: {marks.mark}</p>}
      </div>
    );
  }
}

export default BrustApp;