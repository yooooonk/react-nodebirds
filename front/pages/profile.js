import AppLayout from "../compoenets/AppLayout";
import NicknameEditForm from "../compoenets/NicknameEditForm";
import FollowList from "../compoenets/FollowList";
import FollowingList from "../compoenets/FollowingList";
import router from 'next/router';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST} from '../reducers/user'

const Profile = ()=>{    
    const {me} = useSelector((state)=>state.user);
    const dispatch = useDispatch();

   /* useEffect(()=>{
        dispatch({
            type:LOAD_FOLLOWERS_REQUEST
        })

        dispatch({
            type:LOAD_FOLLOWINGS_REQUEST
        })
    })  */

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