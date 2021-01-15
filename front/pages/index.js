/* eslint-disable react/react-in-jsx-scope */
import { useSelector } from "react-redux";
import AppLayout from "../compoenets/AppLayout";
import PostCard from "../compoenets/PostCard";
import Postform from "../compoenets/PostForm";

const Home = ()=>{
    const { me } = useSelector(state=>state.user);
    const {mainPosts} = useSelector(state=>state.post);
    return(
        <AppLayout>
            {me && <Postform />}
            {mainPosts.map((post,index)=> { return <PostCard key={post.id} post={post} />}) }
        </AppLayout>
    )
}

export default Home;