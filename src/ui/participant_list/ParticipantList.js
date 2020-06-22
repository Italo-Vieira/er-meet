import React, { Component } from 'react';
import {ParticipantWindow } from '../participant_window'
import { connect } from 'react-redux';


class ParticipantList extends React.Component {
    render() {
        const {participantList} = this.props;
        const partWindowList = participantList.map(u => <ParticipantWindow name={u.username} key={u.key}></ParticipantWindow>)
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
    console.log(store)
    return {
    participantList: store.usersState.users.map(u => ({username: u.username, key: u.userId}))
  }
};

export const TEST = connect(mapStateToProps)(ParticipantList);