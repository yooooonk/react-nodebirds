import AppLayout from "../compoenets/AppLayout";
import NicknameEditForm from "../compoenets/NicknameEditForm";
import FollowList from "../compoenets/FollowList";
import router from 'next/router';
import {  useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import useSWR from 'swr';
import axios from 'axios'

const fetcher = (url) => axios.get(url, { withCredentials: true }).then((result) => result.data);

const Profile = ()=>{    
    const {me} = useSelector((state)=>state.user);
    const [followersLimit, setFollowersLimit] = useState(3);
    const [followingsLimit, setFollowingsLimit] = useState(3);

    const { data: followingsData, error: followingError } = useSWR(`http://localhost:3065/user/followings?limit=${followersLimit}`, fetcher);
    const { data: followersData, error: followerError } = useSWR(`http://localhost:3065/user/followers?limit=${followingsLimit}`, fetcher);
    
console.log(followingsData)

    useEffect(()=>{
        if(!(me&&me.id)){
            router.push('/')
        }
    },[me && me.id])

    const leadMoreFollowings = useCallback(()=>{
        
        setFollowingsLimit((prev)=>prev+3); 
    },[])

    const leadMoreFollowers = useCallback(()=>{
        setFollowersLimit((prev)=>prev+3); 
    },[])

    if(followerError ||followingError){
        console.error(followerError||followingError);
        return <div>팔로잉/팔로워 로딩 중 에러가 발생합니다</div>
    }

    if(!me){
        return null;
    }

    
    

    return(
       <AppLayout>
                <NicknameEditForm />
                <FollowList header="팔로잉" data={followingsData.followings} onClickMore={leadMoreFollowings} loading={!followingsData && !followingsError} />
                <FollowList header="팔로워" data={followersData.followers} onClickMore={leadMoreFollowers} loading={!followersData && !followersError} />
       </AppLayout>
       
    
    )
}

export default Profile;