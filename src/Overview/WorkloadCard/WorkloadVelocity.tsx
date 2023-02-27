import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Chart from "react-apexcharts";
import workloadVelocityJson from './workload-velocity.json';

interface WorkloadVelocityData {
    entityId: string, // workload's identifier
    velocity: [
        [
            number, //unix timestmap
            string //issues count
        ]
    ] // velocity is an array of arrays, each internal array represents a data point of the graph
}

const WorkloadVelocity = ({ entityId }: { entityId: string }) => {
    const options = {
        chart: {
            id: `workload-velocity-${entityId}`,
            toolbar: {
                show: false,
            }
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false
        },
        grid: {
            show: false,
        },
        colors: ['#3333334D'],
        yaxis: {
            labels: { show: false },
        },
        xaxis: {
            labels: { show: false },
        }
    };

    const [seriesData, setSeriesData] = useState<number[]>([])

    useEffect(() => {
        const fetchSeries = () => {
            const allVelocityData = JSON.parse(JSON.stringify(workloadVelocityJson))
            const velocityData: WorkloadVelocityData = allVelocityData.velocities.find(
                (velocityData: WorkloadVelocityData) => velocityData.entityId === entityId);
            const data: number[] = velocityData?.velocity.map((tuple: unknown[]) => tuple[1] as number)
            return data
        }
        setSeriesData(fetchSeries)
    }, [entityId])

    return seriesData && 
        (<Chart
        options={options}
        series={[{ data: seriesData }]}
        type="bar"
        height="75px" />);
}

export default WorkloadVelocity;