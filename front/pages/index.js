/* eslint-disable react/react-in-jsx-scope */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../compoenets/AppLayout";
import PostCard from "../compoenets/PostCard";
import Postform from "../compoenets/PostForm";
import { LOAD_POST_REQUEST } from "../reducers/post";

const Home = ()=>{
    const dispatch = useDispatch();
    const { me } = useSelector(state=>state.user);
    const {mainPosts, hasMorePost, loadPostLoading} = useSelector(state=>state.post);

    useEffect(()=>{
        dispatch({
            type:LOAD_POST_REQUEST
        })
    },[])

    useEffect(()=>{
        function onScroll(){
            
            if(window.scrollY+document.documentElement.clientHeight > document.documentElement.scrollHeight-300){
                
                if(hasMorePost && !loadPostLoading){
                    dispatch({
                        type:LOAD_POST_REQUEST
                    })
                }
            }            
        }
        
        window.addEventListener('scroll',onScroll)
        return()=>{
            window.removeEventListener('scroll',onScroll)
        }
    },[hasMorePost,loadPostLoading])
    
    return(
        <AppLayout>
            {me && <Postform />}
            {mainPosts.map((post,index)=> { return <PostCard key={post.id} post={post} />}) }
        </AppLayout>
    )
}

export default Home;