import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clickButton } from './actions';
import './App.css';
import { TEST } from './ui/participant_list/ParticipantList';
import { BsMic, BsMicMute } from 'react-icons/bs';
class App extends Component {
  state = {
    inputValue: ''
  }

  inputChange = event => {
    this.setState({
      inputValue: event.target.value
    })
  }

  render() {
    const { clickButton, newValue } = this.props;

    const { inputValue } = this.state;

    return (
      <div className="App" style={{}}>
        <div style={{ display: 'flex', flexDirection: 'column', flexGrow: '1' }}>
          <div style={{ flex: '1' }}>
          </div>
          <div className="bottomBar">
            <div className="selfMuteDiv">
              <button className="selfMuteButton">
                <BsMic className="selfMute">
                </BsMic>
                <span className="selfMuteText">Mute</span>
              </button>

            </div>
            <div style={{ flex: '1' }}>

            </div>
            <div className="endMeetingDiv">
              <button className="endMeetingButton">End Meeting</button>
            </div>
          </div>
        </div>
        <TEST></TEST>

      </div>
    );
  }
}

const mapStateToProps = store => ({
  newValue: store.clickState.newValue
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ clickButton }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);