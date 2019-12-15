import {createStore, combineReducers} from 'redux';
import CONSTANT from '../constant';

const homeReducer = (state: string = 'home', action: any) => {
    switch(action.type) {
        default: {
            return state;
        }
    }
}

const signUpReducer = (state: any, action: any) => {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    }
    switch(action.type) {
        case CONSTANT.SIGNUP.FIRSTNAME: {
            return state.firstName = action.valueChanged;
        }
        case CONSTANT.SIGNUP.LASTNAME: {
            return state.lastName = action.valueChanged;
        }
        case CONSTANT.SIGNUP.EMAIL: {
            return state.email = action.valueChanged;
        }
        case CONSTANT.SIGNUP.PASSWORD: {
            return state.password = action.valueChanged;
        }
        default: {
            return state;
        }
    }
}

const rootReducer = combineReducers({
    home: homeReducer,
    signUp: signUpReducer
});

export default createStore(rootReducer);