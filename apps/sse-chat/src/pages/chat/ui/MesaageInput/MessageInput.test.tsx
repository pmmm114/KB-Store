import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/react-vite';

import { render, screen } from '../../../../shared/testing/testUtils';

import * as stories from './MessageInput.stories';

const { Default, NotInProgress, InProgress } = composeStories(stories);

describe('MessageInput', () => {
  test('Smoke Test', async () => {
    render(<Default />);

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  test('텍스트 입력 테스트', async () => {
    render(<Default />);

    const textArea = screen.getByRole('textbox');
    textArea.focus();

    await userEvent.keyboard('ABCD');

    expect(textArea).toHaveValue('ABCD');
  });

  test('입력된 텍스트 삭제', async () => {
    render(<Default />);

    const textArea = screen.getByRole('textbox');
    textArea.focus();

    const text = 'ABCD';
    await userEvent.keyboard(text);

    await userEvent.keyboard('{backspace}'.repeat(text.length));
    expect(textArea).toHaveValue('');
  });

  describe('전송 버튼 활성화 여부 확인', () => {
    test('텍스트 입력 시, 활성화', async () => {
      render(<Default />);

      const sendButton = screen.getByRole('button', { name: '전송' });

      const textArea = screen.getByRole('textbox');
      textArea.focus();

      await userEvent.keyboard('ABCD');

      expect(sendButton).toBeEnabled();
    });

    test('텍스트 입력 없을 시, 비활성화', async () => {
      render(<Default />);

      const sendButton = screen.getByRole('button', { name: '전송' });

      expect(sendButton).toBeDisabled();
    });
  });

  describe('스트리밍 상태 확인', () => {
    test('스트리밍 상태 아닐 시, 대기 중 표시', async () => {
      render(<NotInProgress />);

      const status = screen.getByRole('status');
      expect(status).toHaveAttribute('aria-busy', 'false');
    });

    test('스트리밍 상태 일 시, 응답 받는 중 표시', async () => {
      render(<InProgress />);

      const status = screen.getByRole('status');
      expect(status).toHaveAttribute('aria-busy', 'true');
    });
  });
});
