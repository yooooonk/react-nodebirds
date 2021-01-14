import {Button, Form, Input} from 'antd';
import Link from 'next/link';
import { useState, useCallback, useMemo } from 'react';
import useInput from '../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequestAction} from '../reducers/user'

const LoginForm = ({setIsLoggedIn}) => {
    /*css*/
    const style = useMemo(()=>({
        marginTop:10
    }),[])

    const formStytle = useMemo(()=>({        
        padding:'10px'
    }),[])
    
    const dispatch = useDispatch();
    const [id,onChangeId] = useInput('')
    const [password,onChangePassword] = useInput('')
    const {loginLoading} = useSelector((state)=> state.user)
       

    const onSubmitForm = useCallback(()=>{        
        dispatch(loginRequestAction({id,password}))
    },[id,password])
    
    
    return (
        <Form onFinish={onSubmitForm} style={formStytle}>
            <div>
                <label htmlFor="user-id">아이디</label>
                <br/>
                <Input name="user-id" 
                       value={id} 
                       onChange={onChangeId} 
                       required
                />
            </div>
            <div>  
                <label htmlFor="user-password">비밀번호</label>
                <br/>
                <Input name="userpassword" 
                       value={password} 
                       onChange={onChangePassword} 
                       type="password"
                       required
                />
            </div>
            <div style={style}>
                <Button type="primary" htmlType="submit" loading={loginLoading}>로그인</Button>
                <Link href="/signup"><a><Button>회원가입</Button> </a></Link>
            </div>
                
        </Form>
    );
}


export default LoginForm;