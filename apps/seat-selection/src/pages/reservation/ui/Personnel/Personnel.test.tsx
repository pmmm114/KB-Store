import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react-vite';

import * as stories from './Personnel.stories';

const { Default } = composeStories(stories);

describe('Personnel', () => {
  describe('기본 전체 활성화 상태', () => {
    test('모든 버튼 활성화', async () => {
      render(<Default />);

      const buttons = screen.getAllByRole('button');

      buttons.forEach((button) => {
        expect(button).toBeEnabled();
      });
    });
  });
});
