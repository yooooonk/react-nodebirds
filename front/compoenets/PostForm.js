import { Form, Input, Button } from 'antd'
import { useCallback,useSelector } from 'react';
import useInput from '../hooks/useInput';

const Postform = ()=>{
    const {imagePaths} = useSelector((state)=>state.post)
    const [text,onChange] = useInput('')
    const onSubmit = useCallback(()=>{

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
                <input type="file" multiple hidden />
                <Button>이미지업로드</Button>
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