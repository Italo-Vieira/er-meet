import JitsiConferenceProvider from '../jitsi_conference_provider'
import ConferenceHandler from '../../conference_handler'
import JitsiTrack from '../jitsi-track';
jest.mock('../../conference_handler')
jest.useFakeTimers();
console.log = jest.fn()
beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    ConferenceHandler.mockClear();
});

var JitsiMeetJS = {
    logLevels: {
        ERROR: "ERROR"
    },
    setLogLevel: jest.fn().mockName("setLogLevelMock"),
    events: {
        conference: new Proxy({}, {
            get(target, name) {
                return 'CONFERENCE-' + name;
            }
        }),
        track: new Proxy({}, {
            get(target, name) {
                return 'TRACK-' + name;
            }
        }),
        connection: new Proxy({}, {
            get(target, name) {
                return 'CONNECTION-' + name;
            }
        })
    },
    JitsiConnection: JitsiConnection,
    init() {}
}

function JitsiConnection() {
    this.addEventListener = () => {}
    this.connect = () => {};
}

global.JitsiMeetJS = JitsiMeetJS
describe('jitsi conference provider tests', () => {
    let conferenceProvider;
    let mockedRoom;
    let handlerMock;
    let myUserId;
    beforeEach(() => {
        myUserId = 'localUserId'
        handlerMock = new ConferenceHandler();
        conferenceProvider = new JitsiConferenceProvider(handlerMock);
        mockedRoom = mockRoom(myUserId);
        conferenceProvider.connection = mockConnection(mockedRoom);
        conferenceProvider._onConnectionSuccess();
        let nextLocalId = localTrackIdGenerator()
    })

    describe('on join', () => {
        it('should run with no errors', () => {
            conferenceProvider.join({roomName: 'roomName'})
        })
    })

    describe('On conference joined', () => {
        it('should call onConferenceJoined', () => {

            mockedRoom._trigger(JitsiMeetJS.events.conference.CONFERENCE_JOINED)
            jest.runAllTimers();

            expect(handlerMock.onConferenceJoined).toHaveBeenCalled();
            expect(handlerMock.onUserJoined).toHaveBeenCalled();
        })

        it('should call onUserJoined with local user id', () => {

            mockedRoom._trigger(JitsiMeetJS.events.conference.CONFERENCE_JOINED)
            jest.runAllTimers();

            expect(handlerMock.onConferenceJoined).toHaveBeenCalled();
            expect(handlerMock.onUserJoined).toHaveBeenCalledWith(myUserId);
        })
    })

    describe('On user joined', () => {
        it('should call onUserJoined with the new user id', () => {
            mockedRoom._trigger(JitsiMeetJS.events.conference.USER_JOINED, 'newUserId');
            jest.runAllTimers();
            expect(handlerMock.onUserJoined).toHaveBeenCalledWith('newUserId');
        })
    })

    describe('On user left', () => {
        it('should call onUserLeft with the disconnected user id', () => {
            mockedRoom._trigger(JitsiMeetJS.events.conference.USER_LEFT, 'user1');
            jest.runAllTimers();
            expect(handlerMock.onUserLeft).toHaveBeenCalledWith('user1');
        })
    })

    describe('On track added', () => {
        it('should add local user id if track is local', () => {
            let mockedTrack = mockJitsiInternalTrack('track1', myUserId, true);

            mockedRoom._trigger(JitsiMeetJS.events.conference.TRACK_ADDED, mockedTrack);
            jest.runAllTimers();

            expect(handlerMock.onVideoTrackAdded).toHaveBeenCalledWith(myUserId, expect.any(JitsiTrack))
            expect(conferenceProvider.getTrack('track1')).toEqual(new JitsiTrack(mockedTrack))
        })

        it('should call onVideoTrackAdded', () => {
            let mockedTrack = mockJitsiInternalTrack('track1', 'user2', false);

            mockedRoom._trigger(JitsiMeetJS.events.conference.TRACK_ADDED, mockedTrack);
            jest.runAllTimers();

            expect(handlerMock.onVideoTrackAdded).toHaveBeenCalledWith('user2', expect.any(JitsiTrack))
            expect(conferenceProvider.getTrack('track1')).toEqual(new JitsiTrack(mockedTrack))
        })
    })

    describe('On track removed', () => {

        it('should remove onTrackRemoved for local track', () => {
            let mockedTrack = mockJitsiInternalTrack('track1', myUserId, true);
            conferenceProvider._addTrack(mockedTrack);

            mockedRoom._trigger(JitsiMeetJS.events.conference.TRACK_REMOVED, mockedTrack);
            jest.runAllTimers();

            expect(handlerMock.onVideoTrackRemoved).toHaveBeenCalledWith(myUserId, 'track1');
            expect(conferenceProvider.getTrack('track1')).toEqual(undefined)
        })

        it('should remove call onTrackRemoved for remote track', () => {
            let mockedTrack = mockJitsiInternalTrack('track1', 'user2', false);
            conferenceProvider._addTrack(mockedTrack);

            mockedRoom._trigger(JitsiMeetJS.events.conference.TRACK_REMOVED, mockedTrack);
            jest.runAllTimers();

            expect(handlerMock.onVideoTrackRemoved).toHaveBeenCalledWith('user2', 'track1');
            expect(conferenceProvider.getTrack('track1')).toEqual(undefined)
        })
    })

    describe('On track mute changed', () => {
        it('should call onUserCameraMuted if type is video', () => {
            let mockedTrack = mockJitsiInternalTrack('track1', 'user2', false, 'video');

            mockedTrack.mute();
            let isMuted = true;
            mockedRoom._trigger(JitsiMeetJS.events.conference.TRACK_MUTE_CHANGED, mockedTrack);
            jest.runAllTimers();

            expect(handlerMock.onUserCameraMuted).toHaveBeenCalledWith('user2', isMuted);
        })

        it('should call onUserCameraMuted with my user id if track is local and video', () => {
            let mockedTrack = mockJitsiInternalTrack('track1', myUserId, true, 'video');

            mockedTrack.mute();
            let isMuted = true;
            mockedRoom._trigger(JitsiMeetJS.events.conference.TRACK_MUTE_CHANGED, mockedTrack);
            jest.runAllTimers();

            expect(handlerMock.onUserCameraMuted).toHaveBeenCalledWith(myUserId, isMuted);
        })
    })

    describe('On toggle camera', () => {
        let mockedTrack;
        beforeEach(() => {
            mockedTrack = mockJitsiInternalTrack("locaTrackId", myUserId, true, 'video');

            JitsiMeetJS.createLocalTracks = function createLocalTracks(opts) {
                return Promise.resolve([mockedTrack])
            }
        })

        it('should add the correct track to the room', (done) => {
            expect.assertions(2);

            JitsiMeetJS.createLocalTracks = function createLocalTracks(opts) {
                expect(opts.devices[0]).toBe('video');
                return Promise.resolve([mockedTrack])
            }

            mockedRoom.addTrack = mockedRoom.addTrack.mockImplementation(() => {
                expect(mockedRoom.addTrack).toHaveBeenCalledWith(mockedTrack)
                done()
            })

            conferenceProvider.toggleCamera();
        })

        it('should mute/unmute track when toggling', async () => {

            expect.assertions(3);

            await conferenceProvider.toggleCamera();

            expect(mockedTrack.isMuted()).toBe(false);


            await conferenceProvider.toggleCamera();

            expect(mockedTrack.isMuted()).toBe(true);

            await conferenceProvider.toggleCamera();

            expect(mockedTrack.isMuted()).toBe(false);
        })

        it('should cleanup desktop track if it exists', async () => {

            expect.assertions(2);
            let mockedDesktopTrack = mockJitsiInternalTrack('share-id', myUserId, true, 'desktop');
            conferenceProvider._screenShareTrack = mockedDesktopTrack;
            await conferenceProvider.toggleCamera();

            expect(conferenceProvider._screenShareTrack).toEqual(null);
            expect(mockedDesktopTrack.dispose).toHaveBeenCalled()
        })
    })

    describe('On toggle screenShare', () => {
        let mockedTrack;
        beforeEach(() => {
            mockedTrack = mockJitsiInternalTrack("locaTrackId", myUserId, true, 'desktop');

            JitsiMeetJS.createLocalTracks = function createLocalTracks(opts) {
                return Promise.resolve([mockedTrack])
            }
        })

        it('should add the correct track to the room', (done) => {
            expect.assertions(2);

            JitsiMeetJS.createLocalTracks = function createLocalTracks(opts) {
                expect(opts.devices[0]).toBe('desktop');
                return Promise.resolve([mockedTrack])
            }

            mockedRoom.addTrack = mockedRoom.addTrack.mockImplementation(() => {
                expect(mockedRoom.addTrack).toHaveBeenCalledWith(mockedTrack)
                done()
            })

            conferenceProvider.shareScreen();
        })

        it('should dispose of desktop if it\'s already active', async () => {
            expect.assertions(2);
            await conferenceProvider.shareScreen();
            await conferenceProvider.shareScreen();
            expect(mockedTrack.dispose).toHaveBeenCalled();
            expect(conferenceProvider._screenShareTrack).toBe(null);
        })

        it('should cleanup video track if it\'s active', async () => {
            expect.assertions(2);
            let mockedCameraTrack = mockJitsiInternalTrack('cameraTrackId', myUserId, true, 'video');
            conferenceProvider._localCamera = mockedCameraTrack;

            await conferenceProvider.shareScreen();
            expect(conferenceProvider._localCamera).toBe(null);
            expect(mockedCameraTrack.dispose).toHaveBeenCalled();
        })

    })
})

