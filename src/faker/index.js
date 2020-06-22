import {meetingFound, userJoined} from '../actions'
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
        username: names[userCounter]
    }
}

export const faker = function(Store)
{
    Store.dispatch(meetingFound(fakeMeeting()))

    Store.dispatch(userJoined(fakeUser()))
    Store.dispatch(userJoined(fakeUser()))
    Store.dispatch(userJoined(fakeUser()))
    Store.dispatch(userJoined(fakeUser()))


}