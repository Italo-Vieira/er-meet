import React from 'react';
import ParticipantRow from './participant-row'
import './participant-list.css'

export default class ParticipantList extends React.Component {
    render() {
        const { participantList, muteUser } = this.props;
        const partRows = participantList.map(user => <ParticipantRow
            name={user.username}
            key={user.userId}
            userId={user.userId}
            mute={user.mute}
            onMuteClick={muteUser}></ParticipantRow>)
        return <div className='participantList' >
            <div className='participantListHeader'>
                <span>Participants</span>:
            </div>
            <div className='partListContent'>
                {partRows}
            </div>
        </div>;
    }
}
