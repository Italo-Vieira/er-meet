import React from 'react';
import ParticipantRow from './participant-row'
import './participant-list.css'
import conferenceProvider from '../../conference';

export default class ParticipantList extends React.Component {
    render() {
        const { participantList, muteUser, isOpen } = this.props;

        const partRows = participantList.map(user => <ParticipantRow
            name={user.username}
            key={user.userId}
            userId={user.userId}
            mute={user.isMicMuted}
            onMuteClick={() => {conferenceProvider.muteParticipant(user.userId, !user.isMicMuted)}}>
            </ParticipantRow>)
        let closed = isOpen ? '' : 'closed';

        return <div className={`participantList ${closed}`} >
            <div className='participantListHeader'>
                <span>Participants</span>:
            </div>
            <div className='partListContent'>
                {partRows}
            </div>
        </div>;
    }
}
