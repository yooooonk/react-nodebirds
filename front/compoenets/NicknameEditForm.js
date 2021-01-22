import {Form, Input} from 'antd'
import { useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useInput from '../hooks/useInput';
import { CHANGE_NICKNAME_REQUEST } from '../reducers/user';

const NicknameEditForm = ()=>{
    const {me, changeNicknameDone} = useSelector((state)=>state.user);
    const [nickname, onChangeNickname, setNickname] = useInput(me?.nickname||'')
    const dispatch = useDispatch();
    
    useEffect(()=>{
        if(changeNicknameDone){
            setNickname('')
        }
    })

    const style=useMemo(()=>{
        marginBottom:'20px'
    })

   const onSubmit = useCallback(()=>{       
       dispatch({
          type:CHANGE_NICKNAME_REQUEST,
          data:nickname
      })  
   })

   
    return(
        <Form 
            style={style}            
        >
            <Input.Search 
                addonBefore='닉네임' 
                enterButton='수정'
                value={nickname} 
                onChange={onChangeNickname} 
                onSearch={onSubmit} />
        </Form>
    
    )
}

export default NicknameEditForm;