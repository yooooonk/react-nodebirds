import Proptypes from 'prop-types';
import Link from 'next/link';
import {useState} from 'react'
import { Menu,Input,Row,Col } from 'antd';
import UserProfile from '../compoenets/UserProfile'
import LoginForm from '../compoenets/LoginForm'
import styled from 'styled-components';
import {useSelector} from 'react-redux'

const SearchInput = styled(Input.Search)`
    vertical-align:middle
`

const AppLayout = ({children})=>{
    const {me} = useSelector((state)=> state.user)
        
    return(
        <div>
            <Menu mode="horizontal">
                <Menu.Item><Link href="/"><a>노드버드</a></Link> </Menu.Item>
                <Menu.Item><Link href="/profile"><a>프로필</a></Link> </Menu.Item>
                <Menu.Item><SearchInput enterButton /></Menu.Item>
                <Menu.Item><Link href="/signup"><a>회원가입</a></Link> </Menu.Item>
            </Menu>
            <Row>
                <Col xs={24} md={6} >
                    {me ? <UserProfile /> : <LoginForm />}
                </Col>
                <Col xs={24} md={12} >
                    {children}
                </Col>
                <Col xs={24} md={6} >
                    Made by ouo_yoonk
                </Col>
            </Row>    
            
        </div>
    )
}

AppLayout.Proptypes = {
    children:Proptypes.node.isRequired
}

export default AppLayout;