import React from 'react';
import ParticipantRow from './participant-row'
import './participant-list.css'
import conferenceProvider from '../../conference';

export default class ParticipantList extends React.Component {
    render() {
        const { participantList, meUser, isOpen } = this.props;

        const partRows = participantList
            .filter(u => u.userId !== meUser.userId)
            .map(user => <ParticipantRow
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
                <ParticipantRow 
                    name={meUser.username + " (me)"}
                    key={meUser.userId}
                    userId={meUser.userId}
                    mute={meUser.isMicMuted}
                    onMuteClick={() => {conferenceProvider.muteParticipant(meUser.userId, !meUser.isMicMuted)}}>
                    </ParticipantRow>
                {partRows}
            </div>
        </div>;
    }
}
