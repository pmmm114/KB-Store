import { Personnel, Seat } from './ui';

export const ReservationPage = () => {
  return (
    <div>
      <Personnel />
      <Seat seatCount={48} column={6} />
    </div>
  );
};

export default ReservationPage;
