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
  const resetPersonnel = useSeatReservationStore(
    (state) => state.resetPersonnel,
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
            aria-label={`${index}명`}
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
        <button type="button" aria-label="reset" onClick={resetPersonnel}>
          reset
        </button>
      </div>
    </div>
  );
};

export default Personnel;
