const initialState = {
    cod: null,
    date: null,
    city: null,
    temp: null,
    desc: null,
    icon: null,
    list: null
};


export default function reducer(state = initialState, action) {

    switch (action.type) {

        case 'UPDATE_CURRENT_WEATHER' :
            let data = {...action.data},
                date = new Date();
           // console.log(data);
           if (data.cod === '404' || data.cod === '400' || data.cod === null)
               return {cod: 404};
           else
            return {
                cod: data.cod,
                date: `${date.toDateString()}`,
                city: `${data.city.name}, ${data.city.country}`,
                temp: `${Math.round(data.list[0].main.temp - 273.15)}${String.fromCharCode(176)}C`,
                desc: data.list[0].weather[0].description,
                icon: data.list[0].weather[0].icon,
                list:  [...data.list]
            };


        default:
            return state;
    }

}