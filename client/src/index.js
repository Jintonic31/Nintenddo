import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import GlobalStyles from './Style/GlobalStyles'; // 전역 CSS 파일 import

import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import {Provider} from 'react-redux';
import store from './store/index';
export let persistor = persistStore(store);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <GlobalStyles />
            <App />
        </PersistGate>
    </Provider>
    
);


reportWebVitals();
