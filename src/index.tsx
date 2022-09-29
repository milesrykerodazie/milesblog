import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/app/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ThemeProvider from './utils/ThemeProvider';

// import { disableReactDevTools } from '@fvilers/disable-react-devtools';

// if (process.env.NODE_ENV === 'production') disableReactDevTools();

const root = ReactDOM.createRoot(
   document.getElementById('root') as HTMLElement,
);
root.render(
   <React.StrictMode>
      <ThemeProvider>
         <Provider store={store}>
            <BrowserRouter>
               <Routes>
                  <Route path='/*' element={<App />} />
               </Routes>
            </BrowserRouter>
         </Provider>
         <ToastContainer />
      </ThemeProvider>
   </React.StrictMode>,
);
