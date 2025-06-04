import { useSeatReservationStore } from '../../../../features/seat-reservation/model';

import * as S from './styles.module.css';

const Personnel = () => {
  const maxPersonnel = useSeatReservationStore((state) => state.maxPersonnel);
  const selectedPersonnel = useSeatReservationStore(
    (state) => state.selectedPersonnel,
  );
  const setSelectedPersonnel = useSeatReservationStore(
    (state) => state.setSelectedPersonnel,
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: '10px',
      }}
    >
      <div>
        {Array.from({ length: maxPersonnel + 1 }).map((_, index) => (
          <button
            type="button"
            key={index}
            onClick={() => setSelectedPersonnel(index)}
            className={
              selectedPersonnel === index
                ? S['personnelSelected']
                : S['personnel']
            }
          >
            {index}
          </button>
        ))}
      </div>
      <div>
        <button type="button">reset</button>
      </div>
    </div>
  );
};

export default Personnel;
