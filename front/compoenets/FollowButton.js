import propTypes from 'prop-types'
import {Button} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../reducers/user';

const FollowButton = ({post})=>{
    const dispatch = useDispatch()
    const {me,followLoading, unfollowLoading} = useSelector((state)=>state.user);
    const isFollowing =  me?.Followings.find((v)=>v.id === post.User.id)
    const onFollow = useCallback(()=>{
        
        if(isFollowing){
            dispatch({
                type:UNFOLLOW_REQUEST,
                data:post.User.id
            })
        }else{
            dispatch({
                type:FOLLOW_REQUEST,
                data:post.User.id
            })
        }

    },[isFollowing])
    return (
        <Button onClick={onFollow} loading={followLoading||unfollowLoading}>
            {isFollowing? '언팔로우':'팔로우'}
        </Button>
    )

}

FollowButton.propTypes = {
    post: propTypes.object.isRequired
};

export default FollowButton