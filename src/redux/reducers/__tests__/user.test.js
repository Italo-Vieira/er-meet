import user, * as userSelectors from '../user'
import * as actions from '../../actions';
import conferenceProvider from '../../../conference';

jest.mock('../../../conference', () => {
    let _tracks = {};
    return {
        getTrack: (trackId) => _tracks[trackId],

        addTrack: (track) => _tracks[track.getId()] = track,
    }
})



describe('by id reducer', () => {
    let initialState, expectedById;
    beforeEach(() => {
        initialState = {
            byId: {
                userIdMock: {
                    userId: "userIdMock",
                    connected: true,
                    username: "donuts",
                    mute: false,
                    videoTrackId: ''
                }
            }
        }

        expectedById = JSON.parse(JSON.stringify(initialState.byId));
    });


    it('should return byId initial state', () => {
        expect(user(undefined, {}).byId).toEqual({})
    })

    it('should add a user to the store', () => {
        let userObj = {
            userId: "userIdMock",
            username: "donuts"
        }
        let userJoinedAction = actions.userJoined(userObj);
        let expected = {
            userIdMock: {
                userId: "userIdMock",
                connected: true,
                username: "donuts"
            }
        }

        expect(user({}, userJoinedAction).byId).toEqual(expected);
    })

    it('should disconnect user', () => {
        let userLeftAction = actions.userLeft("userIdMock");
        let userData = expectedById.userIdMock;
        userData.connected = false;

        expect(user({ ...initialState }, userLeftAction).byId).toEqual(expectedById);
    })

    it('should mute user', () => {
        let muteUserAction = actions.muteUser("userIdMock", true);
        let userData = expectedById.userIdMock;
        userData.mute = true;

        expect(user({ ...initialState }, muteUserAction).byId).toEqual(expectedById);
    })

    it('should unmute user', () => {
        let muteUserAction = actions.muteUser("userIdMock", false);

        initialState.byId.userIdMock.mute = true;

        expectedById.userIdMock.mute = false;

        expect(user({ ...initialState }, muteUserAction).byId).toEqual(expectedById);
    })

    it('should change username', () => {
        let userNamedChangedAction = actions.userNameChanged("userIdMock", "Italo V");
        let userData = expectedById.userIdMock;
        userData.username = "Italo V";

        expect(user({ ...initialState }, userNamedChangedAction).byId).toEqual(expectedById);
    })

    it('should set user video track id', () => {
        let videoTrackAddedAction = actions.videoTrackAdded("userIdMock", "videoTrackId");
        let userData = expectedById.userIdMock;
        userData.videoTrackId = "videoTrackId";

        expect(user({ ...initialState }, videoTrackAddedAction).byId).toEqual(expectedById);
    })
})

describe('focused reducer', () => {
    let initialState, expectedFocused;
    beforeEach(() => {
        initialState = {
            byId: {
                userIdMock: {
                    userId: "userIdMock",
                    connected: true,
                    username: "donuts",
                    mute: false,
                    videoTrackId: ''
                }
            },
            focused: {
                userId: undefined
            }
        }

        expectedFocused = { userId: undefined };

    });

    it('should change focused user', () => {
        let action = actions.focusedUserChanged("userIdMock");
        expectedFocused.userId = "userIdMock";
        expect(user(initialState, action).focused).toEqual(expectedFocused);
    })

    it('should set focus to last added track if there\'s no focus yet', () => {
        let action = actions.videoTrackAdded("userIdMock", "videoTrackId");

        expectedFocused.userId = "userIdMock";
        expect(user({}, action).focused).toEqual(expectedFocused)
    })

    it('should not set focus to added track if a track is already focused', () => {
        let action = actions.videoTrackAdded("userIdMock", "videoTrackId");

        initialState.focused.userId = "otherUserId";
        expectedFocused.userId = initialState.focused.userId;
        let result = user(initialState, action);
        expect(result.focused).toEqual(expectedFocused)
    })
});

describe('me reducer', () => {
    let initialState, expectedFocused;
    beforeEach(() => {
        initialState = {
            me: {}
        }
    });

    it('should create me user on the store', () => {
        let action = actions.meUserCreated("user1");
        let expectedMe = {
            userId: 'user1',
            isCameraMuted: true
        }
        expect(user(initialState, action).me).toEqual(expectedMe);
    })

    it('should change mute state of me user', () => {
        initialState.me = {
            userId: 'user1',
            isCameraMuted: false
        }

        let action = actions.myCameraMuted(true);

        let expectedMe = {
            userId: 'user1',
            isCameraMuted: true,
        }
        expect(user(initialState, action).me).toEqual(expectedMe);
    })
});

