import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { createMainSlice } from '@/libs/zustand/stores/main/slice';

import * as T from '@/libs/zustand/stores/main/type';

export const useMainStore = create<T.TMainSlice>()(
  immer((...a) => ({
    ...createMainSlice(...a),
  })),
);
