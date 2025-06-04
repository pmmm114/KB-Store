export type TSeatReservationState = {
  seatCount: number;
  column: number;
  selectableSeatIds: Array<number>;
  selectedSeatIds: Array<number>;
};

export type TSeatReservationPersonnelState = {
  maxPersonnel: number;
  selectedPersonnel: number;
};
export type TSeatReservationActions = {
  updateSeatStateByPersonnel: () => void;
};
export type TSeatReservationPersonnelActions = {
  setSelectedPersonnel: (personnel: number) => void;
};

export type TSeatReservationSlice = TSeatReservationState &
  TSeatReservationActions;
export type TSeatReservationPersonnelSlice = TSeatReservationPersonnelState &
  TSeatReservationPersonnelActions;

export type TSeatReservationStore = TSeatReservationSlice &
  TSeatReservationPersonnelSlice;