describe('Store selectors', () => {
    let initialState, expectedFocused;

    beforeEach(() => {
        initialState = {
            byId: {},
            focused: {},
            allIds: []
        }

        for (let i = 1; i <= 5; i++) {
            let userId = 'user' + i;
            let username = 'username' + i;
            initialState.byId[userId] = createUser(userId, username)
            initialState.allIds.push(userId);
        }


    });

    it('should get all users', () => {

        expect(userSelectors.getAllUsers(initialState)).toEqual(Object.values(initialState.byId));
    })

    it('should get user by id', () => {
        expect(userSelectors.getUserById(initialState, 'user2')).toEqual(initialState.byId['user2'])
    })

    it('should get the focused user', () => {
        initialState.focused.userId = 'user1';
        expect(userSelectors.getFocusedUser(initialState)).toEqual(initialState.byId['user1'])
    })

    it('should get all connected users', () => {
        let byId = initialState.byId
        byId.user1.connected = false;
        byId.user3.connected = false;
        let expectedUsers = [byId.user2, byId.user4, byId.user5];
        expect(userSelectors.getConnectedUsers(initialState)).toEqual(expectedUsers)
    })

    it('should return empty list if theres no user', () => {
        initialState = {
            allIds: [],
            byId: {},
            focused: {}
        }

        let expectedUsers = [];
        expect(userSelectors.getConnectedUsers(initialState)).toEqual(expectedUsers)
    })


    it('should return focused user with their media track', () => {
        initialState.byId.user1.videoTrackId = "track1";
        initialState.focused.userId = 'user1';

        let expectedUser = JSON.parse(JSON.stringify(initialState.byId.user1));

        expectedUser.videoTrack = createTrack("track1");
        conferenceProvider.addTrack(expectedUser.videoTrack);

        let result = userSelectors.getFocusedMediaUser(initialState);

        expect(result).toEqual(expectedUser);
    })

    it('should not change user state on getFocusedMediaUser', () => {
        initialState.byId.user1.videoTrackId = "track1";
        initialState.focused.userId = 'user1';

        let unexpectedUser = initialState.byId.user1;

        conferenceProvider.addTrack(createTrack("track1"));

        let result = userSelectors.getFocusedMediaUser(initialState);

        expect(result).not.toBe(unexpectedUser);
    })

    it('should return undefined if theres no user focused', () => {
        let result = userSelectors.getFocusedMediaUser(initialState);

        expect(result).toBe(undefined);
    })


    describe('on getMediaUsers', () => {
        beforeEach(() => {
            let { user1, user3, user5 } = initialState.byId;
            user1.videoTrackId = "track1";
            user3.videoTrackId = "track3";
            user5.videoTrackId = "track5";
            conferenceProvider.addTrack(createTrack("track1"));
            conferenceProvider.addTrack(createTrack("track2"));
            conferenceProvider.addTrack(createTrack("track5"));
        })

        it('should not change store state', () => {
            let unexpectedUsers = Object.values(initialState.byId);

            let result = userSelectors.getMediaUsers(initialState);
            expect(result).not.toEqual(unexpectedUsers)
        })

        it('should return all users with their media', () => {
            let expectedUsers = []
            for (let user of Object.values(initialState.byId)) {
                let copiedUser = JSON.parse(JSON.stringify(user));
                let track = conferenceProvider.getTrack(copiedUser.videoTrackId);
                if (track) {
                    copiedUser.videoTrack = track;
                }
                expectedUsers.push(copiedUser);
            }

            let result = userSelectors.getMediaUsers(initialState);
            expect(result).toEqual(expectedUsers)
        })
    })

    describe('on getMeUser', () => {
        beforeEach(() => {
            initialState = {
                byId: {
                    user1: createUser('user1')
                },
                me: {
                    userId: 'user1',
                    isCameraMuted: true
                }
            }
        })

        it("should get me user", () => {
            let expectedUser = createUser('user1');
            expectedUser.isCameraMuted = true
            expect(userSelectors.getMeUser(initialState)).toEqual(expectedUser)
        })
    })
});

function createUser(userId, username='Jhon Doe') {
    return {
        userId,
        connected: true,
        username,
        mute: false,
        videoTrackId: ''
    }
}

function createTrack(trackId) {
    return {
        getId: () => trackId
    }
}