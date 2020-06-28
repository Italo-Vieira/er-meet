import React from 'react';
import './login-page.css'

export default class LoginPage extends React.Component {
    render () {
        const {changePage} = this.props;
        function preventDefault(callback, constructor) {
            return (e)=>{
                callback(constructor)
                e.preventDefault();
            }
        }
        return (<div className="loginPageBg">
            <div className="lightBg">
                <h1>Enter your meeting number</h1>
                <form  onSubmit={preventDefault(changePage, "conference")}>
                    <input className="meetingNumberInput"></input>
                    
                </form>
            </div>
        </div>);
    }
}  