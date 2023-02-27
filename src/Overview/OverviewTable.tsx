import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import workloadListJson from './workload-list.json';
import WorkloadCard, { WorkloadItemData } from './WorkloadCard/WorkloadCard';
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import WorkloadDrawer from './Drawer/WorkloadDrawer';
import DrawerHeader from './Drawer/DrawerHeader';

const Table = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 40px;
    background: #F3F2EF;
`

const OverviewTable = () => {
    const [workloadList, setWorkloadList] = useState([] as WorkloadItemData[]);
    const [selectedWorkload, setSelectedWorkload] = useState<number | null>(null);
    
    useEffect(() => {
        const fetchWorkloadList = () => {
            return JSON.parse(JSON.stringify(workloadListJson));
        }
        setWorkloadList(fetchWorkloadList)
    }, [])

    return <>
        <Drawer
            open={selectedWorkload != null}
            onClose={() => setSelectedWorkload(null)}
            direction='right'
            size='50vw'
        >
            <DrawerHeader
                index={selectedWorkload}
                lastIndex={workloadList.length}
                handleUpdateIndex={setSelectedWorkload}
            />
            <WorkloadDrawer entityId={selectedWorkload} />
        </Drawer>
        <Table>
            {workloadList.map((workloadItem, index) =>
                <div onClick={() => setSelectedWorkload(index + 1)}>
                    <WorkloadCard
                        key={workloadItem.entityId}
                        data={workloadItem}
                    />
                </div>)}
        </Table>
    </>;
};

export default OverviewTable;