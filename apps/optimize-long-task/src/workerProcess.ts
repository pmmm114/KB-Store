/**
 * Web Worker 스레드에서 실행될 코드
 */
let CHUNK_SIZE = 5;
let LARGE_ARRAY: number[] = [];

self.onmessage = (e) => dispatcher(e);

function dispatcher(e: MessageEvent) {
  const { command, payload, chunkSize } = e.data;
  switch (command) {
    case 'chunk':
      CHUNK_SIZE = chunkSize;
      LARGE_ARRAY = payload;
      processInChunksWithPromise();
      break;
  }
}

// INFO: 대용량 데이터 처리 작업
function heavyTask(number: number) {
  const currentTime = performance.now();
  const processingTime = 100 * (Math.random() + number);
  // INFO: processingTime 동안 작업 수행을 모의
  while (performance.now() - currentTime < processingTime) {
    /* empty */
  }
}

/**
 * INFO: 2. Promise와 setTimeout을 사용하여 데이터를 분할하여 처리
 */
export async function processInChunksWithPromise() {
  for (let i = 0; i < LARGE_ARRAY.length; i += CHUNK_SIZE) {
    const end = i + CHUNK_SIZE;
    for (let j = i; j < end; j++) {
      console.log('Task Index: ', j);
      heavyTask(LARGE_ARRAY[j]);
    }
    self.postMessage({
      command: 'progress',
      payload: i / LARGE_ARRAY.length,
    });
    await new Promise((resolve) => setTimeout(resolve, 0));
  }
  self.postMessage({
    command: 'done',
  });
}
