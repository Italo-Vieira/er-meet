import React, { Component } from 'react';
import {ParticipantWindow } from '../participant_window'
import { connect } from 'react-redux';
import * as fromReducers from '../../reducers'
import * as fromActions from '../../actions'
class ParticipantList extends React.Component {
    render() {
        const {participantList, muteUser} = this.props;
        const partWindowList = participantList.map(u => <ParticipantWindow name={u.username} 
            key={u.key} 
            id={u.key}
            mute={u.mute}
            onMuteClick={muteUser}></ParticipantWindow>)
        return <div className='participantList' >
            <div className='participantListHeader'>
                <span>Participants</span>:
            </div>
            <div className='partListContent'>
                {partWindowList}
            </div>
        </div>;
    }
}


function mapStateToProps (store) {
    return {
    participantList: fromReducers.getAllUsers(store).map(u => ({username: u.username, key: u.userId, mute: u.mute})),
    muteUser: fromActions.muteUserPraValer
  }
};

export const TEST = connect(mapStateToProps)(ParticipantList);