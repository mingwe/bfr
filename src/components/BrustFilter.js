import React, { Component, PropTypes } from 'react';

export default class BrustFilter extends Component {
    applyFilter(that) {
        this.props.actions.setFilter(this.props.apiname, that.target.value);
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
                return (
                    <option key={index}>{item}</option>
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