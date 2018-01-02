import React, { Component, PropTypes } from 'react';

export default class BrustFilter extends Component {
    render() {
        return (
            <div onClick={this.props.actions.setFilter.bind(this, 'qwe')}>asd</div>
        )
    }
};