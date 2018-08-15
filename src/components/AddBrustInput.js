import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
// import styles from './AddBrustInput.css';
import $ from 'jquery';
import * as MYCONST from '../constants/ApiConst';

export default class AddBrustInput extends Component {
  static propTypes = {
    addMark: PropTypes.func.isRequired
  }


    componentDidMount() {
      this.doRequest();
    };

    componentDidUpdate(prevProps) {
        if (prevProps.url != this.props.url) {
            this.doRequest();
        }
    };

    doRequest() {
        if (this.props.name == 'mark' && localStorage.getItem('marks')) {
            this.setState({data: JSON.parse(localStorage.getItem('marks'))});
            console.log(this.props.name+'\'s loaded from localStorage');
        }
        else if (this.props.name == 'model' && localStorage.getItem(this.props.name+this.props.mark)) {
            this.setState({data: JSON.parse(localStorage.getItem(this.props.name+this.props.mark))});
            console.log(this.props.name+'\'s loaded from localStorage');
        }
        else {
            $.ajax({
                url: this.props.url,
                dataType: 'json',
                cache: false,
                success: function (data) {
                    this.setState({data: data});
                    if (this.props.name == 'mark') {
                        localStorage.setItem('marks', JSON.stringify(data));
                    }
                    else if (this.props.name == 'model') {
                        localStorage.setItem(this.props.name+this.props.mark, JSON.stringify(data));
                    }
                }.bind(this),
                error: function (xhr, status, err) {
                    console.log('ajax end (not success)');
                }.bind(this)
            });
            console.log(this.props.name+'\'s loaded from remote');
        }
    }

    splitId (e) {
        const name = $(e.target).children('option:selected').attr('data-item-id');
        // const name = e.target.value.split('/')[1];
        if (this.props.name == 'mark') {
            this.props.actions.addMark(name);
        }
        else if(this.props.name == 'model') {
            this.props.actions.addModel(name);
        }
        this.setState({ markID: name });
    }

  render () {
    var optionsTemplate;
    var optionsLoading;
    var optionsAll;
    if (this.state.data) {
        optionsTemplate = this.state.data.map(function (item, index) {
            return (
                <option key={item.value} data-item-id={item.value}>{item.name}</option>
            )
        });
        optionsLoading = <option disabled selected>choose {this.props.name}...</option>;
        if (this.props.name == 'model') {
            optionsAll = <option data-item-id="0">All {this.props.name}'s</option>;
        }
    }
    else {
        optionsLoading = <option>loading...</option>;
    }
    return (
      <div>
        <label>{this.props.name}</label>
        <select onChange={this.splitId.bind(this)}>
            {optionsLoading}
            {optionsAll}
            {optionsTemplate}
        </select>
      </div>
    );
  }

  constructor (props, context) {
    super(props, context);
    this.state = {
      name: this.props.name || '',
    };
  }
}
