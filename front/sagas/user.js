import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from 'axios'
import { CHANGE_NICKNAME_FAILURE, CHANGE_NICKNAME_REQUEST, CHANGE_NICKNAME_SUCCESS, FOLLOW_FAILURE, FOLLOW_REQUEST, FOLLOW_SUCCESS, LOAD_FOLLOWERS_FAILURE, LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWERS_SUCCESS, LOAD_FOLLOWINGS_FAILURE, LOAD_FOLLOWINGS_REQUEST, LOAD_FOLLOWINGS_SUCCESS, LOAD_USER_FAILURE, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_OUT_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS, REMOVE_FOLLOWER_FAILURE, REMOVE_FOLLOWER_REQUEST, REMOVE_FOLLOWER_SUCCESS, SIGN_UP_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, UNFOLLOW_FAILURE, UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS } from "../reducers/user";

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
        const result = yield call(followAPI,action.data)
        
        yield put({
            type:FOLLOW_SUCCESS,
            data:result.data
        })
    }catch(err){
        console.error(err)
        yield put({
            type:FOLLOW_FAILURE,
            error:err.response.data
        });
    }    
}
function followAPI(userId){    
    return axios.patch(`/user/${userId}/follow`)
}

function* unfollow(action){
    
    try{        
        const result = yield call(unfollowAPI,action.data)
        
        yield put({
            type:UNFOLLOW_SUCCESS,
            data:result.data
        })
    }catch(err){
        yield put({
            type:UNFOLLOW_FAILURE,
            error:err.response.data
        });
    }    
}
function unfollowAPI(userId){
    return axios.delete(`/user/${userId}/follow`)
}

function* loadFollowers(action){
    
    try{        
        const result = yield call(loadFollowersAPI)
        
        yield put({
            type:LOAD_FOLLOWERS_SUCCESS,
            data:result.data
        })
    }catch(err){
        console.error(err)
        yield put({
            type: LOAD_FOLLOWERS_FAILURE,
            error:err.response.data
        });
    }    
}
function loadFollowersAPI(){
    return axios.get(`/user/followers`)
}

function* loadFollowings(){
    
    try{        
        const result = yield call(loadFollowingsAPI)
        
        yield put({
            type:LOAD_FOLLOWINGS_SUCCESS,
            data:result.data
        })
    }catch(err){
        console.error(err)
        yield put({
            type: LOAD_FOLLOWINGS_FAILURE,
            error:err.response.data
        });
    }    
}


function loadFollowingsAPI(){
    return axios.get(`/user/followings`)
}

function* removeFollower(action){
    try{        
        const result = yield call(removeFollowerAPI,action.data);
        
        yield put({
            type:REMOVE_FOLLOWER_SUCCESS,
            data:result.data
        })
    }catch(err){
        console.error(err)
        yield put({
            type: REMOVE_FOLLOWER_FAILURE,
            error:err.response.data
        });
    }   
}

function removeFollowerAPI(data){
    return axios.delete(`/user/follower/${data}`)
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

function* watchLoadFollwers(){
    yield takeLatest(LOAD_FOLLOWERS_REQUEST,loadFollowers)
}

function* watchLoadFollwings(){
    yield takeLatest(LOAD_FOLLOWINGS_REQUEST,loadFollowings)
}

function* watchRemoveFollower(){
    yield takeLatest(REMOVE_FOLLOWER_REQUEST,removeFollower)
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
        fork(watchLoadFollwers),
        fork(watchLoadFollwings),
        fork(watchRemoveFollower),
        
    ])
}