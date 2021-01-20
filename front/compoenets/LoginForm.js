import {Button, Form, Input} from 'antd';
import Link from 'next/link';
import { useState, useCallback, useMemo, useEffect } from 'react';
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
    const [email,onChangeEmail] = useInput('')
    const [password,onChangePassword] = useInput('')
    const {loginLoading, loginError} = useSelector((state)=> state.user)

    useEffect(()=>{
        if(loginError){
            alert(loginError)
        }
    },[loginError])
       

    const onSubmitForm = useCallback(()=>{        
        dispatch(loginRequestAction({email,password}))
    },[email,password])
    
    
    return (
        <Form onFinish={onSubmitForm} style={formStytle}>
            <div>
                <label htmlFor="user-email">이메일</label>
                <br/>
                <Input name="user-email" 
                       value={email} 
                       onChange={onChangeEmail} 
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