afterEach(() => {
    jest.clearAllTimers();
})

function localTrackIdGenerator() {
    let id = 0;
    return () => {
        return 'localTrack' + ++id;
    }
}


function mockRoom(myUserId) {
    let listeners = {};
    return {
        on(key, func) {
            listeners[key] = listeners[key] || [];
            listeners[key].push((...rest) => setTimeout(func.bind(null, ...rest), 0));
        },
        join() { },
        _trigger(key, ...rest) {
            listeners[key] && listeners[key].forEach(fn => fn(...rest));
        },
        myUserId() {
            return myUserId;
        },
        addTrack: jest.fn().mockName("addTrackMock")
    }
}

function mockConnection(mockRoom) {
    return {
        initJitsiConference() {
            return mockRoom;
        },
        addEventListenerListener() {

        }
    }
}

function mockJitsiInternalTrack(trackId = '', partId = '', isLocal = false, type = 'video') {
    let isMuted = false;
    let listeners = {}
    return {
        getId() {
            return trackId;
        },
        mute() {
            isMuted = true;
        },
        unmute() {
            isMuted = false;
        },
        isMuted() {
            return isMuted;
        },
        dispose() {
        },
        isLocal() {
            return isLocal;
        },
        getParticipantId() {
            return isLocal ? undefined : partId;
        },
        isVideoTrack() {
            return type === 'video' || type === 'desktop'
        },
        getType() {
            return type;
        },
        addEventListener(key, func) {
            listeners[key] = listeners[key] || [];
            listeners[key].push((...rest) => setTimeout(func.bind(null, ...rest), 0));
        },
        dispose: jest.fn().mockName('diposeMock')
    }
}
