import {Button, Card} from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import mitt from 'next/dist/next-server/lib/mitt';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequestAction } from '../reducers/user';

const UserProfile = ({setIsLoggedIn})=>{
    const {me, logoutLoading} = useSelector((state)=>state.user)
    const dispatch = useDispatch();
    
    const onLogout = useCallback(()=>{
        dispatch(logoutRequestAction())
    },[])
    return (
        <Card
            actions={[
                <div key="twit">짹짹<br/>0</div>,
                <div key="followings">팔로잉<br/>{me.Followings.length}</div>,
                <div key="followers">팔로워<br/>{me.Followers.length}</div>
                
            ]}
        >        
            <Card.Meta
                avatar={<Avatar>{me.nickname[0]}</Avatar>}
                title={me.nickname}
            />
            <Button onClick={onLogout} loading={logoutLoading}>로그아웃</Button>
        </Card>
    )
}

export default UserProfile;