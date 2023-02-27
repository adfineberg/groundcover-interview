import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import InfrastructureChart, { InfrastructureChartProps, InfrastructureChartResources } from './InfrastructureChart';
import resourcesJson from './cpu-memory-velocity.json'

interface ParsedResources {
    cpu: InfrastructureChartResources[];
    memory: InfrastructureChartResources[];
}

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 30px;
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), #F3F2EF;
    border: 1.03991px solid rgba(121, 118, 118, 0.18);
`

const WorkloadDrawer = ({ entityId }: { entityId: number | null }) => {
    const [resources, setResources] = useState<ParsedResources>()
    useEffect(() => {
        const fetchResources = () => {
            const rawResources = JSON.parse(JSON.stringify(resourcesJson));
            const parseResources: (key: string) => InfrastructureChartResources[] =
                // Cast the JSON to the correct types
                (key: string) => {
                    return rawResources[key]
                        .map(({ resource, velocity }: { resource: string, velocity: unknown[][] }) => {
                            return {
                                resource,
                                velocity: velocity.map((marker) =>
                                    [marker[0] as number, marker[1] as number])
                            }
                        })
                }
            return {
                cpu: parseResources('cpu'),
                memory: parseResources('memory')
            }
        }
        setResources(fetchResources())
    }, [])

    return !resources?.cpu ? null : <Layout>
        <InfrastructureChart title='CPU' resources={resources?.cpu} />
        <InfrastructureChart title='MEMORY' resources={resources?.memory} />
    </Layout>;
}

export default WorkloadDrawer;