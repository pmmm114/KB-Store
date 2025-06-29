import { expect, within } from 'storybook/test';

import type { Meta, StoryObj } from '@storybook/react-vite';

import * as S from './styles.module.css';
import MessageInput from './MessageInput';

const meta: Meta<typeof MessageInput> = {
  component: MessageInput,
  title: 'Pages/Chat/MessageInput',
  parameters: {
    controls: {
      exclude: ['onSend'],
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    streaming: false,
  },
  /**
   * 하나의 인원 버튼을 선택할 시, 선택한 버튼만 selected 상태
   */
  play: async ({ canvasElement, userEvent }) => {},
};

export const NotInProgress: Story = {
  args: {
    streaming: false,
  },
  /**
   * 하나의 인원 버튼을 선택할 시, 선택한 버튼만 selected 상태
   */
  play: async ({ canvasElement, userEvent }) => {},
};

export const InProgress: Story = {
  args: {
    streaming: true,
  },
  /**
   * 하나의 인원 버튼을 선택할 시, 선택한 버튼만 selected 상태
   */
  play: async ({ canvasElement, userEvent }) => {},
};
