import shortid from 'shortid'
import produce from 'immer'
import faker from 'faker'


export const initialState = {
    mainPosts:[],
    imagePaths:[],
    loadPostLoading:false,
    loadPostDone:false,
    loadPostError:null,
    hasMorePost:true,
    addPostLoading:false,
    addPostDone:false,
    addPostError:null,
    removePostLoading:false,
    removePostDone:false,
    removePostError:null,
    addCommentLoading:false,
    addCommentDone:false,
    addCommentError:null,
    likePostLoading:false,
    likePostDone:false,
    likePostError:null,
    unlikePostLoading:false,
    unlikePostDone:false,
    unlikePostError:null,
    
}
export const generateDummyPost = (number)=>Array(number).fill().map(()=>({
  id:shortid.generate(),
  User:{
    id:shortid.generate(),
    nickname:faker.name.findName()
  },
  content:faker.lorem.paragraph(),
  Images:[{
    src:faker.image.image()
  }],
  Comments:[{
    User:{
      id:shortid.generate(),
      nickname:faker.name.findName()
    },
    content:faker.lorem.sentence()
  }]
}));


const dummyPost = (data)=>{
  
  return {    
    id:data.id,
    content: data.content,
    User: {
      id: 1,
      nickname: '제로초',
    },
    Images: [],
    Comments: [],
}
} 
  

const dummyComment = (data)=>({
  id:shortid.generate(),
  content:data,
  User:{
    id:'asdf',
    nickname:'haha'
  }
})

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';
  
export const addPostRequest =(data)=>({
      type:ADD_POST_REQUEST,
      data
})

export const removePostRequest =(data)=>({
  type:REMOVE_POST_REQUEST,
  data
})

export const addCommentRequest =(data)=>({
  type:ADD_COMMENT_REQUEST,
  data
})

const reducer = (state=initialState,action)=>{
    return produce(state,(draft)=>{
      switch (action.type) {
        case LIKE_POST_REQUEST :
          draft.likePostLoading=true,
          draft.likePostDone=false;
          draft.likePostError=null;
        break;
        
        case LIKE_POST_SUCCESS :    
            const likePost = draft.mainPosts.find((v)=> v.id === action.data.PostId)                    
            likePost.Likers.push({id:action.data.UserId})
            draft.likePostLoading = false;
            draft.likePostDone = true;
            break;
        
        case LIKE_POST_FAILURE :
            draft.likePostLoading = false;
            draft.likePostError = action.error                
            break;
        
        case UNLIKE_POST_REQUEST :
          draft.unlikePostLoading=true,
          draft.unlikePostDone=false;
          draft.unlikePostError=null;
        break;
            
        case UNLIKE_POST_SUCCESS :  
            const unlikePost = draft.mainPosts.find((v)=> v.id === action.data.PostId)                    
            unlikePost.Likers = unlikePost.Likers.filter((v)=>v.id !== action.data.UserId)
            
            draft.unlikePostLoading = false;
            draft.unlikePostDone = true;
            break;
        
        case UNLIKE_POST_FAILURE :
            draft.unlikePostLoading = false;
            draft.unlikePostError = action.error                
            break;

        case ADD_POST_REQUEST :
            draft.addPostLoading=true,
            draft.addPostDone=false;
            draft.addPostError=null;
          break;
          
        case ADD_POST_SUCCESS :
            
            draft.mainPosts.unshift(action.data)
            draft.addPostLoading = false;
            draft.addPostDone = true;
            break;
        
        case ADD_POST_FAILURE :
            draft.addPostLoading = false;
            draft.addPostError = action.error                
            break;
        
        case LOAD_POST_REQUEST :
              draft.loadPostLoading=true,
              draft.loadPostDone=false;
              draft.loadPostError=null;
            break;
            
        case LOAD_POST_SUCCESS :
              draft.mainPosts = draft.mainPosts.concat(action.data)
              draft.hasMorePost = draft.mainPosts.length <50;
              draft.loadPostLoading = false;
              draft.loadPostDone = true;
              break;
          
        case LOAD_POST_FAILURE :
              draft.loadPostLoading = false;
              draft.loadPostError = action.error                
              break;

        case REMOVE_POST_REQUEST :
            draft.removePostLoading=true,
            draft.removePostDone=false,
            draft.removePostError=false
            break;            
        
        case REMOVE_POST_SUCCESS :                  
            draft.removePostLoading=false;
            draft.removePostDone=true;
            draft.mainPosts = draft.mainPosts.filter((v)=>v.id !== action.data.PostId);
            break;                   
        
        case REMOVE_POST_FAILURE :
            draft.removePostLoading=false;
            draft.removePostError = action.error       
            break;
        
        case ADD_COMMENT_REQUEST :
            draft.addCommentLoading=true;
            draft.addCommentDone=false;
            draft.addCommentError=false;
            break;
        
        case ADD_COMMENT_SUCCESS :
            draft.addCommentLoading = false;
            draft.addCommentDone = true;
            
            const post = draft.mainPosts.find((v)=>v.id === action.data.PostId)
            post.Comments.unshift(action.data)
            break;
        
        case ADD_COMMENT_FAILURE :
            draft.addCommentLoading=false,
            draft.addCommentError=action.error                
            break;
        default:
            return state;
        }
    })
 

}

export default reducer;