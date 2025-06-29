import { composeStories } from '@storybook/react-vite';

import { render } from '../../../../shared/testing/testUtils';
import { ATTR } from '../../../../shared/testing/selector';

import * as stories from './MessageList.stories';

const { Default, RequestAndResponse } = composeStories(stories);

describe('MessageList', () => {
  test('빈 목록', async () => {
    const { queryAllByDataMessageAuthorRole } = render(<Default />);

    const all = queryAllByDataMessageAuthorRole(/(user|assistant)/);
    expect(all).toHaveLength(0);
  });

  test('유저와 어시스턴트 메시지 모두 존재, 1쌍 존재', async () => {
    const { queryAllByDataMessageAuthorRole } = render(<RequestAndResponse />);

    const all = queryAllByDataMessageAuthorRole(/(user|assistant)/);
    expect(all[0]).toHaveAttribute(ATTR.MESSAGE_AUTHOR_ROLE, 'user');
    expect(all[1]).toHaveAttribute(ATTR.MESSAGE_AUTHOR_ROLE, 'assistant');
  });
});
