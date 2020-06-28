import React, { Component } from 'react';

export default class ReduxRouter extends Component {
    render () {
        const {currentPage, routes} = this.props;
        const RoutedComponent = routes(currentPage)
        return (
            <RoutedComponent></RoutedComponent>
        )
    }
}