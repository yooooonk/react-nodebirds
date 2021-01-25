import produce from 'immer'


export const initialState = {
    loginLoading : false, // 로그인 시도중
    loginDone:false,    
    loginError:null,
    logoutLoading : false,
    logoutDone:false,
    logoutError:null,
    followLoading : false,
    followDone:false,
    followError:null,
    unfollowLoading : false,
    unfollowDone:false,
    unfollowError:null,
    loadFollowersLoading : false,
    loadFollowersDone:false,
    loadFollowersError:null,
    loadFollowingsLoading : false,
    loadFollowingsDone:false,
    loadFollowingsError:null,
    signupLoading:false,
    signupDone:false,
    signupError:null,
    loadUserLoading:false,
    loadUserDone:false,
    loadUserError:null,
    changeNicknameLoading:false,
    changeNicknameDone:false,
    changeNicknameError:null,
    removeFollowerLoading : false,
    removeFollowerDone:false,
    removeFollowerError:null,
    me:null,
    signUpData:{},
    loginData:{}
}

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST'
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS'
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE'

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST'
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS'
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE'

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST'
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS'
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE'

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST'
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE'

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST'
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS'
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE'

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST'
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS'
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE'

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST'
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS'
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE'

export const LOAD_FOLLOWERS_REQUEST = 'LOAD_FOLLOWERS_REQUEST'
export const LOAD_FOLLOWERS_SUCCESS = 'LOAD_FOLLOWERS_SUCCESS'
export const LOAD_FOLLOWERS_FAILURE = 'LOAD_FOLLOWERS_FAILURE'

export const LOAD_FOLLOWINGS_REQUEST = 'LOAD_FOLLOWINGS_REQUEST'
export const LOAD_FOLLOWINGS_SUCCESS = 'LOAD_FOLLOWINGS_SUCCESS'
export const LOAD_FOLLOWINGS_FAILURE = 'LOAD_FOLLOWINGS_FAILURE'

export const REMOVE_FOLLOWER_REQUEST = 'REMOVE_FOLLOWER_REQUEST'
export const REMOVE_FOLLOWER_SUCCESS = 'REMOVE_FOLLOWER_SUCCESS'
export const REMOVE_FOLLOWER_FAILURE = 'REMOVE_FOLLOWER_FAILURE'

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME'
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME'

const dummyUser = (data)=>({
    ...data,
    nickname:'yoonk',
    id:1,
    Posts:[{id:'asdf'}],
    Followers:[{nickname:'서은광'},  {nickname:'이창섭'},{nickname:'이민혁'}],
    Followings:[{nickname:'임현식'},  {nickname:'프니엘'},{nickname:'육성재'}]
});


export const loginRequestAction = (data)=>{
    
    return {
        type:LOG_IN_REQUEST,
        data
    }
}


export const logoutRequestAction = (data)=>{
    return {
        type:LOG_OUT_REQUEST        
    }
}

export const signupRequestAction = (data)=>{
    return {
        type:SIGN_UP_REQUEST,
        data
    }
}

