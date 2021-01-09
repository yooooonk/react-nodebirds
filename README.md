# react-nodebirds
---
[인프런]React로 NodeBird SNS 만들기 - 조현영 강의 클론코딩

### Stack
리액트, next.js, node.js, Ant Design, styled component

### &#128161; 새로 알게된 것
- antd, styled component 라이브러리 사용법
- useCallBack : 함수를 캐싱, useMemo : 값을 캐싱
- style을 inline 방식으로 정의하면 최적화가 힘듦
    ```javascript
    <div style={{marginTop:10}}>
                <Button type="primary" htmlType="submit" loading={false}>로그인</Button>
                <Link href="/signup"><a><Button>회원가입</Button> </a></Link>
    </div>
    ```
    - styled component를 사용
    ``` javascript
    import styled from 'styled-components'
    ...
    // div
    const LoginButton = styled.div`
        vertical-align:middle;
    `
    <LoginButton>
                <Button type="primary" htmlType="submit" loading={false}>로그인</Button>
                <Link href="/signup"><a><Button>회원가입</Button> </a></Link>
    </LoginButton>

    // 객체
    const SearchInput = styled(Input.Search)`
    vertical-align:middle;
    `
    //<Menu.Item><Input.Search  style={{verticalAlign:'middle'}}></Input.Search></Menu.Item>
    <Menu.Item><SearchInput enterButton /></Menu.Item>
    ```
    - useMemo를 이용
    ``` javascript
    const style = useMemo(()=>({
        marginTop:10
    }),[])

    <div style={style}>
                <Button type="primary" htmlType="submit" loading={false}>로그인</Button>
                <Link href="/signup"><a><Button>회원가입</Button> </a></Link>
    </div>
    ```
- 커스텀 훅
    사용전
    ``` javascript
    const [id,setId] = useState('')
    const onChangeId = useCallback((e)=>{
        setId(e.target.value)
    },[])

    const [password,setPassword] = useState('')
    const onChangePassword = useCallback((e)=>{
        setPassword(e.target.value)
    },[])
    ```
    커스텀 훅 정의
    ```javascript
    import { useState, useCallback}from 'react'

    export default (initialValue = null)=>{
        const [value, setValue] = useState(initialValue)
        const handler = useCallback((e)=>{
            setValue(e.target.value)
        },[])

        return [value,handler];
    }
    ```
    사용
    ```javascript
    import useInput from '../hooks/useInput';
    
    const [id,onChangeId] = useInput('')
    const [password,onChangePassword] = useInput('')
    ```