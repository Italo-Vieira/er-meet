import React from 'react';
import './login-page.css'
import conferenceProvider from '../../conference'

export default class LoginPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {value: ''}
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(callback, constructor) {
        return (e) => {
            e.preventDefault();
            let roomName = this.state.value;
            conferenceProvider.join({roomName});

            callback(constructor)

        }
    }

    render() {
        const { changePage } = this.props;




        return (<div className="loginPageBg">
            <div className="lightBg">
                <h1>Enter your meeting number</h1>
                <form onSubmit={this.handleSubmit(changePage, "preJoin")}>
                    <input className="meetingNumberInput" value={this.state.value} onChange={(e)=> this.handleChange(e)}></input>

                </form>
            </div>
        </div>);
    }
}  