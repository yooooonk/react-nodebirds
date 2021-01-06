import Proptypes from 'prop-types';
import Link from 'next/link';
import { Menu,Input,Row,Col } from 'antd';

const AppLayout = ({children})=>{
    return(
        <div>
            <Menu mode="horizontal">
                <Menu.Item><Link href="/"><a>노드버드</a></Link> </Menu.Item>
                <Menu.Item><Link href="/profile"><a>프로필</a></Link> </Menu.Item>
                <Menu.Item><Input.Search  style={{verticalAlign:'middle'}}></Input.Search></Menu.Item>
                <Menu.Item><Link href="/signup"><a>회원가입</a></Link> </Menu.Item>
            </Menu>
            <Row>
                <Col xs={24} md={6} >
                    왼쪽메뉴
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