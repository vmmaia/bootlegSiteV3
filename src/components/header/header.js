import React, { useEffect, useState } from 'react';
import { Button, Col, Drawer, Layout, Row, Space } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const [useMobile, setUseMobile] = useState(false);
    const [showDrawer, setShowDrawer] = useState(false);

    useEffect(() => {
        if (window.screen.width < 576) {
            setUseMobile(true);
        }
    }, []);

    return (
        <Layout.Header
            style={{
                backgroundColor: '#a20c23',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '40px',
            }}
        >
            <React.Fragment>
                {useMobile ? (
                    <React.Fragment>
                        <Drawer title="Menu" placement="right" onClose={() => setShowDrawer(false)} open={showDrawer}>
                            <Row>
                                <Col span={24}>
                                    <Button
                                        type="text"
                                        style={{
                                            fontSize: '2rem',
                                            margin: '15px 0px',
                                            width: '100%',
                                            textAlign: 'left',
                                        }}
                                        onClick={() => {
                                            setShowDrawer(false);
                                            navigate('/');
                                        }}
                                    >
                                        Main
                                    </Button>
                                </Col>
                                <Col span={24}>
                                    <Button
                                        type="text"
                                        style={{
                                            fontSize: '2rem',
                                            margin: '15px 0px',
                                            width: '100%',
                                            textAlign: 'left',
                                        }}
                                        onClick={() => {
                                            setShowDrawer(false);
                                            navigate('/bands');
                                        }}
                                    >
                                        Bands
                                    </Button>
                                </Col>
                                <Col span={24}>
                                    <Button
                                        type="text"
                                        style={{
                                            fontSize: '2rem',
                                            margin: '15px 0px',
                                            width: '100%',
                                            textAlign: 'left',
                                        }}
                                        onClick={() => {
                                            setShowDrawer(false);
                                            navigate('/wishlist');
                                        }}
                                    >
                                        Wishlist
                                    </Button>
                                </Col>
                                <Col span={24}>
                                    <Button
                                        type="text"
                                        style={{
                                            fontSize: '2rem',
                                            margin: '15px 0px',
                                            width: '100%',
                                            textAlign: 'left',
                                        }}
                                        onClick={() => {
                                            setShowDrawer(false);
                                            navigate('/traders');
                                        }}
                                    >
                                        Traders
                                    </Button>
                                </Col>
                                <Col span={24}>
                                    <Button
                                        type="text"
                                        style={{
                                            fontSize: '2rem',
                                            margin: '15px 0px',
                                            width: '100%',
                                            textAlign: 'left',
                                        }}
                                        onClick={() => {
                                            setShowDrawer(false);
                                            navigate('/about');
                                        }}
                                    >
                                        About
                                    </Button>
                                </Col>
                            </Row>
                        </Drawer>
                        <Button style={{ position: 'fixed', right: '15px' }} onClick={() => setShowDrawer(true)}>
                            <MenuOutlined />
                        </Button>
                    </React.Fragment>
                ) : (
                    <Space size={'small'}>
                        <Button className="headerBtn" type="text" size="large" onClick={() => navigate('/bands')}>
                            Bands
                        </Button>
                        <Button className="headerBtn" type="text" size="large" onClick={() => navigate('/wishlist')}>
                            Wishlist
                        </Button>
                        <div style={{ width: '125px' }}></div>
                        <Button className="headerBtn" type="text" size="large" onClick={() => navigate('/traders')}>
                            Traders
                        </Button>
                        <Button className="headerBtn" type="text" size="large" onClick={() => navigate('/about')}>
                            About
                        </Button>
                    </Space>
                )}
            </React.Fragment>
        </Layout.Header>
    );
};

export default Header;
