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
    me:null,
    signUpData:{},
    loginData:{}
}

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST'
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS'
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE'

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST'
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS'
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE'

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST'
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE'

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST'
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS'
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE'

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST'
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS'
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE'

const dummyUser = (data)=>({
    ...data,
    nickname:'yoonk',
    id:1,
    Posts:[],
    Followers:[]
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
    switch (action.type) {
        case LOG_IN_REQUEST :            
            return {                                         
                    ...state,
                    loginLoading : true,
                    loginError:null,
                    loginDone:false
                
        };
        case LOG_IN_SUCCESS : 
                return {
                    ...state,
                    loginLoading:false,
                    loginDone : true,
                    me : dummyUser(action.data)
        };      
        case LOG_IN_FAILURE : 
                return {
                    ...state,
                    loginLoading : false,
                    loginError:action.error                    
        };     
        case LOG_OUT_REQUEST :
            return {                                         
                    ...state,
                    logoutLoading : true,
                    logoutDone:false,
                    logoutError:null
        };
        case LOG_OUT_SUCCESS : 
                return {
                    ...state,
                    logoutLoading : false,
                    logoutDone : false,  
                    loginDone:false,
                    me : null
        };      
        case LOG_OUT_FAILURE : 
                return {
                    ...state,                    
                    logoutLoading : false,
                    loginError:action.error
        };     
        case SIGN_UP_REQUEST :
            return {                                         
                    ...state,
                    logoutLoading : true,
                    logoutDone:false,
                    logoutError:null
        };
        case SIGN_UP_SUCCESS : 
                return {
                    ...state,
                    logoutLoading : false,
                    logoutDone : false,  
                    loginDone:false,
                    me : null
        };      
        case SIGN_UP_FAILURE : 
                return {
                    ...state,                    
                    logoutLoading : false,
                    loginError:action.error
        };  
        default:
            return state;
    }

}

export default reducer;