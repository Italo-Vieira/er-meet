import JitsiTrack from '../jitsi-track'
let jitsiTrack;
let _jitsitTrackId;
let attachMock;
let detachMock; 

beforeEach(() => {
    _jitsitTrackId = "trackID";
    attachMock = jest.fn().mockName('attachFunc');
    detachMock = jest.fn().mockName('detachFunc')
    let mockTrack = {
        getId: jest.fn().mockName("getId").mockReturnValue(_jitsitTrackId),
        attach: attachMock,
        detach: detachMock
    }
    jitsiTrack = new JitsiTrack(mockTrack);
});

test('JitsiTrack should return id', () => {
    expect(jitsiTrack.getId()).toBe(_jitsitTrackId);
});

test('JitsiTrack should attach underling track', () => {
    let mockedHtml = {};
    jitsiTrack.attach(mockedHtml);
    expect(attachMock).toHaveBeenCalledWith(mockedHtml);
})

test('JitsiTrack should detach underling track', () => {
    let mockedHtml = {};
    jitsiTrack.detach(mockedHtml);
    expect(detachMock).toHaveBeenCalledWith(mockedHtml);
})