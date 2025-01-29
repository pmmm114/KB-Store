import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.tsx'

import './index.css'

async function enableMocking() {
  if (import.meta.env.PROD) {
    return
  }
 
  const { worker } = await import('./libs/msw/browser')
 
  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start()
}
 
enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
})


