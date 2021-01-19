# react-nodebirds
---
[인프런]React로 NodeBird SNS 만들기 - 조현영 강의 클론코딩

### Stack
- 리액트, next.js, node.js(express), MySQL, sequelize
```
$ npm i sequelize sequelize-cli mysql2
```

- redux, next-redux-wrapper
``` 
$ npm i next-redux-wrapper
$ npm i redux-react
```
- 미들웨어
```
$ redux-devtools-extension
```

- Ant Design, styled component
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
- next-redux-wrapper
    설치
    ```
    $ npm i next-redux-wrapper
    ```
    
    ```javascript
    //configureStore.js
    import WrapperStatistic from 'antd/lib/statistic/Statistic'

    const {createWrapper}  =require('next-redux-wrapper')

    const configureStore()=>{

    }

    const wrapper = createWrapper(configureStore,{
        debug:process.env.NODE_ENV === 'development',
    })

    export default wrapper ;
    ```
    
    ```javascript
    //_app.js
    import Proptypes from 'prop-types';
    import 'antd/dist/antd.css'
    import Head from 'next/head'
    import wrapper from '../store/configureStore';

    const App = ({ Component })=>{
        return(
        <>
            <Head>
                <title>NodeBird</title>
            </Head>
            <Component />
        </>
        )
    };

    App.Proptypes = {
        Component:Proptypes.elementType.isRequired
    }

    export default wrapper.withRedux(App);
    ```
- redux 개발자모드 사용
    ```
    $ npm i redux-devtools-extension
    ```    
    
    ``` javascript
    //configureStore.js
    import {createWrapper} from 'next-redux-wrapper'
    import { applyMiddleware, compose, createStore } from 'redux';
    import reducer from '../reducers'
    import {composeWithDevTools} from 'redux-devtools-extension'

    const configureStore = ()=>{

        const middlewares = [];

        const enhancer = process.env.NODE_ENV === 'production'
        ? compose(applyMiddleware(...middlewares))
        : composeWithDevTools(
        applyMiddleware(...middlewares),
        );

        const store = createStore(reducer, enhancer)
        return store
    }

    const wrapper = createWrapper(configureStore,{
        debug:process.env.NODE_ENV === 'development',
    })

    export default wrapper ;
    ```
- reducer를 분리해서 사용할 때, 리듀서를 각각 만들고  -- combine reducer 사용    
    ```javascript
    //reducer/index.js
        const rootReducer = combineReducers({
        index : (state={},action)=>{
            switch(action.type){
                case HYDRATE : 
                    console.log('HYDREATE',action);
                    return {...state,...action.payload};
                default:return state;
            }
        },
        user,
        post
    })
    ```
- optional chaning
    ```javascript
    let nestedProp = obj.first && obj.first.second;
    let nestedProp2 = obj.first?.second;
    ```
- react-slick

- react hook
    - useState
    - useEffect
    - useMemo
- inline-style 최적화 문제
- redux, redux-saga, middleWare
- immer 라이브러리
    - 불변성 관리를 편하게 할 수 있다!
    - immer가 state를 불변성을 지키면서 return 해줌
    ```
            $ npm i immer
    ```
    ``` javascript
    import produce from 'immer'

    const reducer = (state=initialState,action)=>{
        return produce(state,(draft)=>{
            draft.xx = true; 
        })
    }
    ```
- faker 라이브러리 : 더미데이터 샘플
    ```
    $ npm i faker
    ```
- short id 라이브러리 : 겹치기 힘든 랜덤한 문자열을 만들어줌
    ```
    $ npm i shortid
    ```
    ``` javascript
    import shortId from 'shortid'

    shortid.generate()
    ```
- 인피니트 스크롤링
    - 스크롤 관련된 window 내장객체를 이용
    - react-virtualized lib는 로딩한 다음 화면에 세개씩만 보여주는 원리(다음에 사용해보자)
- Node.js로 백엔드 서버
    ```javascript
    const http = require('http');

    http.createServer(()=>{
        
    })
    http.listen(3065);
    ```
- mySQL sequelize
    - 자바스크립트 객체와 데이터베이스의 릴레이션을 매핑해주는 도구
    - 자바스크립트 구문을 알아서 SQL문으로 변경해준다
    - 관계설정 : 일대다(hasMany--belongsTo), 다대다(belongsToMany), 일대일(hasOne -- belongsTo)
- nodemon
    ```
    $ npm i -D nodemon
    ```
    - 소스 업데이트시 자동 재실행
- 서버로 데이터 전송할 때 필요한 express middleware
    - express.json
    - express.urlencoded
    ```javascript
    app.use(express.json()) //front에서 받은 json형식의 데이터를 req.body에 넣어줌
    app.use(express.urlencoded({extended:true})) // form submit은 urlencoded로 데이터가 넘어옴
    ```
- 비밀번호 암호화
    ``` 
    $ npm i bcrypty
    ```
    ```javascript
    const bcrypt = require(bcrypt)
    const hashedPassword = await bcrypt.hash(req.body.password,13); //숫자가 높을수록 보안이 높지만 속도가 오래걸림. 보통 10~13정도 사용함
    ```
- CORS error
> Access to XMLHttpRequest at 'http://localhost:3065/user/signup' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.
    - 브라우저에서 다른 도메인 서버로 요청을 보내면 브라우저가 요청을 차단함
    - 해결방법
        - proxy 방식 : 브라우저에서 프론트서버로 요청을 보냄
        - header에 'Access-Control-Allow-Origin' 헤더추가
        - cors lib 사용
        ```
        $ npm i cors
        ```
        ```
        app.use(cors({
        origin:'*',
        credentials:false
        }))
        ```
- 로그인 관리 - passport lib
    ```
    $ npm i passport passport-local
    ```
    ```
    passport관련설정 - passport directory생성
    ```
    ``` javascript
    // app.js
    const passportConfig = require('./passport')
    ...
    passportConfig();
    ```


### &#128161; 문제와 해결
- redux 적용하고 loginForm에서 isLoggedIn을 못찾음
    - state 객체 depth를 잘못명시