import JitsiConferenceProvider from './jitsi'
import FakeConferenceProvider from './fake'
//const conferenceProvider = new FakeConferenceProvider('')
const conferenceProvider = new JitsiConferenceProvider();
export default conferenceProvider;