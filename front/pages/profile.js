import AppLayout from "../compoenets/AppLayout";
import Head from 'next/head'

const Profile = ()=>{
    return(
        <>
            <Head>
                <title>프로필 | NodeBird</title>
            </Head>
            <AppLayout>
                <div>프로필</div>
            </AppLayout>
        </>
    
    )
}

export default Profile;