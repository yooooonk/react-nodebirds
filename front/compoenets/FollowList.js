import {Button, Card, List} from 'antd'
import { StopOutlined } from '@ant-design/icons'
import { useCallback, useMemo } from 'react';
import propType from 'prop-types'
import { useDispatch } from 'react-redux';
import { UNFOLLOW_REQUEST } from '../reducers/user';

const FollowerList = ({header,data})=>{
    const dispatch = useDispatch();
    const loadStyle = useMemo(()=>({
       textAlign:'center',
       margin : '10px 0'
    }),[])

    const listStyle = useMemo(()=>({
        marginBotton:20    
    }),[])

    const onClick = ((id)=>{
        console.log(id)
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
                    <Card actions={ [<StopOutlined key="stop" onClick={onClick(item.id)}/>]} >
                        <Card.Meta description={item.nickname} />
                    </Card>
                </List.Item>
            )}
        />
    
    )
}

FollowerList.propType={
    header:propType.string.isRequired,
    data:propType.array.isRequired
}

export default FollowerList;