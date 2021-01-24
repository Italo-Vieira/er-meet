import {meetingFound, userJoined, muteUser, videoTrackAdded} from '../redux/actions'
import { Store } from '../redux/store';
import conferenceProvider from '../conference';

const names = ["Alberto Robert", "Italo Vieira", "Jose Jorge", "Saia Rodada", "Juninho Pé de Saco"]

function fakeMeeting() {
    return {
        conferenceId: "confID",
    }
}


var userCounter = 0;
function fakeUser() {
    userCounter = userCounter + 1

    return {
        userId: "Mx" + userCounter,
        username: names[userCounter],
        defaultValue: "oi eu sou default",
        mute: false
    }
}
const timedDispatch = (value, timeout) => setTimeout(() => Store.dispatch(value), timeout);
export const faker = function(Store)
{
    Store.dispatch(meetingFound(fakeMeeting()))

    Store.dispatch(userJoined(fakeUser()))
    timedDispatch(userJoined(fakeUser()), 1000)
    Store.dispatch(userJoined(fakeUser()))
    Store.dispatch(userJoined(fakeUser()))
    timedDispatch(muteUser("Mx1", true), 2000);
    
    timedDispatch(videoTrackAdded("Mx1", 'track1'), 3000);
    timedDispatch(videoTrackAdded("Mx2", 'track2'), 5000);
    conferenceProvider._addTrack("track1", "leek-spin.mp4")
    conferenceProvider._addTrack("track2", "back-loop.mp4")
    window.conf = conferenceProvider;
    console.log("checkout aqui")
    conferenceProvider.join({
        roomName:"none",
        username: "Italo Vieira"
    });
}

