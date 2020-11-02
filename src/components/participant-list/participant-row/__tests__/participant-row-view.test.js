import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import ParticipantRow from '../participant-row-view'

describe('participant tile tests', () => {
    let onClickMock;
    beforeEach(() => {
        onClickMock = jest.fn().mockName("onClickMock");
    });

    it('Should call callback with user id and inverted mute value', () => {

        const result = render(
            <ParticipantRow userId="user1" mute={false} username="italo" onMuteClick={onClickMock} />
        );

        fireEvent.click(result.getByTestId('user1-part-row-mute'));

        expect(onClickMock).toHaveBeenCalledWith('user1', true);
    });
});
