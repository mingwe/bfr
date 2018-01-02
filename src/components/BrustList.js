import React, { Component, PropTypes } from 'react';
import mapValues from 'lodash/object/mapValues';
import $ from 'jquery';

import styles from './BrustList.css';
import * as MYCONST from "../constants/ApiConst";
import axios from "axios/index";


class BrustListItem extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        delAll: PropTypes.func.isRequired
    }

    render () {
        return (
                <div>
                    <div><span>{this.props.name}</span></div>
                    <button className={`btn btn-default ${styles.btnAction}`} onClick={() => this.props.delAll('mark')}>
                        del all122
                    </button>
                </div>
        );
    }

}

export default class BrustList extends Component {
  static propTypes = {
    marklist: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  }


    constructor(props, context) {
        super(props, context);

        this.state = {
            page: 0
        };
    };


    componentDidMount() {
      if (this.props.url != false) {
          this.doRequest();
      }
        console.log(this.props);
      console.log('props upper');
    };

    componentDidUpdate(prevProps, prevState) {
        console.log('comp updated');
        console.log('prevstate: '+ prevState.page);
        console.log('nowstate: '+ this.state.page);
        if (prevState.page != this.state.page) {
            this.doRequest();
        }
        else {
            if ((prevProps.url != this.props.url && this.props.url != false) || (prevState.page != this.state.page)) {
                this.doRequest();
            }
        }
    }

    changePage(direction, e) {
        if (direction) {
            this.setState({page: this.state.page+1});
        }
        else {
            if (this.state.page > 0) {
                this.setState({page: this.state.page - 1});
            }
        }
    }

    doRequest() {
        $.ajax({
            url: this.props.url + '&page='+this.state.page,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data, updated: true});
                console.log('watch dis');
                console.log(this.props.url);
                console.log(data);
            }.bind(this),
            error: function(xhr, status, err) {
                console.log('ajax end (not success)');
            }.bind(this)
        });
    }


  render () {

      var searchResult = '';
      var propsActions = this.props.actions;
      if (this.state && this.state.data && this.state.data.result) {
          searchResult = this.state.data.result.search_result.ids.map(function(item, index) {
              return (
                  <BrustListOneItem actions={propsActions} id={item}/>
              )
          });
      }

    return (
      <div className={styles.BrustList}>
          {this.props.marklist.model && <span>model selected</span>}
         <BrustListItem
              key={this.props.marklist.mark}
              id={this.props.marklist.mark}
              name={this.props.marklist.model}
              {...this.props.actions}
         />
          {searchResult &&
              <div className={'pagination'}>
                <div className={'pagination-current'}>
                    {this.state.updated && this.state.page + 1}
                </div>
                <button onClick={this.changePage.bind(this, false)}>prev</button>
                <button onClick={this.changePage.bind(this, true)}>next</button>
              </div>
          }
          {searchResult && <div className="true-result">{searchResult}</div>}
      </div>
    );
  }

}

class BrustListOneItem extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            params: ''
        }
    };

    componentDidMount() {
        // this.props.actions.doRequest(this.props.id);

        axios.get(MYCONST.HOST_URL+'auto/info?api_key='+MYCONST.API_KEY+'&auto_id='+this.props.id)
            .then(res => {
                if (res.status === 200) {
                    this.setState({
                        params: res.data
                    });
                }
                else {
                    console.log('fail');
                    return false;
                }
            });
    }

    render() {

        return (
                <div className="brust-one">
                    {this.state.params &&
                        <div className="brust-one-inner">
                            <p>{this.state.params.title}</p>
                            <img src={this.state.params.photoData.seoLinkB}/>
                            <h3>{this.state.params.USD}</h3>
                            <h4>{this.state.params.autoData.fuelName}</h4>
                            <h4>{this.state.params.autoData.year}</h4>
                            {/*{this.props.id}*/}
                        </div>
                    }
                </div>
        )
    }
}