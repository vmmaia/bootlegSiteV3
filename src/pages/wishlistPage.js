import React from 'react';
import { useSelector } from 'react-redux';

import { Col, Row, Card, List } from 'antd';

import { convertDateToHumanReadable } from '../util/utils';

const WishlistPage = () => {
    const wishlistStore = useSelector((state) => state.wishlist);

    return (
        <Row gutter={[24, 24]}>
            <Col span={24}>
                <Row align={'middle'} justify={'center'}>
                    <Col xs={24} lg={18} xxl={12}>
                        <Card title="Wishlist">
                            <List
                                size="small"
                                dataSource={wishlistStore.shows}
                                renderItem={(item, idx) => (
                                    <List.Item key={`show_${idx}`}>
                                        <List.Item.Meta
                                            title={`${item.band} - ${convertDateToHumanReadable(item.date)}`}
                                            description={item.description}
                                        />
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default WishlistPage;
