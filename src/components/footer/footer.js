import React from 'react';
import { Layout } from 'antd';

const Footer = () => {
    return (
        <Layout.Footer
            style={{
                backgroundColor: '#a20c23',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px',
            }}
        >
            Designed and developed by Tafnwin - 2023
        </Layout.Footer>
    );
};

export default Footer;
