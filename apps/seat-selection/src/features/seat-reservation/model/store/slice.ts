import { StateCreator } from 'zustand/vanilla';

import * as T from './types';

export const initSeatReservationState: T.TSeatReservationState = {
  column: 8,
  seat: Array.from({ length: 48 }, (_, index) => ({
    id: index,
    isSelected: false,
    isSelectable: false,
  })),
};
export const createSeatReservationSlice: StateCreator<
  T.TSeatReservationStore,
  [['zustand/devtools', never]],
  [],
  T.TSeatReservationSlice
> = (set, get) => ({
  ...initSeatReservationState,
  initSeatStateByPersonnel: () => {
    const selectedPersonnel = get().selectedPersonnel;

    //  CONDITION: 인원 0명 선택
    if (selectedPersonnel === 0) {
      get().resetSeat();
    } else if (selectedPersonnel === 1) {
      //  CONDITION: 인원 1명 선택
      set(() => ({
        seat: get().seat.map((seat) => ({
          ...seat,
          isSelectable: seat.id % 2 === 0,
        })),
      }));
    } else {
      //  CONDITION: 인원 2명 이상 선택
      set(() => ({
        seat: get().seat.map((seat) => ({
          ...seat,
          isSelectable: true,
        })),
      }));
    }
  },
  addSelectedSeatIds: (seatIds) => {
    set(() => ({
      seat: get().seat.map((seat) => ({
        ...seat,
        isSelected: seatIds.includes(seat.id) ? true : seat.isSelected,
      })),
    }));
  },
  removeSelectedSeatIds: (seatIds) => {
    set(() => ({
      seat: get().seat.map((seat) => ({
        ...seat,
        isSelected: seatIds.includes(seat.id) ? false : seat.isSelected,
      })),
    }));
  },
  resetSeat: () => {
    set(initSeatReservationState);
  },
});

export const initSeatReservationPersonnelState: T.TSeatReservationPersonnelState =
  {
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
    const currentSelectedSeats = get().seat.filter((seat) => seat.isSelected);

    if (currentSelectedSeats.length > personnel) {
      alert('선택된 좌석이 변경하려는 예매 인원보다 많습니다.');
      return;
    }

    set(() => ({ selectedPersonnel: personnel }));
    get().initSeatStateByPersonnel();
  },
  resetPersonnel: () => {
    set(initSeatReservationPersonnelState);
    get().resetSeat();
  },
});
