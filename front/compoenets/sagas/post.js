import { all, fork, takeLatest } from "redux-saga/effects"
import { addComment, ADD_COMMENT_FAILURE, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_POST_FAILURE, ADD_POST_REQUEST, ADD_POST_SUCCESS } from "../../reducers/post";



function* addPost(action){
    try{
        const result = yield call(addPostAPI, action.data);
        yield put({
            type:ADD_POST_SUCCESS,
            data:result.data
        })
    }catch(err){
        yield put({
            type:ADD_POST_FAILURE,
            data:err.response.data
        })
    }
}

function* addPostAPI(data){
    return axios.post('/api/post',data)
}

function* addComment(action){
    try{
        const result = yield call(addPostAPI, action.data);
        yield put({
            type:ADD_COMMENT_SUCCESS,
            data:result.data
        })
    }catch(err){
        yield put({
            type:ADD_COMMENT_FAILURE,
            data:err.response.data
        })
    }
}

function* addCommentAPI(data){
    return axios.post('/api/post',data)
}



function* watchAddPost(){
    yield takeLatest(ADD_POST_REQUEST,addPost)
}

function* watchAddComment(){
    yield takeLatest(ADD_COMMENT_REQUEST, addComment)
}

export default function* postSaga(){
    yield all([
        fork(watchAddPost),
        fork(watchAddComment),
    ])
}