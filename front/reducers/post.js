export const initialState = {
    mainPosts:[{
        id:1,
        User:{
            id:1,
            nickname:'user1'
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
    postAdded:false
}

const ADD_POST = 'ADD_POST';
export const addPost ={
    type:ADD_POST,
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

const reducer = (state=initialState,action)=>{
    switch (action.type) {
        case ADD_POST :
            return {
                ...state,
                mainPosts : [dummyPost,...state.mainPosts],
                postAdded:true
            }
        default:
            return state;
    }

}

export default reducer;