import { Button, Card, Comment, Popover, List } from "antd"
import {RetweetOutlined, HeartOutlined,MessageOutlined, EllipsisOutlined, HeartTwoTone} from '@ant-design/icons'
import propTypes from 'prop-types'
import { useDispatch, useSelector } from "react-redux"
import Avatar from "antd/lib/avatar/avatar"
import PostImages from "./PostImages"
import { useCallback, useEffect, useState } from "react"
import CommentForm from "./CommentForm"
import PostCardContent from "./PostCardContent"
import { LIKE_POST_REQUEST, removePostRequest, RETWEET_REQUEST, UNLIKE_POST_REQUEST } from "../reducers/post"
import FollowButton from "./FollowButton"

 

const PostCard = ({post})=>{
    const dispatch = useDispatch()
    const id = useSelector((state)=>state.user.me?.id)
    const {removePostLoading, likePostError, unlikePostError, retweetError} = useSelector((state)=>state.post)    
    const [commentFormOpened, setCommnetFormOpened] = useState(false);
    const liked = post.Likers.find((v)=> v.id === id);

    

    const onLike = useCallback(()=>{
        dispatch({
            type:LIKE_POST_REQUEST,
            data:post.id
        })
    },[])
    
    const onUnlike = useCallback(()=>{
        dispatch({
            type:UNLIKE_POST_REQUEST,
            data:post.id
        })
    })
    
    const onToggleComment = useCallback(()=>{
        setCommnetFormOpened((prev)=>!prev);   
    },[])

    const onRemoePost = useCallback(()=>{
        dispatch(removePostRequest(post.id))
    },[post.id])

    const onRetweet = useCallback(()=>{
        if(!id){
            return alert('로그인이 필요합니다')            
        }

        return dispatch({
            type: RETWEET_REQUEST,
            data:post.id
        })
    },[id])

    return (
        <div>
            <Card
                cover={post.Images[0] && <PostImages images={post.Images}/>}
                actions={[
                    <RetweetOutlined key="retweet" onClick={onRetweet}/>,
                    liked
                     ? <HeartTwoTone twoToneColor="#eb2f96" key="heartTwo" onClick={onUnlike}/>
                    : <HeartOutlined key="heart" onClick={onLike}/>,
                    <MessageOutlined key="comment" onClick={onToggleComment}/>,
                    <Popover key="more" 
                            content={(<Button.Group>
                                        {id && post.User.id === id ? (
                                            <> 
                                                <Button>수정</Button> 
                                                <Button type="danger" loading={removePostLoading} onClick={onRemoePost}>삭제</Button>
                                            </>
                                            ) : <Button>신고</Button>}
                                    </Button.Group>)}>
                        <EllipsisOutlined />
                    </Popover>
                ]}
                title={post.RetweetId ? `${post.User.nickname}님이 리트윗하셨습니다.` : null}
                extra={(id && id !== post.UserId ) && <FollowButton post={post} />}
            >
                {post.RetweetId && post.Retweet
          ? (
            <Card
              cover={post.Retweet.Images[0] && <PostImages images={post.Retweet.Images} />}
            >
              <Card.Meta
                avatar={<Avatar>{post.Retweet.User.nickname[0]}</Avatar>}
                title={post.Retweet.User.nickname}
                description={<PostCardContent postData={post.Retweet.content} />}
              />
            </Card>
          )
          : (
            <Card.Meta
              avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
              title={post.User.nickname}
              description={<PostCardContent postData={post.content} />}
            />
          )}              
            </Card>
            {commentFormOpened &&(
                <div>
                    <CommentForm post={post}/>
                    <List
                        header={`${post.Comments.length}개의 댓글`} 
                        itemLayout="horizontal"    
                        dataSource={post.Comments}
                        renderItem={(item)=>(
                            <li>
                                <Comment 
                                    author={item.User.nickname}
                                    avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                                    content={item.content}
                                />
                            </li>
                        )}
                    />
                        
                </div>    
            )}
            
        </div>
    )
}

PostCard.propTypes = {
    post : propTypes.shape({
        id:propTypes.number,
        User:propTypes.object,
        content : propTypes.string,
        createdAt:propTypes.string,
        Comments:propTypes.arrayOf(propTypes.object),
        Images:propTypes.arrayOf(propTypes.object),
        Likers:propTypes.arrayOf(propTypes.object),
        RetweetId: propTypes.number,
        Retweet: propTypes.objectOf(propTypes.any),
    }).isRequired
}

export default PostCard