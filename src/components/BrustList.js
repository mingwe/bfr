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
                        clear
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
            page: 0,
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
            console.log('page changed');
        }
        else {
            console.log('page not changed');
            if ((prevProps.url != this.props.url && this.props.url != false) || (prevState.page != this.state.page)) {
                this.doRequest();
            }
        }
    }

    changePage(direction, e) {
        if (direction) {
            if (this.state.page < ((this.state.data.result.search_result.count / 50).toFixed(0) - 1)) {
                this.setState((prevState) => {
                    return {page: prevState.page + 1};
                });
            }
        }
        else {
            if (this.state.page > 0) {
                this.setState((prevState) => {
                    return {page: prevState.page - 1};
                });
            }
        }
    }

    doRequest() {
        console.log('updating...');
        $.ajax({
            url: this.props.url + '&page='+this.state.page,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data, updated: true});
                // console.log('watch dis');
                // console.log(this.props.url);
                // console.log(data);
                // console.log('updatted succes!');
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

      var single = this.props.single;

    return (
      <div className={styles.BrustList}>
          {single ? (
              <BrustListSingle id={single} actions={this.props.actions}/>
          ) : (
              <div className="brustlist-list">
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
          )}
      </div>
    );
  }

}

class BrustListOneItem extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            params: '',
            single: ''
        }
    };

    getInfo() {
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
    };

    componentDidMount() {
        // this.props.actions.doRequest(this.props.id);
        this.getInfo();
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.id != this.props.id) {
            this.getInfo();
        }
    };

    render() {

        return (
                <div className="brust-one" onClick={this.props.actions.showSingle.bind(this, this.props.id)}>
                    {this.state.params &&
                        <div className="brust-one-inner">
                            <p>{this.state.params.title}</p>
                            {/*<img src={this.state.params.photoData.seoLinkB}/>*/}
                            [image]
                            <h3>{this.state.params.USD}</h3>
                            <h6>{this.state.params.UAH}</h6>
                            <h4>{this.state.params.autoData.fuelName}</h4>
                            <h4>{this.state.params.autoData.year}</h4>
                            <h4>{this.state.params.autoData.gearboxName}</h4>
                            <h6>{this.state.params.addDate}</h6>
                            {/*{this.props.id}*/}
                        </div>
                    }
                </div>
        )
    }
}

class BrustListSingle extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            params: '',
            single: ''
        }
    };

    componentDidMount() {

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

    };
    render() {
        return (
            <div className="brust-single">
                    {this.state.params &&
                    <div className="brust-one-inner">
                        <p>{this.state.params.title}</p>
                        <img src={this.state.params.photoData.seoLinkB}/>
                        <h3>{this.state.params.USD}</h3>
                        <h4>{this.state.params.autoData.fuelName}</h4>
                        <h4>{this.state.params.autoData.year}</h4>
                    </div>
                    }
                <div className="single-close" onClick={this.props.actions.closeSingle.bind(this)}>
                    X
                </div>
            </div>
        )
    }
}