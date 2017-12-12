import React, { Component, PropTypes } from 'react';
import mapValues from 'lodash/object/mapValues';
import $ from 'jquery';

import styles from './BrustList.css';


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

    // changePage(direction) {
    //     if (direction) {
    //         this.setState({page: this.state.page+1});
    //     }
    //     else {
    //         this.setState({page: this.state.page-1});
    //     }
    // }

    doRequest() {
        console.log('ajax start');
        $.ajax({
            url: this.props.url + '&page='+this.state.page,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data, updated: true});
                console.log('ajax end (success2)');
                console.log(this.state.data);
            }.bind(this),
            error: function(xhr, status, err) {
                console.log('ajax end (not success)');
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }


  render () {

      var searchResult = 'asd';
      if (this.state && this.state.data && this.state.data.result) {
          searchResult = this.state.data.result.search_result.ids;
      }

    return (
      <div className={styles.BrustList}>
          {/*<button onClick={this.changePage.bind(this)}>next</button>*/}
          {/*<button onClick={this.changePage.bind(this)}>prev</button>*/}
          {this.state.page}
          {this.props.marklist.model && <span>model selected</span>}
         <BrustListItem
              key={this.props.marklist.mark}
              id={this.props.marklist.mark}
              name={this.props.marklist.model}
              {...this.props.actions}
         />
          {searchResult && <div className="true-result">{searchResult}</div>}
      </div>
    );
  }

}