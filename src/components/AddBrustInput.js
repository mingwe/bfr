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
      // if (this.state.updated != true) {
          this.doRequest();
      // }
    };

    componentDidUpdate(prevProps) {
        if (prevProps.url != this.props.url) {
            console.log('updated');
            this.doRequest();
        }
        else {
            console.log('not updtd');
        }
    };

    doRequest() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data, updated: true});

            }.bind(this),
            error: function(xhr, status, err) {
                console.log('ajax end (not success)');
            }.bind(this)
        });
    }

    changeCurrVal (e) {

        const name = e.target.value.split('/')[1];
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
    if (this.state.data) {
        console.log('tthis');
        optionsTemplate = this.state.data.map(function (item, index) {
            return (
                <option key={item.value}>{item.name}/{item.value}</option>
            )
        });
    }
    else {
        optionsTemplate = <option>loading...</option>
    }
    return (
      <div>
        <select onChange={this.changeCurrVal.bind(this)}>
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
