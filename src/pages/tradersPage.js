import React from 'react';
import { useSelector } from 'react-redux';

import { Col, Row, Card, Typography, Table } from 'antd';

const TradersPage = () => {
    const tradersStore = useSelector((state) => state.traders);

    const columns = [
        {
            title: 'Alias',
            dataIndex: 'alias',
            key: 1,
        },
        {
            title: 'Country',
            dataIndex: 'country',
            key: 2,
        },
        {
            title: 'Website',
            dataIndex: 'website',
            key: 3,
            render: (text) => (text !== null ? <a href={`http://${text}`}>Link</a> : '-'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 4,
            render: (text) => (text !== null ? <a href={`mailto:${text}`}>Email</a> : '-'),
        },
        {
            title: 'Comment',
            dataIndex: 'comment',
            key: 5,
            responsive: ['md'],
        },
    ];

    const goodTraders = tradersStore.traders
        .filter((t) => t.isGood)
        .map((t, idx) => ({
            key: `good_${idx}`,
            alias: t.alias,
            country: t.country,
            email: t.email,
            website: t.website,
            comment: t.observations,
        }));

    const badTraders = tradersStore.traders
        .filter((t) => !t.isGood)
        .map((t, idx) => ({
            key: `bad_${idx}`,
            alias: t.alias,
            country: t.country,
            email: t.email,
            website: t.website,
            comment: t.observations,
        }));

    return (
        <Row gutter={[24, 24]}>
            <Col span={24}>
                <Row align={'middle'} justify={'center'}>
                    <Col xs={24} lg={18} xxl={12}>
                        <Card title="Traders">
                            <Typography.Paragraph>
                                This is a list of people i've had the pleasure of trading with for the time i've been
                                doing this.
                                <br />
                                If you do not wish to be included in this listing (only applies to the good column),
                                please email me and i'll remove you as soon as possible.
                            </Typography.Paragraph>
                        </Card>
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row align={'middle'} justify={'center'}>
                    <Col xs={24} lg={18} xxl={12}>
                        <Card title="Good traders">
                            <Table
                                columns={columns}
                                dataSource={goodTraders}
                                scroll={{ x: true }}
                                size="small"
                                bordered
                            />
                        </Card>
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row align={'middle'} justify={'center'}>
                    <Col xs={24} lg={18} xxl={12}>
                        <Card title="Bad traders">
                            <Table
                                columns={columns}
                                dataSource={badTraders}
                                scroll={{ x: true }}
                                size="small"
                                bordered
                            />
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default TradersPage;
