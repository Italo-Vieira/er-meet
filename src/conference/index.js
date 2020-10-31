import ConferenceHandler from './conference_handler'
import JitsiConferenceProvider from './jitsi'
import { Store } from '../redux/store'
const conferenceProvider = new JitsiConferenceProvider(new ConferenceHandler(Store))
export default conferenceProvider;