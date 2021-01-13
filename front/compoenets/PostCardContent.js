import Link from 'next/link'
import propType from 'prop-types'

const PostCardContent = ({postData})=>(
    <div>
        {postData.split(/(#[^\s#]+)/g).map((v,i)=>{
            if(v.match(/(#[^\s#]+)/)){
                return <Link href={`/hashtag/${v.slice(1)}`}  key={i}><a>{v}</a></Link>
            }

            return v
        })}
    </div>   
)

PostCardContent.propType = {
    postData:propType.string.isRequired
}

export default PostCardContent