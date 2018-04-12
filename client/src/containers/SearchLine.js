import React, {Component} from 'react';
import $ from 'jquery';
import {store} from "./weather";
import callApi from '../API';


const click = (e) => {
    e.preventDefault();
    let city = $('#city').val();
    console.log(city);
    city = city.trim();
    console.log(city);
    callApi(city).then(data => {
        store.dispatch({
            type: 'UPDATE_CURRENT_WEATHER',
            data: data
        })
    });
    $('#city').val('');

};

class SearchLine extends Component {
    render() {
        return (
            <form className='searchLine'>
                <input id='city' type='text' placeholder='ENTER THE CITY'/>
                <button className='search' onClick={click}>SEARCH</button>
            </form>
        )
    }
}

export default SearchLine;

