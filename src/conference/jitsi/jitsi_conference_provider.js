/* global JitsiMeetJS $*/
import { ConferenceProvider } from '../conference_provider'
import JitsiTrack from './jitsi-track'

// JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.ERROR);


const confOptions = {
    openBridgeChannel: 'websocket',
    videoQuality: {
        maxBitratesVideo: {
            low: 200000,
            standard: 500000,
            high: 1500000
        },
    },
    startBitrate: "800",
    disableAudioLevels: false,
    disableSuspendVideo: true,
    resolution: 480,
    constraints: {
        video: {
            height: {
                ideal: 720,
                max: 720,
                min: 180
            },
            width: {
                ideal: 1280,
                max: 1280,
                min: 320
            }
        }
    },
    disableSimulcast: false,
    enableRemb: true,
    enableTcc: true,
    resolution: 720,
    useSturnTurn: true,
    useTurnUdp: true,
    enableP2P: true, // flag to control P2P connections
    // New P2P options
    p2p: {
        enabled: true,
        disableH264: true,
        useStunTurn: true // use XEP-0215 to fetch STUN and TURN servers for the P2P connection
    },
    channelLastN: 20,
    startBitrate: "800",
    disableSuspendVideo: true,
    stereo: false,
    forceJVB121Ratio: -1,
    enableTalkWhileMuted: true,

    enableNoAudioDetection: true,

    enableNoisyMicDetection: true,
    enableOpusRed: true,

    enableClosePage: true,

    disableLocalVideoFlip: false,

    hiddenDomain: 'recorder.beta.meet.jit.si',
    lastNLimits: {
        5: 20,
        30: 15,
        50: 10,
        70: 5,
        90: 2
    },
    videoQuality: {
            maxBitratesVideo: {
            low: 200000,
            standard: 500000,
            high: 1500000
        },
            },
    startBitrate: "800",
    disableAudioLevels: false,
    disableSuspendVideo: true,

};

const options = {
    hosts: {
        domain: 'beta.meet.jit.si',
        muc: 'conference.beta.meet.jit.si' // FIXME: use XEP-0030
    },
    bosh: 'https://beta.meet.jit.si/http-bind', // FIXME: use xep-0156 for that

    clientNode: 'http://jitsi.org/jitsimeet',
    // The name of client node advertised in XEP-0115 'c' stanza
    websocket: 'wss://beta.meet.jit.si/xmpp-websocket', // FIXME: use xep-0156 for that
    serviceUrl: 'wss://beta.meet.jit.si/xmpp-websocket', // FIXME: use xep-0156 for that
    useSturnTurn: true,
    useTurnUdp: true,
    enableP2P: true, // flag to control P2P connections
    // New P2P options
    p2p: {
        enabled: true,
        disableH264: true,
        useStunTurn: true // use XEP-0215 to fetch STUN and TURN servers for the P2P connection
    },
    ...confOptions
};

const initOptions = {
    useIPv6: false,
    disableAudioLevels: true
};


const videoOptions = {
    resolution: 720,
    constraints: {
        video: {
            height: {
                ideal: 720,
                max: 720,
                min: 180
            },
            width: {
                ideal: 1280,
                max: 1280,
                min: 320
            }
        }
    }
}

export default class JitsiConferenceProvider extends ConferenceProvider {
    constructor(conferenceHandler) {
        super(conferenceHandler);
        this.conferenceHandler = conferenceHandler;
        this.remoteTracks = {};
        this.connection = undefined;
        this.localTracks = [];
        this._tracks = {};
        this.localCamera = undefined;
    }

    init(conferenceHandler) {
        this.conferenceHandler = conferenceHandler;
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
            console.log("track added", track)

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
            () => {
                this.conferenceHandler.onConferenceJoined(this.room.myUserId())
                this.conferenceHandler.onUserJoined(this.room.myUserId());
            });

        this.room.on(JitsiMeetJS.events.conference.USER_JOINED, (id, user) => {
            this.conferenceHandler.onUserJoined(id);

            this.remoteTracks[id] = [];
        });

        this.room.on(JitsiMeetJS.events.conference.USER_LEFT, (id) => {
            this.conferenceHandler.onUserLeft(id);
        });

        this.room.on(JitsiMeetJS.events.conference.TRACK_MUTE_CHANGED, track => {
            console.log(`track muted ${track.getType()} - ${track.isMuted()}`);
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

    toggleCamera() {
        if (this.localCamera && !this.localCamera.isMuted()) {
            this.localCamera.mute();
            return;
        } else if(this.localCamera && this.localCamera.isMuted()) {
            this.localCamera.unmute()
            return;
        }
        console.log("toggling camera")
        JitsiMeetJS.createLocalTracks({
            devices: ['video'],
            ...videoOptions,
            cameraDeviceId : 'ad500a0881edc85f76686889839a3728c56b9b9288a32cb61104bf7f790e43ab'
        })
            .then(tracks => {
                this.localTracks.push(tracks[0]);
                this.localTracks[this.localTracks.length - 1].addEventListener(
                    JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,
                    () => console.log('local track muted'));
                this.localTracks[this.localTracks.length - 1].addEventListener(
                    JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED,
                    () => console.log('local track stoped'));
                console.log("tracks", tracks);
                setTimeout(() => {
                    this.room.addTrack(tracks[0]);
                }, 5000)
                this.localCamera = tracks[0];
                console.log("aqui", this.localCamera)
            })
            .catch(error => console.log(error));
    }

    shareScreen() {
        JitsiMeetJS.createLocalTracks({
            devices: ['desktop']
        })
            .then(tracks => {
                this.localTracks.push(tracks[0]);
                this.localTracks[this.localTracks.length - 1].addEventListener(
                    JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,
                    () => console.log('local track muted'));
                this.localTracks[this.localTracks.length - 1].addEventListener(
                    JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED,
                    () => console.log('local track stoped'));
                this.room.addTrack(this.localTracks[this.localTracks.length - 1]);
            })
            .catch(error => console.log(error));
    }

    getTrack(trackId) {
        return this._tracks[trackId];
    }
}