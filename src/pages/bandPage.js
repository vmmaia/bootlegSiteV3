import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { Col, Row, Spin, Card, Progress, Descriptions, List, Badge, Typography, Button, Alert } from 'antd';
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';

import Searcher from '../components/searcher/searcher';
import Comparer from '../components/comparer/comparer';

import { convertDateToHumanReadable, convertSecondsToTimeString, convertSizeToHumanReadable } from '../util/utils';

const BandPage = () => {
    const navigate = useNavigate();
    const bootlegsStore = useSelector((store) => store.bootlegs);

    const { band } = useParams();

    const [loading, setLoading] = useState(true);
    const [bandStats, setBandStats] = useState({});
    const [shows, setShows] = useState([]);
    const [showSearch, setShowSearch] = useState(false);
    const [showsAreFiltered, setShowsAreFiltered] = useState(false);
    const [showCompare, setShowCompare] = useState(false);

    const loadShows = () => {
        setBandStats(bootlegsStore.stats[band]);
        const s = bootlegsStore.bootlegs.filter((s) => s.band.toLowerCase().replace(' ', '') === band);

        if (s.length === 0) {
            navigate('/');
            return;
        }

        setShows(s);
        setLoading(false);
    };

    const renderShowListItem = (show, id) => {
        const prevTour = id === 0 ? show.tour : shows[id - 1].tour;

        const listItem = (
            <List.Item key={`show_${id}`} className="bandListItem" onClick={() => handleClickShow(show.id)}>
                <List.Item.Meta
                    title={`${convertDateToHumanReadable(show.date)} - ${show.venue}, ${show.city}, ${show.country}`}
                    description={`${show.format} | v${show.version} | ${convertSecondsToTimeString(
                        show.duration
                    )} | ${convertSizeToHumanReadable(show.size)}`}
                />
            </List.Item>
        );

        return (
            <React.Fragment>
                {prevTour !== show.tour || id === 0 ? (
                    <Typography.Title level={3} style={{ color: '#a20c23' }}>
                        {show.tour}
                    </Typography.Title>
                ) : (
                    <React.Fragment />
                )}

                {show.isRare ? (
                    <Badge.Ribbon key={`ribbon_${id}`} text="RT" color="orange">
                        {listItem}
                    </Badge.Ribbon>
                ) : show.notForTrade ? (
                    <Badge.Ribbon key={`ribbon_${id}`} text="NFT" color="red">
                        {listItem}
                    </Badge.Ribbon>
                ) : (
                    listItem
                )}
            </React.Fragment>
        );
    };

    const handleClickShow = (id) => {
        navigate(`/bootleg/${id}`);
    };

    const handleSearch = (filters) => {
        if (filters === false) {
            setShowSearch(false);
            resetSearch();
            return;
        }

        setLoading(true);
        setShowSearch(false);
        setShowsAreFiltered(true);

        let filteredShows = bootlegsStore.bootlegs.filter((s) => s.band.toLowerCase().replace(' ', '') === band);

        if (filters.year !== undefined) {
            filteredShows = filteredShows.filter(
                (s) => s.date >= new Date(`${filters.year}-01-01`) && s.date < new Date(`${filters.year + 1}-01-01`)
            );
        }

        if (filters.country !== undefined) {
            filteredShows = filteredShows.filter((s) => s.country === filters.country);
        }

        if (filters.tour !== undefined) {
            filteredShows = filteredShows.filter((s) => s.tour === filters.tour);
        }

        if (filters.audioSource !== undefined) {
            filteredShows = filteredShows.filter((s) => s.audioSource === filters.audioSource);
        }

        if (filters.videoSource !== undefined) {
            filteredShows = filteredShows.filter((s) => s.videoSource === filters.videoSource);
        }

        if (filters.audioFormat !== undefined) {
            filteredShows = filteredShows.filter((s) => s.audioFormatList === filters.audioFormat);
        }

        if (filters.videoFormat !== undefined) {
            filteredShows = filteredShows.filter((s) => s.videoFormatList === filters.videoFormat);
        }

        if (filters.format !== undefined) {
            filteredShows = filteredShows.filter((s) => s.format === filters.format);
        }

        if (filters.audioQuality && filters.audioQuality !== 0) {
            filteredShows = filteredShows.filter((s) => s.audioQuality === filters.audioQuality.toString());
        }

        if (filters.videoQuality && filters.videoQuality !== 0) {
            filteredShows = filteredShows.filter((s) => s.videoQuality === filters.videoQuality.toString());
        }

        if (filters.text !== undefined) {
            filteredShows = filteredShows.filter(
                (s) =>
                    s.venue.toLowerCase().includes(filters.text.toLowerCase()) ||
                    s.city.toLowerCase().includes(filters.text.toLowerCase()) ||
                    s.taper.toLowerCase().includes(filters.text.toLowerCase()) ||
                    s.observations.toLowerCase().includes(filters.text.toLowerCase()) ||
                    s.setlist.join(',').toLowerCase().includes(filters.text.toLowerCase()) ||
                    s.lineage.join(',').toLowerCase().includes(filters.text.toLowerCase()) ||
                    s.members.join(',').toLowerCase().includes(filters.text.toLowerCase()) ||
                    s.guests.join(',').toLowerCase().includes(filters.text.toLowerCase())
            );
        }

        setShows(filteredShows);
        setLoading(false);
    };

    const resetSearch = () => {
        setLoading(true);
        setShowsAreFiltered(false);
        const s = bootlegsStore.bootlegs.filter((s) => s.band.toLowerCase().replace(' ', '') === band);
        setShows(s);
        setLoading(false);
    };

    useEffect(() => {
        loadShows();
    }, []);

    return loading ? (
        <Row justify={'center'} align={'middle'} style={{ height: '100%' }}>
            <Col>
                <Spin indicator={<LoadingOutlined />} size="large" />
            </Col>
        </Row>
    ) : (
        <Row justify={'center'} align={'stretch'} gutter={[24, 24]}>
            <Searcher
                open={showSearch}
                stats={bootlegsStore.stats[band]}
                reset={!showsAreFiltered}
                onCancel={() => setShowSearch(false)}
                onOk={handleSearch}
            />
            <Comparer
                open={showCompare}
                shows={bootlegsStore.bootlegs.filter((s) => s.band.toLowerCase().replace(' ', '') === band)}
                onCancel={() => setShowCompare(false)}
            />
            <Col xs={24} lg={9}>
                <Card title="Statistics" style={{ height: '100%' }}>
                    <Row justify={'center'}>
                        <Col>
                            <img src={`/assets/bandLogos/${band}.png`} width="150" alt="band logo" />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Descriptions size="small" column={{ xs: 2, md: 3 }} style={{ marginTop: '15px' }}>
                                <Descriptions.Item label="Shows">{bandStats.totalShows}</Descriptions.Item>
                                <Descriptions.Item label="Countries">{bandStats.countries.length}</Descriptions.Item>
                                <Descriptions.Item label="Tours">{bandStats.tours.length}</Descriptions.Item>
                                <Descriptions.Item label="Years">{`${bandStats.years[0]} - ${
                                    bandStats.years[bandStats.years.length - 1]
                                }`}</Descriptions.Item>
                                <Descriptions.Item label="Time">
                                    {convertSecondsToTimeString(bandStats.totalTime)}
                                </Descriptions.Item>
                                <Descriptions.Item label="Size">
                                    {convertSizeToHumanReadable(bandStats.totalSize)}
                                </Descriptions.Item>
                            </Descriptions>
                        </Col>
                    </Row>
                </Card>
            </Col>
            <Col xs={24} lg={9}>
                <Card title="Rarity distribution" style={{ height: '100%' }}>
                    <Row gutter={[24, 24]}>
                        <Col span={8} style={{ textAlign: 'center' }}>
                            <Progress
                                type="circle"
                                strokeColor={'green'}
                                size={100}
                                percent={bandStats.tradeablePercent || 0}
                                format={() => bandStats.tradeable || 0}
                            />
                            <Typography.Title level={4} style={{ marginTop: '5px' }}>
                                Tradeable
                            </Typography.Title>
                        </Col>
                        <Col span={8} style={{ textAlign: 'center' }}>
                            <Progress
                                type="circle"
                                strokeColor={'orange'}
                                size={100}
                                percent={bandStats.rarePercent || 0}
                                format={() => bandStats.rare || 0}
                            />
                            <Typography.Title level={4} style={{ marginTop: '5px' }}>
                                RT
                            </Typography.Title>
                        </Col>
                        <Col span={8} style={{ textAlign: 'center' }}>
                            <Progress
                                type="circle"
                                strokeColor={'red'}
                                size={100}
                                percent={bandStats.notForTradePercent || 0}
                                format={() => bandStats.notForTrade || 0}
                            />
                            <Typography.Title level={4} style={{ marginTop: '5px' }}>
                                NFT
                            </Typography.Title>
                        </Col>
                    </Row>
                </Card>
            </Col>
            {showsAreFiltered ? (
                <Col xs={24} lg={18}>
                    <Alert
                        message="Warning"
                        description={
                            <Row justify={'space-between'} align={'middle'}>
                                <Col>
                                    <p>Some shows have been filtered.</p>
                                </Col>
                                <Col>
                                    <Button
                                        type="primary"
                                        onClick={resetSearch}
                                        style={{ backgroundColor: 'orange', color: 'black' }}
                                    >
                                        Show all
                                    </Button>
                                </Col>
                            </Row>
                        }
                        type="warning"
                        showIcon
                    />
                </Col>
            ) : (
                <React.Fragment />
            )}
            <Col xs={24} lg={18}>
                <Card
                    title={
                        <Row justify={'space-between'} align={'middle'}>
                            <Col>
                                <h3>Shows</h3>
                            </Col>
                            <Row gutter={[12, 12]}>
                                <Col>
                                    <Button onClick={() => setShowCompare(true)}>Compare shows</Button>
                                </Col>
                                <Col>
                                    <Button
                                        icon={<SearchOutlined />}
                                        type="primary"
                                        danger
                                        onClick={() => setShowSearch(true)}
                                    >
                                        Search
                                    </Button>
                                </Col>
                            </Row>
                        </Row>
                    }
                >
                    <List size="small" dataSource={shows} renderItem={(show, idx) => renderShowListItem(show, idx)} />
                </Card>
            </Col>
        </Row>
    );
};

export default BandPage;
