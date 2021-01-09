import {Button, Form, Input} from 'antd';
import Link from 'next/link';
import { useState, useCallback, useMemo } from 'react';
import propTypes from 'prop-types'
import useInput from '../hooks/useInput';


const LoginForm = ({setIsLoggedIn}) => {
    /*css*/
    const style = useMemo(()=>({
        marginTop:10
    }),[])

    const formStytle = useMemo(()=>({        
        padding:'10px'
    }),[])
    
    const [id,onChangeId] = useInput('')
    const [password,onChangePassword] = useInput('')
    
       

    const onSubmitForm = useCallback(()=>{
        console.log(id,password)
        setIsLoggedIn(true)
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
                <Button type="primary" htmlType="submit" loading={false}>로그인</Button>
                <Link href="/signup"><a><Button>회원가입</Button> </a></Link>
            </div>
                
        </Form>
    );
}

LoginForm.propTypes = {
    setIsLoggedIn:propTypes.func.isRequired
}

export default LoginForm;