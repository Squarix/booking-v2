import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import App from './App';
import * as serviceWorker from './serviceWorker';
import { bookingStore } from "./utils/booking-store";

ReactDOM.render((
  <Provider store={bookingStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>

), document.getElementById('root'))


serviceWorker.register();
