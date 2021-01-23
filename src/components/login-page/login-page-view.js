import React from 'react';
import './login-page.css'
import "@fontsource/nunito-sans/200.css";
import "@fontsource/nunito-sans/700.css";
import "@fontsource/nunito-sans/300.css";
import "@fontsource/nunito-sans/600.css";
import "@fontsource/roboto";
import "@fontsource/roboto/300.css";
import bg from '../../images/landing-bg.jpg';
import {Store} from './../../redux/store'

export default class LoginPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {value: ''}
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    setConferenceId() {
        return (e) => {
            e.preventDefault();

            const {conferenceIdSet} = this.props;
            let roomName = this.state.value;
            conferenceIdSet(roomName);
        }
    }

    render() {

        return (
            <div className="lading-page">
                
                <div className="flex-column front-header" style={{ backgroundImage: `url(${bg})` }}>
                    <div className="logo-name"><span className="logo-semibold">Er</span><span className="logo-extra-thin"> Meet</span></div>
                </div>
                <div className="front-content">
                    <div className="lightBg">
                        <h1>Reusable meeetings for all</h1>
                        <p>Easily switch your conference provider. Try out now.</p>
                        <form onSubmit={this.setConferenceId()}>
                            <div className="joint-button">
                                <button>Join a meeting</button>
                                <input className="meetingNumberInput" 
                                value={this.state.value} 
                                onChange={(e) => this.handleChange(e)}
                                placeholder="Enter your meeting code..."></input>
                            </div>
                            
                        </form>
                    </div>
                </div>
                <div className="front-footer">

                </div>

            </div>);
    }
}  