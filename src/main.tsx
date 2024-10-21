import { createRoot } from 'react-dom/client'
import App from './router/App.tsx'
import { Provider } from 'react-redux'
import store from './redux/store/store.tsx'


createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
