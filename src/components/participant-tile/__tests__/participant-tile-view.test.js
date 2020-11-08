import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import ParticipantTile from '../participant-tile-view'


describe('participant tile tests', () => {
    let trackMock, onClickMock, user;
    beforeEach(() => {
        trackMock = {
            attach: jest.fn().mockName("attachFunc"),
            isReady: jest.fn().mockName("isReadyFunc"),
            detach: jest.fn().mockName("detachFunc")
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

    it('Should call callback with user id when clicked', () => {

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
            <ParticipantTile user={user} />
        );

        expect(result.getByTestId('user1-video-id')).toBeTruthy();
    });

    it('Should not render video if track is not ready', () => {
        trackMock.isReady = jest.fn().mockName('isReadyMock').mockReturnValue(false)

        const result = render(
            <ParticipantTile user={user}/>
        );

        expect(result.queryByTestId('user1-video-id')).toBeFalsy();
    });

    it('Should not render place holder if track is not ready', () => {
        trackMock.isReady = jest.fn().mockName('isReadyMock').mockReturnValue(false)

        const result = render(
            <ParticipantTile user={user}/>
        );

        expect(result.queryByTestId('tile-placeholder')).toBeTruthy();
    });

    it('should supress overlay', () => {
        const result = render(
            <ParticipantTile user={user} suppressOverlay={true} />
        );

        expect(result.queryByTestId('tile-overlay-id')).toBeFalsy();       
    })

    
    it('should change inner layout to big', () => {
        const result = render(
            <ParticipantTile user={user} big={true}/>
        );

        let hasBigClass = result.queryByTestId('part-tile-id').classList.contains('big')
        expect(hasBigClass).toBe(true);       
    })
});
