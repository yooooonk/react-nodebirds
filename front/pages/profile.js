import AppLayout from "../compoenets/AppLayout";
import NicknameEditForm from "../compoenets/NicknameEditForm";
import FollowList from "../compoenets/FollowList";
import FollowingList from "../compoenets/FollowingList";
import Head from 'next/head'
import { useSelector } from "react-redux";

const Profile = ()=>{
    const {me} = useSelector((state)=>state.user);
    return(
       <AppLayout>
                <NicknameEditForm />
                <FollowingList header="팔로잉 목록" data={me.Followings} />
                <FollowList header="팔로워 목록" data={me.Followers} />
       </AppLayout>
       
    
    )
}

export default Profile;