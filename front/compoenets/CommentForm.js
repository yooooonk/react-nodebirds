import {Button, Form, Input} from "antd"
import { useCallback, useEffect } from "react";
import useInput from "../hooks/useInput";
import propTypes from 'prop-types'
import { useDispatch, useSelector } from "react-redux";
import { addCommentRequest } from "../reducers/post";

const CommentForm = ({post}) =>{
    const dispatch = useDispatch()
    const id = useSelector((state)=>state.user.me?.id)
    const {addCommentDone, addCommentLoading} = useSelector((state)=>state.post);
    const [commentText, onChangeCommnetText, setCommentText] = useInput('')

    const onSubmitComment = useCallback(()=>{        
        dispatch(addCommentRequest({content:commentText,postId:post.id, userId:id}))        
    },[commentText,id])

    useEffect(()=>{
        if(addCommentDone){
            setCommentText('')
        }
    },[addCommentDone])
    return(
        <Form onFinish={onSubmitComment}>
            <Form.Item style={{position:'relative', margin:0}}>
                <Input.TextArea value={commentText} 
                                onChange={onChangeCommnetText} 
                                rows={4} />                
                <Button type="primary" style={{float:'right'}} htmlType="submit" loading={addCommentLoading} >삐약</Button>
            </Form.Item>
        </Form>        
      
    )
}

CommentForm.propTypes = {
    post : propTypes.object.isRequired
}

export default CommentForm;