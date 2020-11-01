// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

let JitsiMeetJS = {
    logLevels: {
        ERROR: "ERROR"
    },
    setLogLevel: jest.fn().mockName("setLogLevelMock"),
}

global.JitsiMeetJS = JitsiMeetJS