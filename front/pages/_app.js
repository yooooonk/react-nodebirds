import Proptypes from 'prop-types';
import 'antd/dist/antd.css'
import Head from 'next/head'

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

export default App;