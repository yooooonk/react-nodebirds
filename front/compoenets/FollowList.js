import {Button, Card, List} from 'antd'
import { StopOutlined } from '@ant-design/icons'
import { useCallback, useMemo } from 'react';
import propType from 'prop-types'
import { useDispatch } from 'react-redux';
import { REMOVE_FOLLOWER_REQUEST, UNFOLLOW_REQUEST } from '../reducers/user';


const FollowList = ({ header, data,onClickMore,loading }) => {
    const dispatch = useDispatch();
    const onCancel = (id) => () => {
      if (header === '팔로잉') {
        dispatch({
          type: UNFOLLOW_REQUEST,
          data: id,
        });
        return;
      }
      dispatch({
        type: REMOVE_FOLLOWER_REQUEST,
        data: id,
      });
    };
  
    return (
      <List
        style={{ marginBottom: 20 }}
        grid={{ gutter: 4, xs: 2, md: 3 }}
        size="small"
        header={<div>{header}</div>}
        loadMore={<div style={{ textAlign: 'center', margin: '10px 0' }}><Button onClick={onClickMore} loading={loading}>더 보기</Button></div>}
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item style={{ marginTop: 20 }}>
            <Card actions={[<StopOutlined key="stop" onClick={onCancel(item.id)} />]}>
              <Card.Meta description={item.nickname} />
            </Card>
          </List.Item>
        )}
      />
    );
  };
  
  FollowList.propTypes = {
    header: propType.string.isRequired,
    data: propType.array.isRequired,
    onClickMore: propType.func.isRequired,
    loading: propType.bool.isRequired,
  };

export default FollowList;