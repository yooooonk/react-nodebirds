import AppLayout from "../compoenets/AppLayout";
import NicknameEditForm from "../compoenets/NicknameEditForm";
import FollowList from "../compoenets/FollowList";
import FollowingList from "../compoenets/FollowingList";
import Head from 'next/head'

const Profile = ()=>{
    const followerList = [{nickname:'서은광'},  {nickname:'이창섭'},{nickname:'이민혁'}]
    const followingList = [{nickname:'임현식'},  {nickname:'프니엘'},{nickname:'육성재'}]
    return(
       <AppLayout>
                <NicknameEditForm />
                <FollowList header="팔로워 목록" data={followerList} />
                <FollowingList header="팔로잉 목록" data={followingList} />
       </AppLayout>
       
    
    )
}

export default Profile;