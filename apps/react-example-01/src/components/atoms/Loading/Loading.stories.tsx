import type { Meta, StoryObj } from '@storybook/react';

import { Loading } from '.';

const meta = {
  title: 'Components/Atoms/Loading',
  component: Loading,
} satisfies Meta<typeof Loading>;
export default meta;

type Story = StoryObj<typeof Loading>;

export const Default: Story = {
  parameters: {},
  args: {},
};
