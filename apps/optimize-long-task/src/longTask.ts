import { postMessageToWorker } from './worker.ts';
declare global {
  interface Window {
    scheduler: {
      postTask: (task: () => void) => Promise<void>;
      yield: () => Promise<void>;
    };
  }
}

// INFO: 대용량 데이터
const largeArray = new Array(200).fill(0);
const chunkSize = 5;

// INFO: 대용량 데이터 처리 작업
function heavyTask(number: number) {
  const currentTime = performance.now();
  const processingTime = 100 * (Math.random() + number);
  // INFO: processingTime 동안 작업 수행을 모의
  while (performance.now() - currentTime < processingTime) {
    /* empty */
  }
}

// INFO: 모든 데이터를 한번에 처리 ( = Long Task )
export function processAllAtOnce() {
  for (let i = 0; i < largeArray.length; i++) {
    heavyTask(largeArray[i]);
  }
}

// INFO: 1. 데이터를 chunkSize로 분할하여 처리 ( = setTimeout + recursive 사용 )
export function processInChunks() {
  let index = 0;

  function processChunk() {
    const end = index + chunkSize;
    while (index < end) {
      heavyTask(largeArray[index]);
      index++;
    }
    if (index < largeArray.length) {
      setTimeout(processChunk, 0);
    } else {
      console.log('processInChunks done');
    }
  }
  processChunk();
}

/**
 * INFO: 2. Promise와 setTimeout을 사용하여 데이터를 분할하여 처리
 */
export async function processInChunksWithPromise() {
  for (let i = 0; i < largeArray.length; i += chunkSize) {
    const end = i + chunkSize;
    for (let j = i; j < end; j++) {
      heavyTask(largeArray[j]);
    }
    await new Promise((resolve) => setTimeout(resolve, 0));
  }
  console.log('processInChunksWithPromise done');
}

// INFO: 3. requestIdleCallback을 활용한 작업 분할
export function processChunksIdle() {
  let index = 0;

  function processChunk(deadline: IdleDeadline) {
    const end = index + chunkSize;

    console.log('>> timeRemaining: ', deadline.timeRemaining());
    while (index < end && deadline.timeRemaining() > 0) {
      heavyTask(largeArray[index]);
      index++;
    }
    if (index < largeArray.length) {
      requestIdleCallback(processChunk);
    } else {
      console.log('processChunksIdle done');
    }
  }
  requestIdleCallback(processChunk);
}

// INFO: 4. Web Worker를 활용한 데이터 처리
export function processChunksWithWorker() {
  postMessageToWorker({
    command: 'chunk',
    payload: largeArray,
    chunkSize,
  });
}

// INFO: 5. Scheduler API를 활용한 데이터 처리, postTask
export function processChunksWithScheduler() {
  if (typeof window === 'undefined' || !('scheduler' in window)) return;

  let index = 0;
  async function processChunk() {
    const end = index + chunkSize;
    while (index < end) {
      heavyTask(largeArray[index]);
      index++;
    }
    if (index < largeArray.length) {
      await window.scheduler.postTask(processChunk);
    } else {
      console.log('processChunksWithScheduler done');
    }
  }
  processChunk();
}

// INFO: 6. Scheduler API를 활용한 데이터 처리, yield
export async function processChunksWithSchedulerYield() {
  if (typeof window === 'undefined' || !('scheduler' in window)) return;

  for (let i = 0; i < largeArray.length; i += chunkSize) {
    const end = i + chunkSize;
    for (let j = i; j < end; j++) {
      heavyTask(largeArray[j]);
    }
    await window.scheduler.yield();
  }
  console.log('processChunksWithSchedulerYield done');
}
