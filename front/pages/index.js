/* eslint-disable react/react-in-jsx-scope */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../compoenets/AppLayout";
import PostCard from "../compoenets/PostCard";
import Postform from "../compoenets/PostForm";
import { LOAD_POSTS_REQUEST } from "../reducers/post";
import { LOAD_USER_REQUEST } from "../reducers/user";
import wrapper from "../store/configureStore";
import {END} from 'redux-saga';
import axios from 'axios'

const Home = ()=>{
    const dispatch = useDispatch();
    const { me } = useSelector(state=>state.user);
    const {mainPosts, hasMorePost, loadPostLoading,retweetError} = useSelector(state=>state.post);

    useEffect(()=>{
        if(retweetError){
            alert(retweetError)
        }
    },[retweetError])
    
    useEffect(()=>{
        function onScroll(){
            
            if(window.scrollY+document.documentElement.clientHeight > document.documentElement.scrollHeight-300){
                
                if(hasMorePost && !loadPostLoading){
                    const lastId = mainPosts[mainPosts.length-1]?.id;
                    
                    dispatch({
                        type:LOAD_POSTS_REQUEST,
                        lastId
                    })
                }
            }            
        }
        
        window.addEventListener('scroll',onScroll)
        return()=>{
            window.removeEventListener('scroll',onScroll)
        }
    },[hasMorePost,loadPostLoading,mainPosts])
    
    return(
        <AppLayout>
            {me && <Postform />}
            {mainPosts.map((post,index)=> { return <PostCard key={post.id} post={post} />}) }
        </AppLayout>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(async (context)=>{
    
    const cookie = context.req? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if(context.req && cookie){
        axios.defaults.headers.Cookie = cookie;
    }

    context.store.dispatch({        
        type:LOAD_USER_REQUEST               
    }); 

    context.store.dispatch({
        type:LOAD_POSTS_REQUEST
    });

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise()
})

export default Home;