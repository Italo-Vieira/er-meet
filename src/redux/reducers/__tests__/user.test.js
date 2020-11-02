import user, * as userGetters from '../user'
import * as actions from '../../actions';

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

describe('by id reducer', () => {
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

describe('Store getters', () => {
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

        expect(userGetters.getAllUsers(initialState)).toEqual(Object.values(initialState.byId));
    })

    it('should get user by id', () => {
        expect(userGetters.getUserById(initialState, 'user2')).toEqual(initialState.byId['user2'])
    })

    it('should get the focused user', () => {
        initialState.focused.userId = 'user1';
        expect(userGetters.getFocusedUser(initialState)).toEqual(initialState.byId['user1'])
    })

    it('should get all connected users', () => {
        let byId = initialState.byId
        byId.user1.connected = false;
        byId.user3.connected = false;
        let expectedUsers = [byId.user2, byId.user4, byId.user5];
        expect(userGetters.getConnectedUsers(initialState)).toEqual(expectedUsers)
    })

    it('should return empty list if theres no user', () => {
        initialState = {
            allIds: [],
            byId: {},
            focused: {}
        }

        let expectedUsers = [];
        expect(userGetters.getConnectedUsers(initialState)).toEqual(expectedUsers)
    })

});

function createUser(userId, username) {
    return {
        userId,
        connected: true,
        username,
        mute: false,
        videoTrackId: ''
    }
}