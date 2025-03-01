import type { ImmerStateCreator } from '@/libs/zustand/type';

import * as T from './type';

export const defaultInitState: T.TMainState = {
  /**
   * Main Page NFT 카테고리 탭 상태
   */
  tab: { key: 'ALL' },
};

export const createMainSlice: ImmerStateCreator<T.TMainSlice> = (set) => ({
  ...defaultInitState,
  setTab: (tab) => {
    set({ tab });
  },
});
