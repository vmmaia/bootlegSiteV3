import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Card, Col, Descriptions, Row, Typography } from 'antd';

import { convertSecondsToTimeString, convertSizeToHumanReadable } from '../util/utils';

const LandingPage = () => {
    const bootlegsStore = useSelector((state) => state.bootlegs);
    const infoStore = useSelector((state) => state.info);
    const ratiosStore = useSelector((state) => state.ratios);

    const [statsBands, setStatsBands] = useState(0);
    const [statsShows, setStatsShows] = useState(0);
    const [statsTime, setStatsTime] = useState(0);
    const [statsSize, setStatsSize] = useState(0);

    useEffect(() => {
        let bands = 0;
        let shows = 0;
        let time = 0;
        let size = 0;

        for (const band in bootlegsStore.stats) {
            bands += 1;
            shows += bootlegsStore.stats[band].totalShows;
            time += bootlegsStore.stats[band].totalTime;
            size += bootlegsStore.stats[band].totalSize;
        }

        setStatsBands(bands);
        setStatsShows(shows);
        setStatsTime(convertSecondsToTimeString(time));
        setStatsSize(convertSizeToHumanReadable(size));
    }, []);

    return (
        <Row gutter={[24, 24]}>
            <Col span={24}>
                <Row align={'middle'} justify={'center'}>
                    <Col xs={24} lg={18} xxl={12}>
                        <Card>
                            <Typography.Paragraph>
                                Welcome to my website! Here, you'll find a glimpse of the shows of my favourite bands
                                that I've been able to gather along the years that I've been doing this.
                            </Typography.Paragraph>
                            <Typography.Paragraph>
                                I believe there is no better portrait of a band than seeing their evolution throughout
                                the years and I personaly consider it the highest form of appreciation of a band or
                                artist.
                            </Typography.Paragraph>
                            <Typography.Paragraph>
                                Feel free to have a look around and drop me a line if you find anything of your interest
                                or if you have something that I'd like.
                            </Typography.Paragraph>
                            <Typography.Title
                                style={{ textAlign: 'right', margin: '0px', fontFamily: 'Arizonia', color: '#a20c23' }}
                            >
                                Tafnwin
                            </Typography.Title>
                        </Card>
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row gutter={[24, 24]} align={'stretch'} justify={'center'}>
                    <Col xs={{ span: 24, order: 2 }} md={12} lg={{ span: 7, order: 1 }}>
                        <Card title="Statistics" style={{ height: '100%' }}>
                            <Typography.Text>
                                Currently my publicly tradeable bootleg collection counts with the following stats:
                            </Typography.Text>
                            <br />
                            <br />
                            <Descriptions column={1} size="small">
                                <Descriptions.Item label="Bands">{statsBands}</Descriptions.Item>
                                <Descriptions.Item label="Shows">{statsShows}</Descriptions.Item>
                                <Descriptions.Item label="Time">{statsTime}</Descriptions.Item>
                                <Descriptions.Item label="Size">{statsSize}</Descriptions.Item>
                            </Descriptions>
                        </Card>
                    </Col>
                    <Col xs={{ span: 24, order: 1 }} lg={{ span: 7, order: 2 }}>
                        <Card title="Status" style={{ height: '100%' }}>
                            <Typography.Title style={{ color: infoStore.info.color, textAlign: 'center' }}>
                                {infoStore.info.tradingStatus}
                            </Typography.Title>
                            <Row justify={'center'}>
                                <Col>
                                    <Typography.Text>
                                        <b>Email: </b>
                                        {infoStore.info.email}
                                    </Typography.Text>
                                </Col>
                            </Row>
                            <Typography.Title level={3}>Looking for</Typography.Title>
                            <ul>
                                {infoStore.info.interested.map((band, idx) => (
                                    <li key={`band_${idx}`}>{band}</li>
                                ))}
                            </ul>
                        </Card>
                    </Col>
                    <Col xs={{ span: 24, order: 3 }} md={12} lg={{ span: 7, order: 3 }}>
                        <Card title="Trading ratios" style={{ height: '100%' }}>
                            <Typography.Text>
                                These are the ratios that apply to all my trades. They can vary depending on very
                                specific situations.
                            </Typography.Text>
                            <br />
                            <br />
                            <Typography.Title level={4}>Audio</Typography.Title>
                            {ratiosStore.ratios.audio.map((ratio, idx) => (
                                <React.Fragment key={`audio_${idx}`}>
                                    <span>{`${ratio.trader1} -> ${ratio.trader2}`}</span>
                                    <br />
                                </React.Fragment>
                            ))}
                            <Typography.Title level={4}>Video</Typography.Title>
                            {ratiosStore.ratios.video.map((ratio, idx) => (
                                <React.Fragment key={`video_${idx}`}>
                                    <span>{`${ratio.trader1} -> ${ratio.trader2}`}</span>
                                    <br />
                                </React.Fragment>
                            ))}
                            <Typography.Title level={4}>Other</Typography.Title>
                            {ratiosStore.ratios.other.map((ratio, idx) => (
                                <React.Fragment key={`other_${idx}`}>
                                    <span>{`${ratio.trader1} -> ${ratio.trader2}`}</span>
                                    <br />
                                </React.Fragment>
                            ))}
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default LandingPage;
