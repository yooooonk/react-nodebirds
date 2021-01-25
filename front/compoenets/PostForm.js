import { Form, Input, Button } from 'antd'
import { useCallback, useEffect, useRef,useState } from 'react';
import { useSelector,useDispatch } from "react-redux";
import useInput from '../hooks/useInput';
import { addPostRequest, ADD_POST_REQUEST, REMOVE_IMAGE, UPLOAD_IMAGES_REQUEST } from '../reducers/post';

const Postform = ()=>{
    const dispatch = useDispatch()

    const {imagePaths,addPostDone,addPostLoading} = useSelector((state)=> state.post)
    const imageInput = useRef()
    const [text, onChangeText,setText] = useInput('')
 
    const onClickImageUpload = useCallback(()=>{
        imageInput.current.click()
    },[imageInput.current])

    const onChangeImages = useCallback((e)=>{
        console.log('images',e.target.files);
        const imageFormData = new FormData();
        [].forEach.call(e.target.files,(f)=>{
            imageFormData.append('image',f);
        })

        dispatch({
            type:UPLOAD_IMAGES_REQUEST,
            data:imageFormData
        })
    })
    
    const onSubmit = useCallback(()=>{
        if (!text || !text.trim()) {
            return alert('게시글을 작성하세요.');
        }
        
        const formData = new FormData();
        
        imagePaths.forEach((p)=>{  
            console.log(p)          
            formData.append('image', p);            
        })
        
        formData.append('content', text);
        
        dispatch({
            type:ADD_POST_REQUEST,
            data: formData
        })        
    },[text,imagePaths])

    useEffect(()=>{
        if(addPostDone){
            setText('')
        }
    },[addPostDone])

    const onRemoveImage = useCallback((idx)=> ()=>{
        dispatch({
            type:REMOVE_IMAGE,
            data:idx
        })
    })

    return (
        <Form style={{margin:'10px 0 20px'}} encType="multipart/form-data" onFinish={onSubmit}>
            <Input.TextArea 
                value={text} 
                onChange={onChangeText} 
                maxLength={140}
                placeholder="어떤 신기한 일이 있었나요?" 
            />
            <div>
                <input type="file" name="image"  multiple hidden ref={imageInput} onChange={onChangeImages}/>
                <Button onClick={onClickImageUpload}>이미지업로드</Button>
                <Button type="primary" style={{float:'right'}} htmlType="submit" loading={addPostLoading}>짹짹</Button>
            </div>
            <div>
                {imagePaths.map((v,idx)=>(
                    <div key={v} style={{display:'inline-block'}}>
                        <img src={`http://localhost:3065/${v}`} style={{width:'200px'}} alt={v} />
                        <div>
                            <Button onClick={onRemoveImage(idx)}>제거</Button>
                        </div>
                    </div>
                ))}
            </div>
        </Form>
    )
}

export default Postform;