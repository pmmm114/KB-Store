import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react-vite';

import * as stories from './Seat.stories';

const { Default, SelectedPersonnelOne, SelectedPersonnelTwo } =
  composeStories(stories);

describe('Seat', () => {
  describe('좌석 비활성화/disabled', () => {
    test('모든 좌석 disabled', async () => {
      render(<Default />);

      const buttons = screen.getAllByRole('button');
      buttons.forEach((button) => {
        expect(button).toBeDisabled();
      });
    });
  });

  describe('1인 선택', () => {
    test('홀수 좌석만 활성화', async () => {
      render(<SelectedPersonnelOne />);

      const buttons = screen.getAllByRole('button');
      buttons.forEach((button, idx) => {
        if (idx % 2 === 0) {
          expect(button).toBeEnabled();
        } else {
          expect(button).toBeDisabled();
        }
      });
    });
  });

  describe('2인이상 선택', () => {
    test('모든 좌석 활성화', async () => {
      render(<SelectedPersonnelTwo />);

      const buttons = screen.getAllByRole('button');
      buttons.forEach((button) => {
        expect(button).toBeEnabled();
      });
    });
  });
});
