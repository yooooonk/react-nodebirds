import { Button, Card, Popover } from "antd"
import {RetweetOutlined, HeartOutlined,MessageOutlined, EllipsisOutlined, HeartTwoTone} from '@ant-design/icons'
import propTypes from 'prop-types'
import { useSelector } from "react-redux"
import Avatar from "antd/lib/avatar/avatar"
import PostImages from "./PostImages"
import { useCallback, useState } from "react"

 

const PostCard = ({post})=>{
    const id = useSelector((state)=>state.user.me?.id)
    const [liked, setLiked] = useState(false);
    const [commentFormOpened, setCommnetFormOpened] = useState(false);
    
    const onToggleLike = useCallback(()=>{
        setLiked((prev)=>!prev)
    },[])
    const onToggleComment = useCallback(()=>{
        setCommnetFormOpened((prev)=>!prev);
    },[])
    return (
        <div>
            <Card
                cover={post.Images[0] && <PostImages images={post.Images}/>}
                actions={[
                    <RetweetOutlined key="retweet"/>,
                    liked
                     ? <HeartTwoTone twoToneColor="#eb2f96" key="heartTwo" onClick={onToggleLike}/>
                    : <HeartOutlined key="heart" onClick={onToggleLike}/>,
                    <MessageOutlined key="comment" onClick={onToggleComment}/>,
                    <Popover key="more" 
                            content={(<Button.Group>
                                        {id && post.User.id === id ? (
                                            <> 
                                                <Button>수정</Button> 
                                                <Button type="danger">삭제</Button>
                                            </>
                                            ) : <Button>신고</Button>}
                                    </Button.Group>)}>
                        <EllipsisOutlined />
                    </Popover>
                ]}
            >
                <Card.Meta
                    avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                    title={post.User.nickname}
                    description={post.content}
                />                
            </Card>
            {commentFormOpened &&(
                <div>
                    댓글부분
                </div>    
            )}
            {/* <CommentForm />
            <Comments /> */}
        </div>
    )
}

PostCard.propTypes = {
    post : propTypes.shape({
        id:propTypes.number,
        User:propTypes.object,
        content : propTypes.string,
        createdAt:propTypes.object,
        Comments:propTypes.arrayOf(propTypes.object),
        Images:propTypes.arrayOf(propTypes.object),
    }).isRequired
}

export default PostCard