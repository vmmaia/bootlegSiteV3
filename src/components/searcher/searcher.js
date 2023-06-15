import React, { useEffect } from 'react';

import { Row, Col, Modal, Button, Form, Select, Input, Divider, Slider } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';

const Searcher = (props) => {
    const [searchForm] = Form.useForm();

    const handleClose = () => {
        props.onCancel();
    };

    const handleSubmit = (formValues) => {
        props.onOk(formValues);
    };

    useEffect(() => {
        if (props.reset) {
            searchForm.resetFields();
        }
    }, [props.reset]);

    return (
        <Modal
            title="Search"
            open={props.open}
            onCancel={handleClose}
            footer={
                <Row justify={'space-between'} align={'middle'}>
                    <Col>
                        <Button key="reset" danger icon={<ReloadOutlined />} onClick={() => handleSubmit(false)}>
                            Reset
                        </Button>
                    </Col>
                    <Col>
                        <Row justify={'center'} align={'middle'} gutter={[12, 0]}>
                            <Col>
                                <Button key="close" onClick={handleClose}>
                                    Close
                                </Button>
                            </Col>
                            <Col>
                                <Button
                                    key="submit"
                                    type="primary"
                                    icon={<SearchOutlined />}
                                    onClick={() => searchForm.submit()}
                                >
                                    Search
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            }
        >
            <Form layout="vertical" form={searchForm} onFinish={handleSubmit}>
                <Row justify={'center'} align={'middle'} gutter={[24, 0]}>
                    <Col span={24}>
                        <Form.Item name="text" label="Find">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Divider />
                    <Col span={12}>
                        <Form.Item name="year" label="Year">
                            <Select
                                allowClear
                                options={props.stats.years.map((item) => ({ value: item, label: item }))}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="country" label="Country">
                            <Select
                                allowClear
                                options={props.stats.countries.map((item) => ({ value: item, label: item }))}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item name="tour" label="Tours">
                            <Select
                                allowClear
                                options={props.stats.tours.map((item) => ({ value: item, label: item }))}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="audioSource" label="Audio source">
                            <Select
                                allowClear
                                options={props.stats.audioSources.map((item) => ({ value: item, label: item }))}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="videoSource" label="Video source">
                            <Select
                                allowClear
                                options={props.stats.videoSources.map((item) => ({ value: item, label: item }))}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="audioFormat" label="Audio format">
                            <Select
                                allowClear
                                options={props.stats.audioFormats.map((item) => ({ value: item, label: item }))}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="videoFormat" label="Video format">
                            <Select
                                allowClear
                                options={props.stats.videoFormats.map((item) => ({ value: item, label: item }))}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="audioQuality" label="Audio quality (1-10)">
                            <Slider min={0} max={10} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="videoQuality" label="Video quality (1-10)">
                            <Slider min={0} max={10} />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item name="format" label="Format">
                            <Select
                                allowClear
                                options={props.stats.formats.map((item) => ({ value: item, label: item }))}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default Searcher;