const reducer = (state = initialState, action)=>{
    return produce(state,(draft)=>{
        switch (action.type) {
            case LOAD_USER_REQUEST :               
                draft.loadUserLoading = true;
                draft.loadUserError = null;
                draft.loadUserDone = false;
                break;
            
            case LOAD_USER_SUCCESS : 
                
                draft.loadUserLoading = false;
                draft.loadUserDone = true;
                draft.me = action.data
                break;
            
            case LOAD_USER_FAILURE : 
                draft.loadUserLoading = false
                draft.loadUserError= action.error;
                break;

            case LOG_IN_REQUEST :               
                draft.loginLoading = true;
                draft.loginError = null;
                draft.loginDone = false;
                break;
            
            case LOG_IN_SUCCESS : 
                
                draft.loginLoading = false;
                draft.loginDone = true;
                draft.me = action.data
                break;
            
            case LOG_IN_FAILURE : 
                draft.loginLoading = false
                draft.loginError= action.error;
                break;
            
            case LOG_OUT_REQUEST :
                draft.logoutLoading = true;
                draft.logoutDone=false;
                draft.logoutError=null;
                break;
            
            case LOG_OUT_SUCCESS : 
                draft.logoutLoading = false;
                draft.logoutDone = false;
                draft.loginDone = false;
                draft.me = null;
                break;
            case LOG_OUT_FAILURE : 
                draft.logoutLoading = false
                draft.loginError = action.error;
                break;

            case SIGN_UP_REQUEST :
                draft.signupLoading = true;
                draft.signupDone = false;
                draft.signupError = null;
                break;

            case SIGN_UP_SUCCESS : 
                draft.signupLoading = false
                draft.signupDone = true;                                        
                break;

            case SIGN_UP_FAILURE : 
                draft.signupLoading = false
                draft.signupError = action.error
                break;

            case CHANGE_NICKNAME_REQUEST :
                draft.changeNicknameLoading = true
                draft.changeNicknameDone = false
                draft.changeNicknameError = null
                break;

            case CHANGE_NICKNAME_SUCCESS : 
                draft.me.nickname = action.data.nickname;
                draft.changeNicknameLoading = false;
                draft.changeNicknameDone = false    ;                                   
                break;

            case CHANGE_NICKNAME_FAILURE : 
                draft.changeNicknameLoading = false
                draft.changeNicknameError = action.error
                break;
            
            case ADD_POST_TO_ME : 
                draft.me.Posts.unshift({id:action.data.id});
                break;

            case REMOVE_POST_OF_ME : 
                console.log(action.data)
                draft.me.Posts = draft.me.Posts.filter((v)=>v.id !== action.data.id);
                break;
            
            case FOLLOW_REQUEST :               
                draft.followLoading = true;
                draft.followError = null;
                draft.followDone = false;
                break;
            
            case FOLLOW_SUCCESS : 
                draft.followLoading = false;
                draft.followDone = true;
                draft.me.Followings.push({id:action.data.followingId})        
                break;
            
            case FOLLOW_FAILURE : 
                draft.followLoading = false
                draft.followError= action.error;
                break;
            
            case UNFOLLOW_REQUEST :               
                draft.unfollowLoading = true;
                draft.unfollowError = null;
                draft.unfollowDone = false;                
                break;
            
            case UNFOLLOW_SUCCESS : 
                draft.unfollowLoading = false;
                draft.unfollowDone = true;
                draft.me.Followings = draft.me.Followings.filter((v)=>v.id !== action.data.followingId)
                break;
            
            case UNFOLLOW_FAILURE : 
                draft.unfollowLoading = false
                draft.unfollowError= action.error;
                break;

            case LOAD_FOLLOWERS_REQUEST :               
                draft.loadFollowersLoading = true;
                draft.loadFollowersError = null;
                draft.loadFollowersDone = false;
                break;
            
            case LOAD_FOLLOWERS_SUCCESS : 
                
                draft.loadFollowersLoading = false;
                draft.loadFollowersDone = true;
                draft.me.Followers = action.data.followers
                break;
            
            case LOAD_FOLLOWERS_FAILURE : 
                draft.loadFollowersLoading = false
                draft.loadFollowersError= action.error;
                break;
            
            case LOAD_FOLLOWINGS_REQUEST :               
                draft.loadFollowingsLoading = true;
                draft.loadFollowingsError = null;
                draft.loadFollowingsDone = false;
                break;
            
            case LOAD_FOLLOWINGS_SUCCESS :                 
                draft.loadFollowingsLoading = false;
                draft.loadFollowingsDone = true;
                draft.me.Followings = action.data.followings
                break;
            
            case LOAD_FOLLOWINGS_FAILURE : 
                draft.loadFollowingsLoading = false
                draft.loadFollowingsError= action.error;
                break;

            case REMOVE_FOLLOWER_REQUEST :               
                draft.removeFollowerLoading = true;
                draft.removeFollowerError = null;
                draft.removeFollowerDone = false;
                break;
            
            case REMOVE_FOLLOWER_SUCCESS :                 
                draft.removeFollowerLoading = false;
                draft.removeFollowerDone = true;
                draft.me.Followers = draft.me.Followers.filter((v)=>v.id!== action.data.UserId)
                break;
            
            case REMOVE_FOLLOWER_FAILURE : 
                draft.removeFollowerLoading = false
                draft.removeFollowerError= action.error;
                break;

            default:
                return state;
        }
    })
}

export default reducer;