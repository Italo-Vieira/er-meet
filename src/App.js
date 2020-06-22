import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clickButton } from './actions';
import './App.css';
import {TEST} from './ui/participant_list/ParticipantList';

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
        <div style={{display: 'flex', flexGrow: '1'}}>
          <div style={{flex:'1'}}>
              a
          </div>
          <TEST></TEST>

        </div>
        <div className="bottomBar">.</div>
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