import React, { Component } from 'react';

import { store } from "./weather";
import { callApi } from '../API';


class SearchLine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: ''
        }
    }

    updateCityWeather(e) {
        e.preventDefault();
        let { city } = this.state;

        callApi(city).then(data => {
            store.dispatch({
                type: 'UPDATE_CURRENT_WEATHER',
                data: data
            })
        });
        this.setState({ city: '' });
    }

    render() {
        const { city } = this.state;

        return (
            <form onSubmit={(e) => this.updateCityWeather(e)} className='searchLine'>
                <input value={city}
                       id='city'
                       type='text'
                       placeholder='ENTER THE CITY'
                       onChange={(e) => this.setState({ city: e.target.value })}
                />
                <button className='search' type='submit'>SEARCH</button>
            </form>
        )
    }
}

export default SearchLine;

