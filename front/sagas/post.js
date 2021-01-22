import { all, call, delay, fork, put, takeLatest, throttle } from "redux-saga/effects"
import { ADD_COMMENT_FAILURE, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_POST_FAILURE, ADD_POST_REQUEST, ADD_POST_SUCCESS, generateDummyPost, LIKE_POST_FAILURE, LIKE_POST_REQUEST, LIKE_POST_SUCCESS, LOAD_POST_FAILURE, LOAD_POST_REQUEST, LOAD_POST_SUCCESS, REMOVE_POST_FAILURE, REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, UNLIKE_POST_FAILURE, UNLIKE_POST_REQUEST, UNLIKE_POST_SUCCESS } from "../reducers/post";
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
        console.error(err)
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
        const result = yield call(removePostAPI, action.data);
                        
        yield put({
            type:REMOVE_POST_SUCCESS,
            data:result.data
        })

       yield put({
            type:REMOVE_POST_OF_ME,
            data:result.data
        })
    }catch(err){
        console.error(err)
        yield put({
            type:REMOVE_POST_FAILURE,
            data:err.response.data
        })
    }
}

function removePostAPI(postId){
    return axios.delete(`/post/${postId}/delete`)
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

function* likePost(action){
    
    try{
        const result = yield call(likePostAPI, action.data);        
        
        yield put({
            type:LIKE_POST_SUCCESS,
            data:result.data
        })
    }catch(err){
        console.error(err)        
        yield put({
            type:LIKE_POST_FAILURE,
            data:err.response.data
        })
    }
}

function likePostAPI(data){    
    return axios.patch(`/post/${data}/like`)
}

function* unlikePost(action){
    
    try{
        const result = yield call(unlikePostAPI, action.data);        
        
        yield put({
            type:UNLIKE_POST_SUCCESS,
            data:result.data
        })
    }catch(err){
        console.error(err)        
        yield put({
            type:UNLIKE_POST_FAILURE,
            data:err.response.data
        })
    }
}

function unlikePostAPI(data){    
    return axios.delete(`/post/${data}/like`)
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

function* watchLikePost(){
    yield takeLatest(LIKE_POST_REQUEST,likePost)
}

function* watchUnlikePost(){
    yield takeLatest(UNLIKE_POST_REQUEST,unlikePost)
}

export default function* postSaga(){
    yield all([
        fork(watchAddPost),
        fork(watchLoadPost),
        fork(watchRemovePost),
        fork(watchAddComment),
        fork(watchLikePost),
        fork(watchUnlikePost)
        
    ])
}