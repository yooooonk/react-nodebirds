import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from 'axios'
import { CHANGE_NICKNAME_FAILURE, CHANGE_NICKNAME_REQUEST, CHANGE_NICKNAME_SUCCESS, FOLLOW_FAILURE, FOLLOW_REQUEST, FOLLOW_SUCCESS, LOAD_USER_FAILURE, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_OUT_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS, SIGN_UP_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, UNFOLLOW_FAILURE, UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS } from "../reducers/user";

function* loadUser(){
    
    try{
        const result = yield call(loadUserAPI);        
            
        yield put({
            type:LOAD_USER_SUCCESS,
            data:result.data
        })
    }catch(err){
        yield put({
            type:LOAD_USER_FAILURE,
            data:err.response.data
        })
    }
}

function loadUserAPI(){
    return axios.get('/user')
}

// login
function* logIn(action){
    
    try{        
        const result = yield call(loginAPI,action.data)
        
        yield put({
            type:LOG_IN_SUCCESS,
            data:result.data
        })
    }catch(err){
        yield put({
            type:LOG_IN_FAILURE,
            error:err.response.data 
        });
    }    
}
function loginAPI(data){
    return axios.post('/user/login',data)    
}

// logout
function* logOut(){
    const result = yield call(logoutAPI)
    try {        
        yield put({
            type:LOG_OUT_SUCCESS    
        })
        
    } catch (error) {
        yield put({
            type:LOG_OUT_FAILURE,
            error:error.response.data
        });
    }
}

function logoutAPI(){
    return axios.post('/user/logout')    
}

function* signUp(action){
    
   try{        
        const result = yield call(signUpAPI,action.data)
        
        yield put({
            type:SIGN_UP_SUCCESS,
            data: result.data
        })
    }catch(err){
        console.log(err)
        yield put({
            type:SIGN_UP_FAILURE,
            error: err.response.data
        });
    }
}
function signUpAPI(data){    
    return axios.post('/user/signup',data)
}

function* changeNickname(action){
    
    try{        
         const result = yield call(changeNicknameAPI,action.data)
         
         yield put({
             type:CHANGE_NICKNAME_SUCCESS,
             data: result.data
         })
     }catch(err){
         console.log(err)
         yield put({
             type:CHANGE_NICKNAME_FAILURE,
             error: err.response.data
         });
     }
 }
 function changeNicknameAPI(nickname){    
     
     return axios.patch('/user/nickname',{nickname})
 }
 

function* follow(action){
    
    try{        
        //const result = yield call(loginAPI)
        delay(1000)
        yield put({
            type:FOLLOW_SUCCESS,
            data:action.data
        })
    }catch(err){
        yield put({
            type:FOLLOW_FAILURE,
            error:err.response.data
        });
    }    
}
function followAPI(){
    return axios.post('/api/login')
}

function* unfollow(action){
    
    try{        
        //const result = yield call(loginAPI)
        delay(1000)
        yield put({
            type:UNFOLLOW_SUCCESS,
            data:action.data
        })
    }catch(err){
        yield put({
            type:UNFOLLOW_FAILURE,
            error:err.response.data
        });
    }    
}
function unfollowAPI(){
    return axios.post('/api/login')
}


function* watchLoadUser(){    
    yield takeLatest(LOAD_USER_REQUEST,loadUser)
}

function* watchLogin(){    
    yield takeLatest(LOG_IN_REQUEST,logIn);
}
function* watchLogout(){
    yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp(){
    yield takeLatest(SIGN_UP_REQUEST,signUp)
}

function* watchFollow(){
    yield takeLatest(FOLLOW_REQUEST,follow)
}

function* watchUnfollow(){
    yield takeLatest(UNFOLLOW_REQUEST,unfollow)
}

function* watchChangeNickname(){
    yield takeLatest(CHANGE_NICKNAME_REQUEST,changeNickname)
}



export default function* userSaga(){
    yield all([
        fork(watchLogin),
        fork(watchLogout),
        fork(watchSignUp),
        fork(watchFollow),
        fork(watchUnfollow),
        fork(watchLoadUser),
        fork(watchChangeNickname),
        
    ])
}