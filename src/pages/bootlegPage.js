import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
    Col,
    Row,
    Card,
    Typography,
    Badge,
    Image,
    Descriptions,
    Carousel,
    Avatar,
    Tooltip,
    Timeline,
    Divider,
} from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

import { convertDateToHumanReadable, convertSecondsToTimeString, convertSizeToHumanReadable } from '../util/utils';

const TradeabilityTag = (props) => {
    return props.rt ? (
        <Badge.Ribbon text="Rare trade only" color="orange">
            {props.children}
        </Badge.Ribbon>
    ) : props.nft ? (
        <Badge.Ribbon text="Not for trade" color="red">
            {props.children}
        </Badge.Ribbon>
    ) : (
        props.children
    );
};

const BootlegPage = () => {
    const bootlegStore = useSelector((store) => store.bootlegs);
    const { id } = useParams();

    const show = bootlegStore.bootlegs.find((s) => s.id === id);

    const parseInitials = (name) => {
        const names = name.split(' ');

        return names.length === 1
            ? `${names[0].charAt(0)}${names[0].charAt(1)}`.toUpperCase()
            : `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase();
    };

    return (
        <Row justify={'center'}>
            <Col xs={24} lg={18}>
                <TradeabilityTag rt={show.isRare} nft={show.notForTrade}>
                    <Card>
                        <Row gutter={[24, 24]}>
                            <Col span={24}>
                                <Typography.Title level={3}>{`${convertDateToHumanReadable(show.date)} - ${
                                    show.venue
                                }, ${show.city}, ${show.country}`}</Typography.Title>
                            </Col>
                            <Col span={24} style={{ textAlign: 'center' }}>
                                {show.hasImage || show.hasFrequency ? (
                                    <Carousel autoplay>
                                        {show.hasImage ? (
                                            <div>
                                                <Image
                                                    src={`/assets/images/${show.id}/cover.png`}
                                                    style={{ maxHeight: '250px' }}
                                                />
                                            </div>
                                        ) : (
                                            ''
                                        )}

                                        {show.hasFrequency ? (
                                            <div>
                                                <Image
                                                    src={`/assets/images/${show.id}/freq.png`}
                                                    style={{ maxHeight: '250px' }}
                                                />
                                            </div>
                                        ) : (
                                            ''
                                        )}
                                    </Carousel>
                                ) : (
                                    <React.Fragment />
                                )}
                            </Col>
                            <Col span={24}>
                                <Row gutter={[24, 24]}>
                                    <Col xs={{ span: 24, order: 1 }} lg={{ span: 12, order: 1 }}>
                                        <Divider orientation="left">Information</Divider>
                                        <Descriptions size="small" column={2}>
                                            <Descriptions.Item label="Band">{show.band}</Descriptions.Item>
                                            <Descriptions.Item label="Date">
                                                {convertDateToHumanReadable(show.date)}
                                            </Descriptions.Item>
                                            <Descriptions.Item label="Venue">{show.venue}</Descriptions.Item>
                                            <Descriptions.Item label="City">{show.city}</Descriptions.Item>
                                            <Descriptions.Item label="Country">{show.country}</Descriptions.Item>
                                            <Descriptions.Item label="Tour">{show.tour}</Descriptions.Item>
                                        </Descriptions>
                                    </Col>
                                    <Col xs={{ span: 24, order: 2 }} lg={{ span: 12, order: 2 }}>
                                        <Divider orientation="left">General</Divider>
                                        <Descriptions size="small" column={2}>
                                            <Descriptions.Item label="Format">{show.format}</Descriptions.Item>
                                            <Descriptions.Item label="Full show">{show.isComplete}</Descriptions.Item>
                                            <Descriptions.Item label="Duration">
                                                {convertSecondsToTimeString(show.duration)}
                                            </Descriptions.Item>
                                            <Descriptions.Item label="Size">
                                                {convertSizeToHumanReadable(show.size)}
                                            </Descriptions.Item>
                                            <Descriptions.Item label="Taper">{show.taper}</Descriptions.Item>
                                            <Descriptions.Item label="Version">{show.version}</Descriptions.Item>
                                        </Descriptions>
                                    </Col>
                                    <Col xs={{ span: 24, order: 3 }} lg={{ span: 12, order: 3 }}>
                                        <Divider orientation="left">Audio</Divider>
                                        <Descriptions size="small" column={2}>
                                            <Descriptions.Item label="Format">{show.audioFormatList}</Descriptions.Item>
                                            <Descriptions.Item label="Source">{show.audioSource}</Descriptions.Item>
                                            <Descriptions.Item label="Sample size">
                                                {show.audioSampleSize}
                                            </Descriptions.Item>
                                            <Descriptions.Item label="Sample rate">
                                                {show.audioSampleRate}
                                            </Descriptions.Item>
                                            <Descriptions.Item label="Bit rate">{show.audioBitRate}</Descriptions.Item>
                                            <Descriptions.Item label="Quality">{`${show.audioQuality}/10`}</Descriptions.Item>
                                        </Descriptions>
                                    </Col>
                                    <Col xs={{ span: 24, order: 4 }} lg={{ span: 12, order: 4 }}>
                                        <Divider orientation="left">Video</Divider>
                                        <Descriptions size="small" column={2}>
                                            <Descriptions.Item label="Format">{show.videoFormatList}</Descriptions.Item>
                                            <Descriptions.Item label="Source">{show.videoSource}</Descriptions.Item>
                                            <Descriptions.Item label="Resolution">{show.resolution}</Descriptions.Item>
                                            <Descriptions.Item label="Framerate">{show.framerate}</Descriptions.Item>
                                            <Descriptions.Item label="Quality">{`${show.videoQuality}/10`}</Descriptions.Item>
                                        </Descriptions>
                                    </Col>
                                    <Col span={24} order={5}>
                                        <Divider orientation="left">Observations</Divider>
                                        {show.observations}
                                    </Col>
                                    <Col xs={{ span: 24, order: 6 }} md={{ span: 12, order: 6 }}>
                                        <Divider orientation="left">Band members</Divider>
                                        <Row justify={'start'} align={'top'} gutter={[24, 24]}>
                                            {show.members.length !== 0 ? (
                                                show.members.map((member, idx) => (
                                                    <Col key={`member_${idx}`}>
                                                        <Tooltip placement="top" title={member}>
                                                            <Avatar shape="square" size={40}>
                                                                {parseInitials(member)}
                                                            </Avatar>
                                                        </Tooltip>
                                                    </Col>
                                                ))
                                            ) : (
                                                <Col>
                                                    <p>No band members</p>
                                                </Col>
                                            )}
                                        </Row>
                                    </Col>
                                    <Col xs={{ span: 24, order: 7 }} md={{ span: 12, order: 7 }}>
                                        <Divider orientation="left">Guest musicians</Divider>
                                        <Row justify={'start'} align={'top'} gutter={[24, 24]}>
                                            {show.guests.length !== 0 ? (
                                                show.guests.map((guest, idx) => (
                                                    <Col key={`guest_${idx}`}>
                                                        <Tooltip placement="top" title={guest}>
                                                            <Avatar shape="square" size={40}>
                                                                {parseInitials(guest)}
                                                            </Avatar>
                                                        </Tooltip>
                                                    </Col>
                                                ))
                                            ) : (
                                                <Col>
                                                    <p>No guests</p>
                                                </Col>
                                            )}
                                        </Row>
                                    </Col>
                                    <Col xs={{ span: 24, order: 8 }} md={{ span: 12, order: 8 }}>
                                        <Divider orientation="left">Lineage</Divider>
                                        {show.lineage.length !== 0 ? (
                                            <Timeline
                                                items={show.lineage.map((lin) => ({
                                                    children: lin,
                                                    dot: lin === '?' ? <EllipsisOutlined /> : undefined,
                                                    color: lin === '?' ? 'red' : 'blue',
                                                }))}
                                            />
                                        ) : (
                                            <p>Unknown lineage</p>
                                        )}
                                    </Col>
                                    <Col xs={{ span: 24, order: 9 }} md={{ span: 12, order: 9 }}>
                                        <Divider orientation="left">Setlist</Divider>
                                        {show.setlist.length !== 0 ? (
                                            <ol>
                                                {show.setlist.map((song, idx) => (
                                                    <li key={`song_${idx}`}>{song}</li>
                                                ))}
                                            </ol>
                                        ) : (
                                            <p>Unknown setlist</p>
                                        )}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                </TradeabilityTag>
            </Col>
        </Row>
    );
};

export default BootlegPage;
