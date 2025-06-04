import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import {
  createSeatReservationSlice,
  createSeatReservationPersonnelSlice,
} from './slice';

import * as T from './types';

export const useSeatReservationStore = create<T.TSeatReservationStore>()(
  devtools((...a) => ({
    ...createSeatReservationSlice(...a),
    ...createSeatReservationPersonnelSlice(...a),
  })),
);
