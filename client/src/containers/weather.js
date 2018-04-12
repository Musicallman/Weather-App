import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createStore} from 'redux';
import allReducers from '../reducers/index';
import SearchLine from './SearchLine';
import callApi from '../API';
import $ from 'jquery';
import {
    snow,
    snowImageURL,
    rain,
    rainImageURL,
    cloud,
    cloudImageURL,
    clear,
    sun,
    sunImageURL
} from "../constants/constants";


export const store = createStore(allReducers);


class WeatherList extends Component {

    componentDidMount() {
        callApi()
            .then(res => {store.dispatch({type: 'UPDATE_CURRENT_WEATHER', data: res})})
            .catch(err => console.log(err));
    }



    renderWeather() {

        if (this.props.data.cod === "200") {
            $('.weekWeather').show();
            $('.currentWeather').css("height", "530px");
            let str = this.props.data.desc;

            str.indexOf(rain) > -1 ? $('.currentWeather').css('background-image', 'url(' + rainImageURL + ')') : 0;
            str.indexOf(sun) > -1 || str.indexOf(clear) > -1 ? $('.currentWeather').css('background-image', 'url(' + sunImageURL + ')') : 0;
            str.indexOf(snow) > -1 ? $('.currentWeather').css('background-image', 'url(' + snowImageURL + ')') : 0;
            str.indexOf(cloud) > -1 ? $('.currentWeather').css('background-image', 'url(' + cloudImageURL + ')') : 0;

            return (
                <div>
                    <h3>{this.props.data.date}</h3>
                    <div className='description'>
                        <img src={`http://openweathermap.org/img/w/${this.props.data.icon}.png`}/>
                        <h3>{this.props.data.desc}</h3>
                    </div>
                    <h1>{this.props.data.temp}</h1>
                    <h3>{this.props.data.city}</h3>
                </div>
            )
        }

        else {
            $('.weekWeather').hide();
            $('.currentWeather').css("height", "120px");
            return ( <div className="notFound">CITY NOT FOUND!</div>)
        }


    }

    renderList() {
        if (this.props.data.list) {
            return (
                <div>

                    {this.props.data.list.map((i, c) =>
                        <div key={c}>
                            <p>{i.dt_txt}</p>

                            <div className="line">
                                <p>{i.weather[0].description}</p>
                                <img src={`http://openweathermap.org/img/w/${i.weather[0].icon}.png`}/>
                            </div>
                            <h2>{`${Math.round(i.main.temp - 273.15)}${String.fromCharCode(176)}C`}</h2>
                            <hr/>
                        </div>)}

                </div>
            )
        }
    }

    render() {
        return (

            <div>
                <SearchLine/>

                <div className='currentWeather'>
                    {this.renderWeather()}

                </div>

                <div className='weekWeather'>
                    {this.renderList()}
                </div>


            </div>

        )


    }


}

function mapStateToProps(state) {
    return {
        data: state.reducer
    }
}

export default connect(mapStateToProps)(WeatherList);
