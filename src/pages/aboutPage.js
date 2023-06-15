import React from 'react';
import { useSelector } from 'react-redux';

import { Col, Row, Card, Typography } from 'antd';

const AboutPage = () => {
    const infoStore = useSelector((state) => state.info);

    return (
        <Row gutter={[24, 24]}>
            <Col span={24}>
                <Row align={'middle'} justify={'center'}>
                    <Col xs={24} lg={18} xxl={12}>
                        <Card title="About">
                            <Typography.Paragraph>
                                Hi there. I'm a metal fan from Portugal and I'm eager to trade with anyone that might be
                                interested in what I have to offer.
                                <br />
                                My main interest is Nightwish, but i'm receptive to other bands and even genres.
                            </Typography.Paragraph>
                            <Typography.Paragraph>
                                In order for everything to go smoothly, I suggest you take into consideration the
                                following rules and try to follow them to the best of your abilities.
                            </Typography.Paragraph>
                            <Typography.Paragraph>
                                <ol>
                                    <li>Nothing listed here is for sale,</li>
                                    <li>No trading of copyrighted material,</li>
                                    <li>All formats are welcomed, but lossless is prefered,</li>
                                    <li>I only trade online. I do not send or receive mail packages,</li>
                                    <li>If you have any of the items in my wishlist, please contact me,</li>
                                    <li>
                                        I'm interested in all kind of Nightwish media beyond bootlegs, such as photos,
                                        etc,
                                    </li>
                                    <li>
                                        I may take some time to answer your email, but it shouldn't take more than a
                                        week,
                                    </li>
                                    <li>I only accept files via Mediafire, Mega, Google Drive and WeTransfer,</li>
                                    <li>Please only contact me either in Portuguese or English.</li>
                                </ol>
                            </Typography.Paragraph>
                            <Typography.Paragraph>
                                You can reach me at this email: <b>{infoStore.info.email}</b>
                            </Typography.Paragraph>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default AboutPage;
