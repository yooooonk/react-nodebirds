import { all, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from 'axios'
import { LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_OUT_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS, SIGN_UP_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS } from "../../reducers/user";



// login
function* logIn(action){
    
    try{        
        //const result = yield call(loginAPI)
        delay(1000)
        yield put({
            type:LOG_IN_SUCCESS,
            data:action.data
        })
    }catch(err){
        yield put({
            type:LOG_IN_FAILURE,
            error:err.response.data
        });
    }    
}
function loginAPI(){
    return axios.post('/api/login')
}

// logout
function* logOut(){
    
    try {        
        yield put({
            type:LOG_OUT_SUCCESS    
        })
        
    } catch (error) {
        yield put({
            type:LOG_OUT_FAILURE,
            error:err.response.data
        });
    }
}

function* signUp(action){
    
    try{        
        //const result = yield call(loginAPI)
        delay(1000)
        yield put({
            type:SIGN_UP_SUCCESS,
            data:action.data
        })
    }catch(err){
        yield put({
            type:SIGN_UP_FAILURE,
            error:err.response.data
        });
    }    
}
function signUpAPI(){
    return axios.post('/api/login')
}


//watch 
function* watchLogin(){    
    yield takeLatest(LOG_IN_REQUEST,logIn);
}
function* watchLogout(){
    yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp(){
    yield takeLatest(SIGN_UP_REQUEST,signUp)
}

export default function* userSaga(){
    yield all([
        fork(watchLogin),
        fork(watchLogout)
        
    ])
}