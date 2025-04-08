import { useState, useTransition } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

import FirstFiber from './components/FirstFiber';

function App() {
  const [count, setCount] = useState(0);
  const [isPending, startTransition] = useTransition();

  const clickHandler = () => {
    startTransition(() => {
      // INFO: startTransition의 actions은 모두 transition으로 처리됩니다.
      setCount((count) => count + 1);
    });
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={clickHandler}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <FirstFiber />
    </>
  );
}

export default App;
