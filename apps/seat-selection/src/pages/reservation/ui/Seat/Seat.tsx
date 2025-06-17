import { useCallback, useMemo, useState } from 'react';
import { clsx } from 'clsx';

import { useSeatReservationStore } from '../../../../features/seat-reservation/model';

import * as T from './types';
import * as S from './styles.module.css';

const Seat = () => {
  const column = useSeatReservationStore((state) => state.column);
  const seat = useSeatReservationStore((state) => state.seat);

  const selectedPersonnel = useSeatReservationStore(
    (state) => state.selectedPersonnel,
  );
  const addSelectedSeatIds = useSeatReservationStore(
    (state) => state.addSelectedSeatIds,
  );
  const removeSelectedSeatIds = useSeatReservationStore(
    (state) => state.removeSelectedSeatIds,
  );
  //  INFO: 마우스 커서가 올라간 좌석 ID
  const [hoverSeatId, setHoverSeatId] = useState<number | null>(null);

  //  INFO: 선택해야할 좌석 개수
  const remainingSeatCount = useMemo(() => {
    return selectedPersonnel - seat.filter((seat) => seat.isSelected).length;
  }, [seat, selectedPersonnel]);

  const seatRow = useMemo(() => {
    return Array.from({ length: Math.ceil(seat.length / column) }, (_, i) =>
      seat.slice(i * column, i * column + column),
    );
  }, [seat, column]);

  const previewSeatIds = useMemo(() => {
    if (hoverSeatId === null) return [];

    if (remainingSeatCount === 0) return [];

    if (remainingSeatCount === 1) return [hoverSeatId];
    else
      return hoverSeatId % 2 === 0
        ? [hoverSeatId, hoverSeatId + 1]
        : [hoverSeatId - 1, hoverSeatId];
  }, [remainingSeatCount, hoverSeatId]);

  //  INFO: 선택되지 않았지만 선택이 가능한 좌석인 경우 Hover했을 때 미리보기 좌석 추가   O
  //      - 선택 인원이 2명이상일 경우 첫번째칸부터 2칸 단위로 등록
  //      - 선택 인원이 1명일 경우 첫번째칸만 등록
  //      - 선택 인원이 0명일 경우 등록 안함
  //  INFO: 선택된 좌석일 경우, 해제
  //      - 선택 인원이 2개 이상일 경우 첫번째칸부터 2칸 단위로 해제
  //      - 선택 인원이 1명일 경우 첫번째칸만 해제
  //      - 선택 인원이 0명일 경우 해제 안함

  const mouseEnterHandler = (seatId: number) => setHoverSeatId(seatId);
  const mouseLeaveHandler = useCallback(() => {
    setHoverSeatId(null);
  }, []);
  const clickHandler: T.TClickHandler = (seat) => {
    const isSelected = seat.isSelected;
    if (isSelected) {
      const _clickedSeatIds =
        seat.id % 2 === 0 ? [seat.id, seat.id + 1] : [seat.id - 1, seat.id];
      removeSelectedSeatIds(_clickedSeatIds);
    } else {
      addSelectedSeatIds(previewSeatIds);
    }
  };

  return (
    <div>
      {seatRow.map((row, rowIdx) => (
        <div key={rowIdx} style={{ display: 'flex', gap: 4 }}>
          {row.map((seat) => {
            const isSelectable = !seat.isSelected && seat.isSelectable;
            const isSelected = seat.isSelected;
            const isHover = previewSeatIds.includes(seat.id);
            const isMax = remainingSeatCount === 0;
            const isDisabled = !isSelected && (!seat.isSelectable || isMax);

            return (
              <button
                key={seat.id}
                type="button"
                className={clsx(S['seat'], {
                  [S['selectable']]: isSelectable,
                  [S['selected']]: isSelected,
                  [S['selectableHover']]: isHover,
                })}
                disabled={isDisabled}
                onMouseEnter={() => mouseEnterHandler(seat.id)}
                onMouseLeave={mouseLeaveHandler}
                onClick={() => clickHandler(seat)}
              >
                {seat.id}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Seat;
