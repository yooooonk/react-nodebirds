/* eslint-disable react/react-in-jsx-scope */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../compoenets/AppLayout";
import PostCard from "../compoenets/PostCard";
import Postform from "../compoenets/PostForm";
import { LOAD_POST_REQUEST } from "../reducers/post";
import { LOAD_USER_REQUEST } from "../reducers/user";

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
        dispatch({
            type:LOAD_USER_REQUEST
        }) 
       dispatch({
            type:LOAD_POST_REQUEST
            
        }) 
    },[])

    useEffect(()=>{
        function onScroll(){
            
            if(window.scrollY+document.documentElement.clientHeight > document.documentElement.scrollHeight-300){
                
                if(hasMorePost && !loadPostLoading){
                    const lastId = mainPosts[mainPosts.length-1]?.id;
                    
                    dispatch({
                        type:LOAD_POST_REQUEST,
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

export default Home;