import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Col, List, Row } from 'antd';
import { convertSecondsToTimeString, convertSizeToHumanReadable } from '../util/utils';

const BandsPage = () => {
    const navigate = useNavigate();
    const bootlegsStore = useSelector((store) => store.bootlegs);

    const handleClickBand = (bandName) => {
        navigate(`/band/${bandName}`);
    };

    return (
        <Row justify={'center'}>
            <Col xs={24} md={18} lg={12}>
                <List
                    itemLayout="horizontal"
                    bordered
                    dataSource={Object.values(bootlegsStore.stats)}
                    renderItem={(band, idx) => (
                        <List.Item
                            key={`band_${idx}`}
                            className="bandListItem"
                            onClick={() => handleClickBand(band.name.toLowerCase().replace(' ', ''))}
                            extra={
                                <img
                                    src={`/assets/bandLogos/${band.name.toLowerCase().replace(' ', '')}.png`}
                                    width="150"
                                    alt="band logo"
                                />
                            }
                        >
                            <List.Item.Meta
                                title={band.name}
                                description={`${band.totalShows} shows | ${convertSecondsToTimeString(
                                    band.totalTime
                                )} | ${convertSizeToHumanReadable(band.totalSize)}`}
                            />
                        </List.Item>
                    )}
                ></List>
            </Col>
        </Row>
    );
};

export default BandsPage;
