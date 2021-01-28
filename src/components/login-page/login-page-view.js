import React from 'react';
import './login-page.css'
import "@fontsource/nunito-sans/200.css";
import "@fontsource/nunito-sans/700.css";
import "@fontsource/nunito-sans/300.css";
import "@fontsource/nunito-sans/600.css";
import "@fontsource/roboto";
import "@fontsource/roboto/300.css";
import bg from '../../images/landing-bg.jpg';
import { Formik } from 'formik';

export default class LoginPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            values: {
                meetingCode: ''
            }
        }

        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    onSubmit(values, {setSubmitting}) {
        setSubmitting(false);
        const { conferenceIdSet } = this.props;
        conferenceIdSet(values.meetingCode);
    }

    validate(values) {
        const erros = {}
        console.log("tá validadon")
        let meetingCodeRegex = /^[a-zA-Z0-9]{3,20}$/
        if(!meetingCodeRegex.test(values.meetingCode)){
            erros.meetingCode = "Meeting code is not valid"
        }
        return erros
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
                        <Formik
                            initialValues={{meetingCode: ''}}
                            validate={this.validate}
                            onSubmit={this.onSubmit}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                isSubmitting,

                            }) => (
                                <form onSubmit={handleSubmit}>
                                    <div className="field">
                                        <div className="joint-button">
                                            <button>Join a meeting</button>
                                            <input className="meetingNumberInput"
                                                name="meetingCode"
                                                value={this.state.value}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.meetingCode}
                                                placeholder="Enter your meeting code..."></input>
                                        </div>
                                        <span className="help is-error">{touched.meetingCode && errors.meetingCode} </span>
                                    </div>
                                </form>)}
                        </Formik>

                    </div>
                </div>
                <div className="front-footer">

                </div>

            </div>);
    }
}  