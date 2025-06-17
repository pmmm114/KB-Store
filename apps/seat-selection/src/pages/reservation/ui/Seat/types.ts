import { ISeat } from '../../../../features/seat-reservation/model';

export interface ISeatProps {
  initialColumn: number;
  initialSeats: number;
}

export type TClickHandler = (seat: ISeat) => void;
