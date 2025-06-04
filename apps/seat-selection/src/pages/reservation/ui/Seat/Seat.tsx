import { useMemo } from 'react';

import { useSeatReservationStore } from '../../../../features/seat-reservation/model';

const Seat = () => {
  const seatCount = useSeatReservationStore((state) => state.seatCount);
  const column = useSeatReservationStore((state) => state.column);
  const selectableSeatIds = useSeatReservationStore(
    (state) => state.selectableSeatIds,
  );

  const row = useMemo(() => {
    return Math.ceil(seatCount / column);
  }, [seatCount, column]);

  return (
    <div>
      {Array.from({ length: row }).map((_, rowIdx) => (
        <div key={rowIdx} style={{ display: 'flex', gap: 4 }}>
          {Array.from({ length: column }).map((_, colIdx) => {
            const seatNumber = rowIdx * column + colIdx;
            const isSelectable = selectableSeatIds.includes(seatNumber);

            return (
              <button key={seatNumber} type="button" disabled={!isSelectable}>
                {seatNumber}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Seat;
