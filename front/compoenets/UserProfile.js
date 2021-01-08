import {Button, Card} from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import { useCallback } from 'react';

const UserProfile = ({setIsLoggedIn})=>{
    const onLogout = useCallback(()=>{
        setIsLoggedIn(false)
    },[])
    return (
        <Card
            actions={[
                <div key="twit">짹짹<br/>0</div>,
                <div key="followings">팔로잉<br/>0</div>,
                <div key="followers">팔로워<br/>0</div>
                
            ]}
        >        
            <Card.Meta
                avatar={<Avatar>ZC</Avatar>}
                title="hey"
            />
            <Button onClick={onLogout}>로그아웃</Button>
        </Card>
    )
}

export default UserProfile;