import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import WeatherList, {store} from './containers/weather';
import './style.css';






ReactDOM.render(
    <Provider store = {store}>
        <WeatherList/>
    </Provider>,

    document.getElementById('root'));

