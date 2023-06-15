import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { ConfigProvider, theme, Layout, Row, Col, Progress, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import './app.css';

import { useDispatch } from 'react-redux';
import { add as addBootlegs } from './redux/slices/bootlegsSlice';
import { add as addTraders } from './redux/slices/tradersSlice';
import { add as addWishlist } from './redux/slices/wishlistSlice';
import { add as addRatios } from './redux/slices/ratiosSlice';
import { add as addInfo } from './redux/slices/infoSlice';
import { loadBootlegs, loadInfo, loadRatios, loadTraders, loadWishlist } from './util/dataLoader';

import Header from './components/header/header';
import Footer from './components/footer/footer';
import EasterEggs from './components/easterEggs/easterEggs';

import LandingPage from './pages/landingPage';
import AboutPage from './pages/aboutPage';
import BandsPage from './pages/bandsPage';
import BandPage from './pages/bandPage';
import BootlegPage from './pages/bootlegPage';
import WishlistPage from './pages/wishlistPage';
import TradersPage from './pages/tradersPage';

const App = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [loadingData, setLoadingData] = useState(true);

    const [percentBootlegs, setPercentBootlegs] = useState(0);
    const [percentTraders, setPercentTraders] = useState(0);
    const [percentWishlist, setPercentWishlist] = useState(0);
    const [percentRatios, setPercentRatios] = useState(0);
    const [percentInfo, setPercentInfo] = useState(0);

    const loadData = async () => {
        setPercentBootlegs(50);
        const bootlegs = await loadBootlegs();
        dispatch(addBootlegs(bootlegs));
        setPercentBootlegs(100);

        setPercentTraders(50);
        const traders = await loadTraders();
        dispatch(addTraders(traders));
        setPercentTraders(100);

        setPercentWishlist(50);
        const wishlist = await loadWishlist();
        dispatch(addWishlist(wishlist));
        setPercentWishlist(100);

        setPercentRatios(50);
        const ratios = await loadRatios();
        dispatch(addRatios(ratios));
        setPercentRatios(100);

        setPercentInfo(50);
        const info = await loadInfo();
        dispatch(addInfo(info));
        setPercentInfo(100);

        setTimeout(() => {
            setLoadingData(false);
        }, 500);
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
            }}
        >
            <React.Fragment>
                <a
                    className={loadingData ? 'logoLoading' : 'logoLoaded'}
                    href="javascript:void(0)"
                    onClick={() => navigate('/')}
                >
                    <img src="/logo.svg" alt="logo"></img>
                </a>
                {loadingData ? (
                    <Layout>
                        <Layout.Content
                            style={{
                                height: '100vh',
                                padding: '15px',
                            }}
                        >
                            <Row style={{ marginTop: '300px' }}>
                                <Col span={24}>
                                    <Row justify={'center'}>
                                        <Col>
                                            <Typography.Title level={3}>
                                                {`Loading data `}
                                                <LoadingOutlined />
                                            </Typography.Title>
                                        </Col>
                                    </Row>
                                    <Row justify={'center'}>
                                        <Col xxs={24} lg={12}>
                                            <span>Bootlegs</span>
                                            <Progress percent={percentBootlegs} size={'small'} />
                                            <span>Traders</span>
                                            <Progress percent={percentTraders} size={'small'} />
                                            <span>Wishlist</span>
                                            <Progress percent={percentWishlist} size={'small'} />
                                            <span>Ratios</span>
                                            <Progress percent={percentRatios} size={'small'} />
                                            <span>Info</span>
                                            <Progress percent={percentInfo} size={'small'} />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Layout.Content>
                    </Layout>
                ) : (
                    <Layout>
                        <Header />
                        <Layout.Content
                            style={{
                                height: 'calc(100vh - 40px - 39px)',
                                padding: '45px 15px 15px 15px',
                                overflow: 'auto',
                            }}
                        >
                            <Routes>
                                {document.querySelector('main').scrollTo(0, 0)}
                                <Route exact path={'/'} element={<LandingPage />}></Route>
                                <Route exact path={'/about'} element={<AboutPage />}></Route>
                                <Route exact path={'/bands'} element={<BandsPage />}></Route>
                                <Route exact path={'/band/:band'} element={<BandPage />}></Route>
                                <Route exact path={'/bootleg/:id'} element={<BootlegPage />}></Route>
                                <Route exact path={'/wishlist'} element={<WishlistPage />}></Route>
                                <Route exact path={'/traders'} element={<TradersPage />}></Route>
                                <Route path={'*'} element={<Navigate replace to="/" />}></Route>
                            </Routes>
                        </Layout.Content>
                        <EasterEggs />
                        <Footer />
                    </Layout>
                )}
            </React.Fragment>
        </ConfigProvider>
    );
};

export default App;
