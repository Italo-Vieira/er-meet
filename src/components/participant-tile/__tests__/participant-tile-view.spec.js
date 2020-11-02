import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import ParticipantTile from '../participant-tile-view'


describe('participant tile tests', () => {
    let trackMock, onClickMock, user;
    beforeEach(() => {
        trackMock = {
            attach: jest.fn().mockName("attachFunc"),
            isReady: jest.fn().mockName("isReadyFunc")
        }
        onClickMock = jest.fn().mockName("onClickMock");

        user = {
            userId: 'user1',
            username: 'user name',
            videoTrack: 'trackId',
        }

        trackMock.isReady = jest.fn().mockName('isReadyMock').mockReturnValue(false)
        user.videoTrack = trackMock;
    });

    it('Should call callback when clicked', () => {

        const result = render(
            <ParticipantTile user={user} onTileClick={onClickMock} />
        );

        fireEvent.click(result.getByTestId('part-tile-id'));

        expect(onClickMock).toHaveBeenCalledWith('user1');
    });

    it('Should render video', () => {
        trackMock.isReady = jest.fn().mockName('isReadyMock').mockReturnValue(true)
        user.videoTrack = trackMock;

        const result = render(
            <ParticipantTile user={user} onClick={onClickMock} />
        );

        expect(result.getByTestId('user1-video-id')).toBeTruthy();
    });

    it('Should not render video if track is not ready', () => {
        trackMock.isReady = jest.fn().mockName('isReadyMock').mockReturnValue(false)

        const result = render(
            <ParticipantTile user={user} onClick={onClickMock} />
        );

        expect(result.queryByTestId('user1-video-id')).toBeFalsy();
    });

    it('Should not render place holder if track is not ready', () => {
        trackMock.isReady = jest.fn().mockName('isReadyMock').mockReturnValue(false)

        const result = render(
            <ParticipantTile user={user} onClick={onClickMock} />
        );

        expect(result.queryByTestId('tile-placeholder')).toBeTruthy();
    });


});
