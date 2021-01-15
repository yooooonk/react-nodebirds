import shortid from 'shortid'
import produce from 'immer'

export const initialState = {
    mainPosts:[{
        id:'asdf',
        User:{
            id:1,
            nickname:'김뿡'
        },
        content : '첫 번재 게시글 #해시태그 #익스프레스',
        Images:[
            {src:'https://rereco.co/wp-content/uploads/2019/01/gyochon_menu2.jpg'},
            {src:'https://img.insight.co.kr/static/2020/01/24/700/532r7519e8lsf59g87h9.jpg'},
            {src:'https://www.kyochon.com/uploadFiles/TB_ITEM/%EB%A0%88%ED%97%88.png'}
        ],
        Comments: [{
            User: {
              nickname: 'nero',
            },
            content: '우와 개정판이 나왔군요~',
          }, {
            User: {
              nickname: 'hero',
            },
            content: '얼른 사고싶어요~',
          }]
    }],
    imagePaths:[],
    addPostLoading:false,
    addPostDone:false,
    addPostError:null,
    removePostLoading:false,
    removePostDone:false,
    removePostError:null,
    addCommentLoading:false,
    addCommentDone:false,
    addCommentError:null
    
}

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
        case ADD_POST_REQUEST :
            draft.addPostLoading=true,
            draft.addPostDone=false;
            draft.addPostError=null;
          break;
          
        case ADD_POST_SUCCESS :
            draft.mainPosts.unshift(dummyPost(action.data))
            draft.addPostLoading = false;
            draft.addPostDone = true;
            break;
        
        case ADD_POST_FAILURE :
            draft.addPostLoading = false;
            draft.addPostError = action.error                
            break;
        
        case REMOVE_POST_REQUEST :
            draft.removePostLoading=true,
            draft.removePostDone=false,
            draft.removePostError=false
            break;            
        
        case REMOVE_POST_SUCCESS :          
            draft.mainPosts = draft.mainPosts.filter((v)=>v.id !== action.data);
            draft.removePostLoading=false;
            draft.removePostDone=true;
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
            
            const post = draft.mainPosts.find((v)=>v.id === action.data.postId)
            post.Comments.unshift(dummyComment(action.data.content))
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