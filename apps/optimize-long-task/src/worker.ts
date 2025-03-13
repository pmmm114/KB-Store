/**
 * Worker 스레드에서 실행될 스크립트 파일 지정
 */
const myWorker = new Worker(new URL('./workerProcess.ts', import.meta.url), {
  type: 'module',
});

myWorker.onmessage = (e) => {
  const { command, payload } = e.data;
  switch (command) {
    case 'progress':
      updateProgressBar(payload);
      break;
    case 'done':
      updateProgressBar(1);
      console.log('done');
      break;
  }
};

function updateProgressBar(payload: number) {
  const progressBar = document.getElementById('worker-progress-bar');
  if (progressBar) {
    requestAnimationFrame(() => {
      progressBar.style.width = `${Math.round(payload * 100)}%`;
    });
  }
}

export function postMessageToWorker(data: unknown) {
  myWorker.postMessage(data);
}
