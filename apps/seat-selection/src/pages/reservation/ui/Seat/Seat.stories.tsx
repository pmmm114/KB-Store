import { useEffect } from 'react';
import { expect, within } from 'storybook/test';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';

import { useSeatReservationStore } from '../../../../features/seat-reservation/model';

import * as S from './styles.module.css';
import Seat from './Seat';

const meta = {
  component: Seat,
  title: 'Pages/Reservation/Seat',
} satisfies Meta<typeof Seat>;
export default meta;
type Story = StoryObj<typeof meta>;

// 공통 데코레이터 함수
const withSelectedPersonnel = (personnel: number): Decorator => {
  return (Story) => {
    const setSelectedPersonnel = useSeatReservationStore(
      (state) => state.setSelectedPersonnel,
    );
    const reset = useSeatReservationStore((state) => state.resetSeat);

    useEffect(() => {
      reset();
      setSelectedPersonnel(personnel);
    }, [setSelectedPersonnel, personnel, reset]);
    return <Story />;
  };
};

export const Default: Story = {
  args: {},
  decorators: [withSelectedPersonnel(0)],
};

export const SelectedPersonnelOne: Story = {
  args: {},
  decorators: [withSelectedPersonnel(1)],
  /**
   *
   * 1인 선택 기준, 좌석선택 시나리오
   *
   * 1. 홀수 열 Hover
   * 2. 홀수 열 선택 ( click )
   * 3. 다른 좌석이 disabled 상태인지 확인
   * 4. 선택한 홀수 좌석 해제 ( click )
   * 5. 선택을 해제한 좌석 unHover
   */
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement);
    const buttons = await canvas.findAllByRole('button');

    // 1. 홀수 열 Hover
    await userEvent.hover(buttons[0]);
    expect(buttons[0]).toHaveClass(S.selectableHover);

    // 2. 홀수 열 Click
    await userEvent.click(buttons[0]);
    expect(buttons[0]).toHaveClass(S.selected);
    await userEvent.unhover(buttons[0]);

    //  3. 다른 좌석이 disabled 상태인지 확인
    for (let i = 1; i < buttons.length; i++) {
      expect(buttons[i]).toBeDisabled();
    }

    // 4. 선택한 홀수 좌석 해제 ( click )
    await userEvent.click(buttons[0]);
    expect(buttons[0]).not.toHaveClass(S.selected);
    expect(buttons[0]).toHaveClass(S.selectableHover);

    // 5. 선택을 해제한 좌석 unHover
    await userEvent.unhover(buttons[0]);
    expect(buttons[0]).not.toHaveClass(S.selectableHover);
  },
};

export const SelectedPersonnelTwo: Story = {
  args: {},
  decorators: [withSelectedPersonnel(2)],
  /**
   *
   * 2인 선택 기준, 좌석선택 시나리오
   *
   * 1. 0번 좌석 hover
   * 2. 0번 좌석 클릭
   * 3. 1번 좌석 선택확인
   * 4. 나머지 좌석 disabled 확인
   * 5. 0번 좌석 해제
   * 6. 0번 좌석 unHover
   */
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement);
    const buttons = await canvas.findAllByRole('button');

    // 1. 0번 좌석  Hover
    await userEvent.hover(buttons[0]);
    expect(buttons[0]).toHaveClass(S.selectableHover);

    // 2. 0번 좌석 클릭( click )
    await userEvent.click(buttons[0]);
    expect(buttons[0]).toHaveClass(S.selected);

    // 3. 1번 좌석 선택확인
    expect(buttons[1]).toHaveClass(S.selected);

    // 4. 나머지 좌석 disabled 확인
    for (let i = 2; i < buttons.length; i++) {
      expect(buttons[i]).toBeDisabled();
    }

    // 5. 0번 좌석 해제
    await userEvent.click(buttons[0]);
    expect(buttons[0]).not.toHaveClass(S.selected);

    // 6. 0번 좌석 unHover
    await userEvent.unhover(buttons[0]);
    expect(buttons[0]).not.toHaveClass(S.selectableHover);
  },
};

export const SelectedPersonnelThree: Story = {
  args: {},
  decorators: [withSelectedPersonnel(3)],
  play: async ({ canvasElement }) => {},
};
