import JitsiConferenceProvider from './jitsi'
import FakeConferenceProvider from './fake'
let conferenceProvider;

if(process.env.REACT_APP_FAKE) {
    conferenceProvider = new FakeConferenceProvider()
} else {
    conferenceProvider = new JitsiConferenceProvider();
}

export default conferenceProvider;