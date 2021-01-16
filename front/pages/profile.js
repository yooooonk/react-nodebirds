import AppLayout from "../compoenets/AppLayout";
import NicknameEditForm from "../compoenets/NicknameEditForm";
import FollowList from "../compoenets/FollowList";
import FollowingList from "../compoenets/FollowingList";
import router from 'next/router';
import Head from 'next/head'
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Profile = ()=>{    
    const {me} = useSelector((state)=>state.user);
    
    useEffect(()=>{
        if(!(me&&me.id)){
            router.push('/')
        }
    },[me && me.id])

    if(!me){
        return null;
    }

    return(
       <AppLayout>
                <NicknameEditForm />
                <FollowingList header="팔로잉 목록" data={me.Followings} />
                <FollowList header="팔로워 목록" data={me.Followers} />
       </AppLayout>
       
    
    )
}

export default Profile;