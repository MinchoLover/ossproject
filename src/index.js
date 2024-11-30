import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter} from 'react-router-dom';
import {RecoilRoot} from 'recoil';

import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RecoilRoot>
        <BrowserRouter>
            <App/>
            {/* <AxiosAPI/> */}
            {/* <Api/> */}
        </BrowserRouter>
    </RecoilRoot>
);
