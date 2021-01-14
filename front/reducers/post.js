export const initialState = {
    mainPosts:[{
        id:1,
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
    addPostError:null
    
}

const dummyPost = {
    id: 2,
    content: '더미데이터입니다.',
    User: {
      id: 1,
      nickname: '제로초',
    },
    Images: [],
    Comments: [],
  };

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';
  
export const addPost =(data)=>({
      type:ADD_POST_REQUEST,
      data
})

export const addComment =(data)=>({
    type:ADD_COMMENT_REQUEST,
    data
})


const reducer = (state=initialState,action)=>{
    switch (action.type) {
        case ADD_POST_REQUEST :
          return {
            ...state,
            addPostLoading:true,
            addPostDone:false,
            addPostError:false
          }
        case ADD_POST_SUCCESS :
            return {
                ...state,
                mainPosts : [dummyPost,...state.mainPosts],
                addPostLoading:false,
                addPostDone:true                
        }
        case ADD_POST_FAILURE :
            return {
                ...state,                
                addPostLoading:false,
                addPostError:action.error                
        }
        case ADD_COMMENT_REQUEST :
          return {
            ...state,
            addCommentLoading:true,
            addCommentDone:false,
            addCommentError:false
          }
        case ADD_COMMENT_SUCCESS :
            return {
                ...state,                
                addCommentLoading:false,
                addCommentDone:true                
        }
        case ADD_COMMENT_FAILURE :
            return {
                ...state,                
                addCommentLoading:false,
                addCommentError:action.error                
        }
        default:
            return state;
    }

}

export default reducer;