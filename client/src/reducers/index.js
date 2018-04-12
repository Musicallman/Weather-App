import {combineReducers} from 'redux';
import reducer from './reducer';

const allReducers = combineReducers({
    reducer: reducer
});

export default allReducers;