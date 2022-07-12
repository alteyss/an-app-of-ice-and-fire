import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
} from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ToastContainer, toast } from 'react-toastify';
import './styles/_index.scss';
import 'react-toastify/dist/ReactToastify.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import { persistor, store } from './redux/store';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

toast('Bienvenue ! 👋', { autoClose: 2000 });

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
        <ToastContainer />
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
