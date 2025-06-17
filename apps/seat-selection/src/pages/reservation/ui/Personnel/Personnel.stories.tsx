import { expect, within } from 'storybook/test';

import type { Meta, StoryObj } from '@storybook/react-vite';

import * as S from './styles.module.css';
import Personnel from './Personnel';

const meta: Meta<typeof Personnel> = {
  component: Personnel,
  title: 'Pages/Reservation/Personnel',
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  /**
   * 하나의 인원 버튼을 선택할 시, 선택한 버튼만 selected 상태
   *
   * 1. 1명 클릭
   * 2. 1명 selected 상태 확인
   * 3. reset 버튼 클릭
   * 4. 0명 selected 상태 확인
   */
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement);
    const buttons = await canvas.findAllByRole('button', { name: /^\d+명$/ });

    await userEvent.click(buttons[1]);
    expect(buttons[1]).toHaveClass(S.personnelSelected);

    const resetButton = await canvas.findAllByRole('button', {
      name: 'reset',
    });
    await userEvent.click(resetButton[0]);

    expect(buttons[0]).toHaveClass(S.personnelSelected);
  },
};
