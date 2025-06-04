import { StateCreator } from 'zustand/vanilla';

import * as T from './types';

const initSeatReservationState: T.TSeatReservationState = {
  seatCount: 48,
  column: 8,
  selectableSeatIds: [],
  selectedSeatIds: [],
};
export const createSeatReservationSlice: StateCreator<
  T.TSeatReservationStore,
  [['zustand/devtools', never]],
  [],
  T.TSeatReservationSlice
> = (set, get) => ({
  ...initSeatReservationState,
  updateSeatStateByPersonnel: () => {
    const selectedPersonnel = get().selectedPersonnel;
    const seatCount = get().seatCount;

    //  CONDITION: 인원 0명 선택
    if (selectedPersonnel === 0) {
      set(() => ({
        selectableSeatIds: [],
      }));
    } else if (selectedPersonnel === 1) {
      //  CONDITION: 인원 1명 선택
      set(() => ({
        selectableSeatIds: Array.from(
          { length: seatCount },
          (_, index) => index,
        ).filter((_, index) => index % 2 === 0),
      }));
    } else {
      //  CONDITION: 인원 2명 이상 선택
      set(() => ({
        selectableSeatIds: Array.from(
          { length: seatCount },
          (_, index) => index,
        ),
      }));
    }
  },
});

const initSeatReservationPersonnelState: T.TSeatReservationPersonnelState = {
  maxPersonnel: 10,
  selectedPersonnel: 0,
};
export const createSeatReservationPersonnelSlice: StateCreator<
  T.TSeatReservationStore,
  [['zustand/devtools', never]],
  [],
  T.TSeatReservationPersonnelSlice
> = (set, get) => ({
  ...initSeatReservationPersonnelState,
  setSelectedPersonnel: (personnel) => {
    set(() => ({ selectedPersonnel: personnel }));
    get().updateSeatStateByPersonnel();
  },
});
