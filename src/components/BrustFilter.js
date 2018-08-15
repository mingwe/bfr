import React, { Component, PropTypes } from 'react';
import $ from "jquery";
import * as MYCONST from '../constants/ApiConst';

export default class BrustFilter extends Component {
    constructor (props, context) {
        super(props, context);
        this.state = {
            name: this.props.name || '',
            apivalues: ''
        };
    }
    componentDidMount() {
        if (this.props.needrequest) {
            this.requestFilter();
        }
    }

    requestFilter() {
        let storageKey = (this.props.apiname).split('[');
        storageKey = storageKey[0];
        // let storageKey = this.props.apiname;
        let cat = '';
        if (this.props.needcat) {
            cat = 'categories/1/';
        }
        // alert(storageKey);
        if (localStorage.getItem(storageKey)) {
            this.setState({fltr: JSON.parse(localStorage.getItem(storageKey))});
            console.log(this.props.name+'\'s loaded from localStorage');
        }
        else {
            $.ajax({
                url: MYCONST.HOST_URL+'auto/'+cat+this.props.needrequest+'?api_key='+MYCONST.API_KEY,
                dataType: 'json',
                cache: false,
                success: function (data) {
                    this.setState({fltr: data});
                    localStorage.setItem(storageKey, JSON.stringify(data));
                }.bind(this),
                error: function (xhr, status, err) {
                    console.log('ajax end (not success)');
                }.bind(this)
            });
            console.log(this.props.name+'\'s loaded from remote');
        }
    }
    
    applyFilter(that) {
        this.props.actions.setFilter(this.props.apiname, $(that.target).children('option:selected').attr('data-item-id'));
    }
    render() {
        var values, valuesTemplate, type, maxValue, name;
        values = this.props.values.split(';');
        name = this.props.name;
        maxValue = values.length -1;

        if (this.props.ftype) {
            type = this.props.ftype;
        }
        else {
            type = false;
        }

        if (type == 'select') {
            valuesTemplate = values.map(function (item, index) {
                item = item.split('/');
                return (
                    <option key={index} data-item-id={item[1]}>{item[0]}</option>
                )
            });
            valuesTemplate =
                <select onChange={this.applyFilter.bind(this)}>
                    {valuesTemplate}
                </select>
        }
        else if (type == 'text') {
            valuesTemplate =
                    <div>
                        <input type="number" min={values[0]} max={values[maxValue]} onChange={this.applyFilter.bind(this)}/>
                    </div>;
        }
        else if (type == 'radio') {
            valuesTemplate = values.map(function (item, index) {
                return (
                    <li>
                        <input key={index} type="radio" name={name} value={item} id={name+item}/>
                        <label for={name+item}>{item}</label>
                    </li>
                )
            });
            valuesTemplate = <div>{valuesTemplate}</div>
        }

        return (
            <div>
            {/*<div onClick={this.props.actions.setFilter.bind(this, 'qwe', 'rty')}>*/}

                <label>{name}</label>

                {valuesTemplate}

            </div>
        )
    }
};