import React, { useState } from 'react';
import { Col, Row, Modal, Button, Select, Divider, Typography, Table } from 'antd';

import { useNavigate } from 'react-router-dom';

import { ReloadOutlined } from '@ant-design/icons';
import { convertDateToHumanReadable, convertSecondsToTimeString, convertSizeToHumanReadable } from '../../util/utils';

const Comparer = (props) => {
    const navigate = useNavigate();
    const [selectIds, setSelectIds] = useState([]);
    const [showsToCompare, setShowsToCompare] = useState([]);

    const columns = [
        { key: 'date', title: 'Date', dataIndex: 'date', render: (data) => convertDateToHumanReadable(data) },
        { key: 'tour', title: 'Tour', dataIndex: 'tour' },
        { key: 'venue', title: 'Venue', dataIndex: 'venue' },
        { key: 'city', title: 'City', dataIndex: 'city' },
        { key: 'country', title: 'Country', dataIndex: 'country' },
        { key: 'fileFormat', title: 'Format', dataIndex: 'format' },
        { key: 'audioFormat', title: 'Audio format', dataIndex: 'audioFormatList' },
        { key: 'audioSource', title: 'Audio source', dataIndex: 'audioSource' },
        { key: 'audioquality', title: 'Audio quality', dataIndex: 'audioQuality' },
        { key: 'audioSampleSize', title: 'Audio samp. size', dataIndex: 'audioSampleSize' },
        { key: 'audioSampleRate', title: 'Audio samp. rate', dataIndex: 'audioSampleRate' },
        { key: 'audioBitRate', title: 'Auido bit rate', dataIndex: 'audioBitRate' },
        { key: 'videoFormat', title: 'Video format', dataIndex: 'videoFormatList' },
        { key: 'videoSource', title: 'Video source', dataIndex: 'videoSource' },
        { key: 'videoQuality', title: 'Video quality', dataIndex: 'videoQuality' },
        { key: 'resolution', title: 'Resolution', dataIndex: 'resolution' },
        { key: 'framerate', title: 'Framerate', dataIndex: 'framerate' },
        { key: 'taper', title: 'Taper', dataIndex: 'taper' },
        { key: 'version', title: 'Version', dataIndex: 'version' },
        {
            key: 'duration',
            title: 'Duration',
            dataIndex: 'duration',
            render: (data) => convertSecondsToTimeString(data),
        },
        { key: 'size', title: 'Size', dataIndex: 'size', render: (data) => convertSizeToHumanReadable(data) },
        { key: 'fullShow', title: 'Full show', dataIndex: 'isComplete' },
        { key: 'rt', title: 'RT', dataIndex: 'isRare', render: (data) => (data ? 'Yes' : 'No') },
        { key: 'nft', title: 'NFT', dataIndex: 'notForTrade', render: (data) => (data ? 'Yes' : 'No') },
        {
            key: 'page',
            title: 'Page',
            dataIndex: 'page',
            render: (data) => (
                <Button type="primary" onClick={() => navigate(`/bootleg/${data}`)}>
                    Show page
                </Button>
            ),
        },
    ];

    const buildTableData = (id) => {
        const show = props.shows[id];

        return {
            ...show,
            key: show.id,
            page: show.id,
        };
    };

    const handleClose = () => {
        props.onCancel();
    };

    const handleSelectChange = (idsToCompare) => {
        setSelectIds(idsToCompare);
        setShowsToCompare(idsToCompare.map((id) => buildTableData(id)));
    };

    const options = props.shows.map((show, idx) => ({
        value: idx,
        label: `${convertDateToHumanReadable(show.date)} - ${show.venue}, ${show.country} - ${show.format} v${
            show.version
        }`,
    }));

    return (
        <Modal
            title="Compare shows"
            open={props.open}
            onCancel={handleClose}
            width={Math.max((window.innerWidth * 75) / 100, 520)}
            footer={
                <Row justify={'space-between'} align={'middle'}>
                    <Col>
                        <Button
                            key="reset"
                            danger
                            icon={<ReloadOutlined />}
                            onClick={() => {
                                setSelectIds([]);
                                setShowsToCompare([]);
                            }}
                        >
                            Reset
                        </Button>
                    </Col>
                    <Col>
                        <Button key="close" type="primary" onClick={handleClose}>
                            Close
                        </Button>
                    </Col>
                </Row>
            }
        >
            <Row justify={'center'} align={'middle'} gutter={[24, 24]}>
                <Col span={24}>
                    <Typography.Title level={5}>Shows to compare</Typography.Title>
                    <Select
                        mode="multiple"
                        value={selectIds}
                        onChange={handleSelectChange}
                        style={{ width: '100%' }}
                        options={options}
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                    />
                    <Divider />
                </Col>
                <Col span={24}>
                    <div style={{ width: '100%' }}>
                        <Table columns={columns} dataSource={showsToCompare} scroll={{ x: true }} />
                    </div>
                </Col>
            </Row>
        </Modal>
    );
};

export default Comparer;
