import React from 'react';
import ParticipantWindow from './participant_list_row'
import './participant_list.css'

export default class ParticipantList extends React.Component {
    render() {
        const { participantList, muteUser } = this.props;
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
