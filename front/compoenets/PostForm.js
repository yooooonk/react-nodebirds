import { Form, Input, Button } from 'antd'
import { useCallback, useRef,useState } from 'react';
import { useSelector,useDispatch } from "react-redux";
import useInput from '../hooks/useInput';
import { addPost } from '../reducers/post';

const Postform = ()=>{
    const dispatch = useDispatch()
    const {imagePaths} = useSelector((state)=> state.post)
    const imageInput = useRef()
    const [text,setText] = useState('')

    const onChangeText = useCallback((e)=>{
        setText(e.target.value)
    })
    
    const onClickImageUpload = useCallback(()=>{
        imageInput.current.click()
    },[imageInput.current])
    
    const onSubmit = useCallback(()=>{
        dispatch(addPost)
        setText('')
    },[])
    return (
        <Form style={{margin:'10px 0 20px'}} encType="multipart/form-data" onFinish={onSubmit}>
            <Input.TextArea 
                value={text} 
                onChange={onChangeText} 
                maxLength={140}
                placeholder="어떤 신기한 일이 있었나요?" 
            />
            <div>
                <input type="file" multiple hidden ref={imageInput}/>
                <Button onClick={onClickImageUpload}>이미지업로드</Button>
                <Button type="primary" style={{float:'right'}} htmlType="submit">짹짹</Button>
            </div>
            <div>
                {imagePaths.map((v)=>(
                    <div key={v} style={{display:'inline-block'}}>
                        <img src={v} style={{width:'200px'}} alt={v} />
                        <div>
                            <Button>젝</Button>
                        </div>
                    </div>
                ))}
            </div>
        </Form>
    )
}

export default Postform;