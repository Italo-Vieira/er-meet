import {meetingFound, userJoined, muteUser} from '../redux/actions'
import { Store } from '../redux/store';
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


}