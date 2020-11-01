import JitsiConferenceProvider from './jitsi_conference_provider'

let conferenceProvider;
let confHandlerMock;

beforeEach(() => {
    confHandlerMock = jest.mock('../conference_handler');
    conferenceProvider = new JitsiConferenceProvider(confHandlerMock);
});

test('', ()=> {
    expect('').toBe('')
})