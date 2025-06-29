import type { Meta, StoryObj } from '@storybook/react-vite';

import MessageList from './MessageList';

const meta: Meta<typeof MessageList> = {
  component: MessageList,
  title: 'Pages/Chat/MessageList',
  parameters: {
    controls: {
      exclude: ['messages'],
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const RequestAndResponse: Story = {
  args: {
    messages: [
      {
        id: '1',
        role: 'user',
        content: 'User Request',
      },
      {
        id: '2',
        role: 'assistant',
        content: 'Assistant Response',
      },
    ],
  },
};

type MsgControl = { userText: string; assistantText: string };

export const MessageMultipleLines: StoryObj<MsgControl> = {
  argTypes: {
    userText: { control: 'text', name: 'User Text' },
    assistantText: { control: 'text', name: 'Assistant Text' },
  },
  args: {
    userText:
      'User Request User Request User Request User Request User Request User Request User Request User Request User Request User Request User Request User Request User Request User Request User Request User Request User Request',
    assistantText:
      'Assistant Response Assistant ResponseAssistant ResponseAssistant ResponseAssistant ResponseAssistant ResponseAssistant ResponseAssistant ResponseAssistant ResponseAssistant ResponseAssistant ResponseAssistant ResponseAssistant ResponseAssistant ResponseAssistant ResponseAssistant ResponseAssistant Response',
  },
  render: ({ userText, assistantText }) => (
    <MessageList
      messages={[
        { id: '1', role: 'user', content: userText },
        { id: '2', role: 'assistant', content: assistantText },
      ]}
    />
  ),
};
