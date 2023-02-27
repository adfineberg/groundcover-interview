import React, { useState } from 'react';
import styled from 'styled-components';
import OverviewTable from './OverviewTable';
import { ReactComponent as Logo } from './overview-logo.svg';

const Layout = styled.div`
    display: flex;
    flex-direction: column;
`

const Header = styled.div`
    text-align: left;
    padding: 10px 40px;
    display: flex;
    justify-content: flex-start;
`

const OverviewPage = () => {
    return <Layout>
        <Header><Logo /> <b>OVERVIEW</b></Header>
        <OverviewTable />
    </Layout>
};

export default OverviewPage;