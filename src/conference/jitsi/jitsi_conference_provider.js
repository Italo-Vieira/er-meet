/* global JitsiMeetJS $*/
import { ConferenceProvider } from '../conference_provider'
import JitsiTrack from './jitsi-track'



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
        this._localCamera = undefined;
        JitsiMeetJS && JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.ERROR);
    }

    init(conferenceHandler) {
        this.conferenceHandler = conferenceHandler;
    }

    join(joinInfo) {
        this.roomName = joinInfo.roomName;
        this.localUsername = joinInfo.username;
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
            console.log("track added", track);
            let trackWrapper = new JitsiTrack(track);
            this._tracks[trackWrapper.getId()] = trackWrapper;
            if (track.isVideoTrack()) {
                if (track.isLocal()) {
                    this.conferenceHandler.onVideoTrackAdded(this.room.myUserId(), trackWrapper);
                } else {
                    this.conferenceHandler.onVideoTrackAdded(track.getParticipantId(), trackWrapper);
                }
            } else {
                if(track.isLocal()) {
                    this.conferenceHandler.onUserMuted(this.room.myUserId(), track.isMuted());
                } else {
                    this.conferenceHandler.onAudioTrackAdded(track.getParticipantId(), trackWrapper);
                    this.conferenceHandler.onUserMuted(track.getParticipantId(), track.isMuted());
                }
            }

        });

        this.room.on(JitsiMeetJS.events.conference.TRACK_REMOVED, track => {
            if (track.isVideoTrack()) {
                if (track.isLocal()) {
                    this.conferenceHandler.onVideoTrackRemoved(this.room.myUserId(), track.getId());
                } else {
                    this.conferenceHandler.onVideoTrackRemoved(track.getParticipantId(), track.getId())
                }
            } else {
                if (track.isLocal()) {
                    
                }
            }
            delete this._tracks[track.getId()];
            console.log(`track removed!!!${track}`);
        });

        this.room.on(
            JitsiMeetJS.events.conference.CONFERENCE_JOINED,
            () => {
                this.conferenceHandler.onConferenceJoined(this.room.myUserId())
                this.conferenceHandler.onUserJoined(this.room.myUserId(), this.localUsername);
            });

        this.room.on(JitsiMeetJS.events.conference.USER_JOINED, (id, user) => {
            this.conferenceHandler.onUserJoined(id, user.getDisplayName());
            this.remoteTracks[id] = [];
        });

        this.room.on(JitsiMeetJS.events.conference.USER_LEFT, (id) => {
            this.conferenceHandler.onUserLeft(id);
        });

        this.room.on(JitsiMeetJS.events.conference.TRACK_MUTE_CHANGED, track => {
            if (track.isVideoTrack() && track.videoType === 'camera') {
                if (track.isLocal()) {
                    this.conferenceHandler.onUserCameraMuted(this.room.myUserId(), track.isMuted());
                } else {
                    this.conferenceHandler.onUserCameraMuted(track.getParticipantId(), track.isMuted())
                }
            } else {
                if (track.isLocal()) {
                    this._localMic.dispose();
                    this._localMic = null;
                    this.conferenceHandler.onUserMuted(this.room.myUserId(), true);
                } else {
                    this.conferenceHandler.onUserMuted(track.getParticipantId(), track.isMuted());

                }
            }
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
        this.room.setDisplayName(this.localUsername);

        this.room.join();
    }

    async toggleCamera() {
        if (this._screenShareTrack) {
            this._freeDesktopTrack();
        }

        if (this._localCamera) {
            if (this._localCamera.isMuted()) {
                this._localCamera.unmute()
            } else {
                this._localCamera.mute();
            }
            return;
        }

        try {
            let track = await this._getLocalTrack('video');

            let myUserId = this.room.myUserId();
            this.conferenceHandler.onUserCameraMuted(myUserId, false);
            this._localCamera = track;
            this.room.addTrack(track)
        } catch (e) {
            console.log("error while creating local track", e);
        }
    }

    async shareScreen() {
        if (this._screenShareTrack) {
            this._freeDesktopTrack();
            return;
        }

        this._freeCameraTrack();
        try {
            let track = await this._getLocalTrack('desktop')

            this.room.addTrack(track);
            this._screenShareTrack = track;
        } catch (e) {
            console.log("something went wrong", e);
        }

    }

    async toggleAudio() {
        if (this._localMic) {
            if (this._localMic.isMuted()) {
                this._localMic.unmute()
            } else {
                this._localMic.mute();
            }
            return;
        }

        try {
            let track = await this._getLocalTrack('audio');

            this._localMic = track;
            this.room.addTrack(track)
        } catch (e) {
            console.log("error while creating local track", e);
        }       
    }

    async muteParticipant(userId, mute) { 

        if(this.room.myUserId() === userId) {
            return this.toggleAudio();
        } else {
            return this.room.muteParticipant(userId, mute);
        }
    }

    async leaveConference() {
        await this.room.leave();
        console.log("leaving room")
        this.conferenceHandler.onConferenceLeft();
    }

    async _getLocalTrack(trackType) {
        let tracks = await JitsiMeetJS.createLocalTracks({ devices: [trackType] })

        let localTrack = tracks[0];
        this.localTracks.push(localTrack);
        localTrack.addEventListener(
            JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,
            () => console.log('local track muted'));
        localTrack.addEventListener(
            JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED,
            () => {
                switch (localTrack.videoType) {
                    case 'desktop':
                        this._freeDesktopTrack();
                        break;
                    case 'video':
                        this._freeCameraTrack();
                        break;
                }
                console.log("local track stopped");
            });

        return localTrack;
    }

    _freeDesktopTrack() {
        try {
            if (this._screenShareTrack) {
                this._screenShareTrack.dispose();
                this._screenShareTrack = null;
            }
        } catch (e) {
            console.warn('error while disposing desktop track', e);
        }
    }

    _freeCameraTrack() {
        try {
            if (this._localCamera) {
                this._localCamera.dispose();
                this.conferenceHandler.onUserCameraMuted(this.room.myUserId(), true);
                this._localCamera = null;
            }
        } catch (e) {
            console.warn('error while disposing camera track', e);
        }
    }

    getTrack(trackId) {
        return this._tracks[trackId];
    }

    _addTrack(track) {
        this._tracks[track.getId()] = track
    }
}