import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {RecoilRoot} from 'recoil';
import AxiosAPI from './AxiosAPI';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RecoilRoot>
        <BrowserRouter>
            <App/>
            {/* <AxiosAPI/> */}
        </BrowserRouter>
    </RecoilRoot>

);
