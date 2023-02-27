import React from 'react';
import styled from 'styled-components';
import leftArrow from './left-arrow.png';
import rightArrow from './right-arrow.png';

interface DrawerHeaderProps {
    index: number | null;
    lastIndex: number;
    handleUpdateIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

const Layout = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 5px;
`

const DrawerHeader = ({index, lastIndex, handleUpdateIndex}: DrawerHeaderProps) => {
    const decreaseIndex = () => {
        if (!index || index === 1) return;
        handleUpdateIndex(index - 1); 
    }
    const increaseIndex = () => {
        if (!index || index === lastIndex) return;
        handleUpdateIndex(index + 1); 
    }
    
    if (!index) return null;
    return <Layout>
        <div style={{padding: '5px'}} onClick={decreaseIndex}><img src={leftArrow} /></div>
        <div>{index} / {lastIndex}</div>
        <div style={{padding: '5px'}} onClick={increaseIndex}><img src={rightArrow} /></div>
    </Layout>
}

export default DrawerHeader;