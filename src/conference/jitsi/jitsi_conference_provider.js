/* global JitsiMeetJS $*/
import {ConferenceProvider} from '../conference_provider'
import JitsiTrack from './jitsi-track'

JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.ERROR);
const options = {
    hosts: {
        domain: 'beta.meet.jit.si',
        muc: 'conference.beta.meet.jit.si' // FIXME: use XEP-0030
    },
    bosh: 'https://beta.meet.jit.si/http-bind', // FIXME: use xep-0156 for that

    // The name of client node advertised in XEP-0115 'c' stanza
    websocket: 'wss://beta.meet.jit.si/xmpp-websocket', // FIXME: use xep-0156 for that
    useSturnTurn: true,
    userIPv6: false
};

const confOptions = {
    openBridgeChannel: 'websocket'
};
const initOptions = {
    disableAudioLevels: true
};


export default class JitsiConferenceProvider extends ConferenceProvider {
    constructor(conferenceHandler) {
        super(conferenceHandler);
        this.conferenceHandler = conferenceHandler;
        this.remoteTracks = {};
        this.connection = undefined;
        this.localTracks = [];
        this._tracks = {};
    }

    join(joinInfo) {
        this.roomName = joinInfo.roomName;
        JitsiMeetJS.init(initOptions);

        this.connection = new JitsiMeetJS.JitsiConnection(null, null, options);
    
        this.connection.addEventListener(
            JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
            () => this._onConnectionSuccess());
    
            this.connection.addEventListener(
            JitsiMeetJS.events.connection.CONNECTION_FAILED,
            () => console.log("connection failed"));
    
            this.connection.addEventListener(
            JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED,
            () => console.log("connection disconnected"));
    
            this.connection.connect();
    }

    _onConnectionSuccess() {
        this.room = this.connection.initJitsiConference(this.roomName, confOptions);
        this.room.on(JitsiMeetJS.events.conference.TRACK_ADDED, (track) => {
            const participant = track.getParticipantId();
            if (track.isLocal()) {
             //   return;
            } else if (!this.remoteTracks[participant]) {
                this.remoteTracks[participant] = [];
            }
            let trackWrapper = new JitsiTrack(track);
            this._tracks[trackWrapper.getId()] = trackWrapper;
            this.conferenceHandler.onTrackAdded(participant, trackWrapper)
            //track.attach($('#screenShare')[0]);
        });
    
        this.room.on(JitsiMeetJS.events.conference.TRACK_REMOVED, track => {
            console.log(`track removed!!!${track}`);
        });
    
        this.room.on(
            JitsiMeetJS.events.conference.CONFERENCE_JOINED,
            () => {});
    
        this.room.on(JitsiMeetJS.events.conference.USER_JOINED, id => {
            this.conferenceHandler.onUserJoined(id);
    
            this.remoteTracks[id] = [];
        });
    
        this.room.on(JitsiMeetJS.events.conference.USER_LEFT, (id) => {
            this.conferenceHandler.onUserLeft(id);
        });
    
        this.room.on(JitsiMeetJS.events.conference.TRACK_MUTE_CHANGED, track => {
            console.log(`${track.getType()} - ${track.isMuted()}`);
        });

        this.room.on(
            JitsiMeetJS.events.conference.DISPLAY_NAME_CHANGED,
            (userID, displayName) => {
                this.conferenceHandler.onDisplayNameChanged(userID, displayName);
                
            });
            this.room.on(
            JitsiMeetJS.events.conference.TRACK_AUDIO_LEVEL_CHANGED,
            (userID, audioLevel) => console.log(`${userID} - ${audioLevel}`));
    
            this.room.join();
    }

    shareScreen() {
        JitsiMeetJS.createLocalTracks({
            devices: [ 'desktop' ]
        })
            .then(tracks => {
                this.localTracks.push(tracks[0]);
                this.localTracks[this.localTracks.length -1].addEventListener(
                    JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,
                    () => console.log('local track muted'));
                this.localTracks[this.localTracks.length -1].addEventListener(
                    JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED,
                    () => console.log('local track stoped'));
                this.localTracks[this.localTracks.length -1].attach($('#localVideo1')[0]);
                this.room.addTrack(this.localTracks[this.localTracks.length -1]);
            })
            .catch(error => console.log(error));
    }

    getTrack(trackId) {
        return this._tracks[trackId];
    }
}