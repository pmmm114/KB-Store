/**
 * 좌석 정보
 */
export interface ISeat {
  /** 좌석 번호 */
  id: number;
  /** 좌석 선택 여부 */
  isSelected: boolean;
  /** 좌석 선택 가능 여부 */
  isSelectable: boolean;
}
export type TSeatReservationState = {
  column: number;
  seat: Array<ISeat>;
};

export type TSeatReservationPersonnelState = {
  maxPersonnel: number;
  selectedPersonnel: number;
};
export type TSeatReservationActions = {
  initSeatStateByPersonnel: () => void;
  addSelectedSeatIds: (seatIds: Array<number>) => void;
  removeSelectedSeatIds: (seatIds: Array<number>) => void;
  resetSeat: () => void;
};
export type TSeatReservationPersonnelActions = {
  setSelectedPersonnel: (personnel: number) => void;
  resetPersonnel: () => void;
};

export type TSeatReservationSlice = TSeatReservationState &
  TSeatReservationActions;
export type TSeatReservationPersonnelSlice = TSeatReservationPersonnelState &
  TSeatReservationPersonnelActions;

export type TSeatReservationStore = TSeatReservationSlice &
  TSeatReservationPersonnelSlice;
