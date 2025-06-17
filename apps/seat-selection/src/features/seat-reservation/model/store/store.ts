import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import {
  createSeatReservationSlice,
  createSeatReservationPersonnelSlice,
  initSeatReservationState,
  initSeatReservationPersonnelState,
} from './slice';

import * as T from './types';

export const useSeatReservationStore = create<T.TSeatReservationStore>()(
  devtools((...a) => ({
    ...createSeatReservationSlice(...a),
    ...createSeatReservationPersonnelSlice(...a),
  })),
);

export const createSeatReservationStore = (
  initProps?: Partial<T.TSeatReservationStore>,
) => {
  const DEFAULT_PROPS: T.TSeatReservationState &
    T.TSeatReservationPersonnelState = {
    ...initSeatReservationState,
    ...initSeatReservationPersonnelState,
  };
  return create<T.TSeatReservationStore>()(
    devtools((...a) => ({
      ...createSeatReservationSlice(...a),
      ...createSeatReservationPersonnelSlice(...a),
      ...DEFAULT_PROPS,
      ...initProps,
    })),
  );
};
