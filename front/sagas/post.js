import { all, call, delay, fork, put, takeLatest, throttle } from "redux-saga/effects"
import { ADD_COMMENT_FAILURE, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_POST_FAILURE, ADD_POST_REQUEST, ADD_POST_SUCCESS, generateDummyPost, LOAD_POST_FAILURE, LOAD_POST_REQUEST, LOAD_POST_SUCCESS, REMOVE_POST_FAILURE, REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS } from "../reducers/post";
import { ADD_POST_TO_ME,REMOVE_POST_OF_ME } from "../reducers/user";
import axios from 'axios'

function* addPost(action){
    
    try{
        const result = yield call(addPostAPI, action.data);       
                
        yield put({
            type:ADD_POST_SUCCESS,
            data:result.data
        })
        
        
       yield put({
            type:ADD_POST_TO_ME,
            data: result.data.id
        }) 
    }catch(err){
        console.log('error',err)
        yield put({
            type:ADD_POST_FAILURE,
            data: err.response.data
        })
    }
}

function addPostAPI(data){        
    return axios.post('/post',{content:data})
}

function* loadPost(){
   
     try{
        const result = yield call(loadPostAPI);
                                
        yield put({
            type:LOAD_POST_SUCCESS,
            data: result.data
        })
        
    }catch(err){
        console.log(err)
        yield put({
            type:LOAD_POST_FAILURE,
            data: err.response.data
        })
    }
}

function loadPostAPI(){
    return axios.get('/posts')
}

function* removePost(action){
    
    try{
        //const result = yield call(addPostAPI, action.data);
        delay(1000)
                
        yield put({
            type:REMOVE_POST_SUCCESS,
            data:action.data
        })

       yield put({
            type:REMOVE_POST_OF_ME,
            data:action.data
        })
    }catch(err){
        yield put({
            type:REMOVE_POST_FAILURE,
            data:err.response.data
        })
    }
}


function* addComment(action){
    
    try{
        const result = yield call(addCommentAPI, action.data);        
        
        yield put({
            type:ADD_COMMENT_SUCCESS,
            data:result.data
        })
    }catch(err){
        console.error(err)        
        yield put({
            type:ADD_COMMENT_FAILURE,
            data:err.response.data
        })
    }
}

function addCommentAPI(data){    
    return axios.post(`/post/${data.postId}/comment`,data)
}



function* watchAddPost(){
    yield takeLatest(ADD_POST_REQUEST,addPost)
}

function* watchAddComment(){
    yield takeLatest(ADD_COMMENT_REQUEST, addComment)
}

function* watchRemovePost(){
    yield takeLatest(REMOVE_POST_REQUEST,removePost)
}

function* watchLoadPost(){
    yield takeLatest(LOAD_POST_REQUEST,loadPost)
}

export default function* postSaga(){
    yield all([
        fork(watchAddPost),
        fork(watchLoadPost),
        fork(watchRemovePost),
        fork(watchAddComment)
        
    ])
}