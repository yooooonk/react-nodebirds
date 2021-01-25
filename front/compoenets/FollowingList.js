import {Button, Card, List} from 'antd'
import { StopOutlined } from '@ant-design/icons'
import { useMemo } from 'react';
import propType from 'prop-types'
import { UNFOLLOW_REQUEST } from '../reducers/user';
import { useDispatch } from 'react-redux';

const FollowingList = ({header,data})=>{
    const dispatch = useDispatch()
   const loadStyle = useMemo(()=>({
       textAlign:'center',
       margin : '10px 0'
   }),[])

   const listStyle = useMemo(()=>({
    marginBotton:20
    }),[])



    const unfollow = ((id)=>{
        console.log('unfollow event',id)
       /*  dispatch({
            type:UNFOLLOW_REQUEST,
            data:id
        }) */
    }) 
    return(
        <List 
            style={listStyle}
            grid={{gutter:4,xs:2, md:3}}
            size="small"
            header={<div>{header}</div>}
            loadMore={<div style={loadStyle}><Button>더보기</Button> </div>}
            bordered
            dataSource={data}
            renderItem={item=>(
                <List.Item style={{marginTop:20}}>
                    <Card actions={ [<StopOutlined key="stop" onClick={unfollow(item.id)} />]} >
                        <Card.Meta description={item.nickname} />
                    </Card>
                </List.Item>
            )}
        />
    
    )
}

FollowingList.propType={
    header:propType.string.isRequired,
    data:propType.array.isRequired
}

export default FollowingList;