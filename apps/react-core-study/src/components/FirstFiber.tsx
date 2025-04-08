import { useState } from 'react';

const FirstFiber = () => {
  // INFO: state를 2개 이상 선언하여 workInProgressHook을 활성화함을 확인할 수 있음.
  const [state1, setState1] = useState(1);
  const [state2, setState2] = useState(2);

  return (
    <div>
      <button onClick={() => setState1(state1)}>BoilOut Test Button</button>
      <button onClick={() => setState1(state1 + 1)}>count is {state1}</button>
      <button onClick={() => setState2(state2 + 2)}>count is {state2}</button>
    </div>
  );
};

export default FirstFiber;
