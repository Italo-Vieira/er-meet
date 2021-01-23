import React from 'react';
import spinner from '../../images/spinner.svg';
import './loading-page.css'

export default class LoadingPage extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="lading-page">
                <div className="preloader">
                    <img src={spinner} alt="spinner"></img>
                </div>
            </div>);
    }
}
