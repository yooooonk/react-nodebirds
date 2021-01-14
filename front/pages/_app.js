import Proptypes from 'prop-types';
import 'antd/dist/antd.css'
import Head from 'next/head'
import wrapper from '../store/configureStore';
import withReduxSaga from 'next-redux-saga'

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

export default wrapper.withRedux(withReduxSaga(App));