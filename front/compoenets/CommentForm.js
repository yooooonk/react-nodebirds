import {Button, Form, Input} from "antd"
import { useCallback } from "react";
import useInput from "../hooks/useInput";
import PropTypes from 'prop-types'
import { useSelector } from "react-redux";

const CommentForm = ({post}) =>{
    const id = useSelector((state)=>state.user.me?.id)
    const [commentText, onChangeCommnetText] = useInput('')

    const onSubmitComment = useCallback(()=>{
        console.log(post.id, commentText)
    },[commentText])
    return(
        <Form onFinish={onSubmitComment}>
            <Form.Item style={{position:'relative', margin:0}}>
                <Input.TextArea value={commentText} 
                                onChange={onChangeCommnetText} 
                                rows={4} />
                <Button style={{position:"absolute", right:0, top:100 }} type="primary" htmlType="submit">삐약</Button>
            </Form.Item>
        </Form>        
      
    )
}

CommentForm.PropTypes = {
    post : PropTypes.object.isRequired
}

export default CommentForm;