import Proptypes from 'prop-types';
import Link from 'next/link';
import {useState} from 'react'
import { Menu,Input,Row,Col } from 'antd';
import UserProfile from '../compoenets/UserProfile'
import LoginForm from '../compoenets/LoginForm'
import styled from 'styled-components';

const SearchInput = styled(Input.Search)`
    vertical-align:middle
`

const AppLayout = ({children})=>{
    const [isLoggedIn,setIsLoggedIn] = useState(false)
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
                    {isLoggedIn ? <UserProfile setIsLoggedIn={setIsLoggedIn}/> : <LoginForm setIsLoggedIn={setIsLoggedIn}/>}
                </Col>
                <Col xs={24} md={12} >
                    가운데메뉴
                </Col>
                <Col xs={24} md={6} >
                    오른쪽메뉴
                </Col>
            </Row>    
            {children}
        </div>
    )
}

AppLayout.Proptypes = {
    children:Proptypes.node.isRequired
}

export default AppLayout;