import './style.css';
import typescriptLogo from './typescript.svg';
import viteLogo from '/vite.svg';
import { observer } from './observer.ts';
import { setupCounter } from './counter.ts';
import {
  processAllAtOnce,
  processInChunks,
  processInChunksWithPromise,
  processChunksIdle,
  processChunksWithWorker,
  processChunksWithScheduler,
  processChunksWithSchedulerYield,
} from './longTask.ts';

observer.observe({ type: 'longtask' });

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <div class="card">
      <button id="long-task" type="button">Execute Long Task</button>
    </div>
    <div class="card">
      <button id="long-task-in-chunks" type="button">Execute Long Task in Chunks</button>
    </div>
    <div class="card">
      <button id="long-task-in-chunks-with-promise" type="button">Execute Long Task in Chunks With Promise</button>
    </div>
    <div class="card">
      <button id="long-task-in-chunks-with-idle" type="button">Execute Long Task in Chunks With Idle</button>
    </div>
    <div class="card" style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
      <button id="long-task-in-chunks-with-worker" type="button">Execute Long Task in Chunks With Worker</button>
      <div id="worker-progress" style="width: 100%; height: 10px; background-color: #ccc;">
        <div id="worker-progress-bar" style="width: 0%; height: 100%; background-color: green;"></div>
      </div>
    </div>
    <div class="card">
      <button id="long-task-in-chunks-with-scheduler" type="button">Execute Long Task in Chunks With Scheduler</button>
    </div>
    <div class="card">
      <button id="long-task-in-chunks-with-scheduler-yield" type="button">Execute Long Task in Chunks With Scheduler Yield</button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!);

document
  .querySelector<HTMLButtonElement>('#long-task')!
  .addEventListener('click', () => {
    processAllAtOnce();
  });

document
  .querySelector<HTMLButtonElement>('#long-task-in-chunks')!
  .addEventListener('click', () => {
    processInChunks();
  });

document
  .querySelector<HTMLButtonElement>('#long-task-in-chunks-with-promise')!
  .addEventListener('click', () => {
    processInChunksWithPromise();
  });

document
  .querySelector<HTMLButtonElement>('#long-task-in-chunks-with-idle')!
  .addEventListener('click', () => {
    processChunksIdle();
  });

document
  .querySelector<HTMLButtonElement>('#long-task-in-chunks-with-worker')!
  .addEventListener('click', () => {
    processChunksWithWorker();
  });

document
  .querySelector<HTMLButtonElement>('#long-task-in-chunks-with-scheduler')!
  .addEventListener('click', () => {
    processChunksWithScheduler();
  });

document
  .querySelector<HTMLButtonElement>(
    '#long-task-in-chunks-with-scheduler-yield',
  )!
  .addEventListener('click', () => {
    processChunksWithSchedulerYield();
  });
