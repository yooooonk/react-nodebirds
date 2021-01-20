import AppLayout from "../compoenets/AppLayout";
import Head from 'next/head'
import {Button, Form,Input} from  'antd'
import { useCallback, useEffect, useState } from "react";
import useInput from '../hooks/useInput';
import styled from 'styled-components'
import Checkbox from "antd/lib/checkbox/Checkbox";
import { signupRequestAction, SIGN_UP_REQUEST } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";

const ErrorMessage = styled.div`
    color : red;
`;

const Signup = ()=>{
    const dispatch = useDispatch()
    const {signupLoading,signupDone,signupError,me} = useSelector((state)=>state.user)

    const [email,onChangeEmail] = useInput('')
    const [password,onChangePassword] = useInput('')
    const [nickname,onChangeNickname] = useInput('')

    const [passwordCheck,setPasswordCheck] = useState('')
    const [passwordError, setPasswordError] = useState(false)

    const [term, setTerm] = useState('')
    const [termError, setTermError] = useState(false)

    const onCahngeTerm = useCallback((e)=>{
        setTerm(e.target.checked)
        setTermError(false)
    })
    const onChangePasswordCheck = useCallback((e)=>{
        setPasswordCheck(e.target.value)
        setPasswordError(e.target.value !== password)
    })
    const onSubmit = useCallback(()=>{
        
        if(password !== passwordCheck){
            return setPasswordError(true)
        }

        if(!term){
            return setTermError(true)
        }
        
        dispatch(signupRequestAction({email,password,nickname}))
    },[email, nickname, password,passwordCheck,term])

    useEffect(()=>{
        if(me && me.id){            
            Router.replace('/'); // 뒤로가기했을 때 그 페이지가 나오지않게
        }
    },[me])

    useEffect(()=>{
        if(signupDone){
            
            Router.replace('/');
        }
    },[signupDone])

    useEffect(()=>{
        if(signupError){
            alert(signupError)
            console.log(signupError)
        }
    
    },[signupError])
    return (
        <AppLayout>
            <Head>
                <title>회원가입 | NodeBird</title>
            </Head>
            <Form onFinish={onSubmit}>
                <div>
                    <label htmlFor="user-email">이메일</label>
                    <br/>
                    <Input name="user-email" 
                        value={email} 
                        type="email"
                        onChange={onChangeEmail} 
                        required
                    />
                </div>
                <div>
                    <label htmlFor="user-id">닉네임</label>
                    <br/>
                    <Input name="user-nickname" 
                        value={nickname} 
                        onChange={onChangeNickname} 
                        required
                    />
                </div>
                <div>  
                    <label htmlFor="user-password">비밀번호</label>
                    <br/>
                    <Input name="userpassword" 
                        value={password} 
                        onChange={onChangePassword} 
                        required
                        type="password"
                    />
                </div>
                <div>
                    <label htmlFor="user-password-check">비밀번호 체크</label>
                        <br/>
                        <Input name="userpassword-check" 
                            value={passwordCheck} 
                            onChange={onChangePasswordCheck} 
                            type="password"
                            required
                        />
                {passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다</ErrorMessage>}
                </div>
                <div>
                    <Checkbox name="user-term" checked={term} onChange={onCahngeTerm}>회원가입 약관에 동의합니다</Checkbox>
                    {termError && <ErrorMessage>약관에 동의하세요</ErrorMessage> }
                </div>
                <div style={{marginTop:10}}>
                    <Button type="primary" htmlType="submit" loading={signupLoading}>가입하기</Button>
                </div>                

            </Form>     
        </AppLayout>    
    )
}

export default Signup;