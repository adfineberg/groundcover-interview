import React from 'react';
import styled from 'styled-components';
import Chart from "react-apexcharts";
import { ReactComponent as CpuChipLogo } from './cpu-chip.svg';

export interface InfrastructureChartProps {
    title: string;
    resources: InfrastructureChartResources[]
}

export interface InfrastructureChartResources {
    resource: string, // the series' label
    velocity: [
        [
            number, //unix timestmap
            number //issues count
        ]
    ] // velocity is an array of arrays, each internal array represents a data point of the graph
}

const ChartCard = styled.div`
    box-sizing: border-box;

    background: #FFFFFF;
    border: 0.49599px solid rgba(0, 0, 0, 0.3);
    box-shadow: 0px 0.991981px 0.49599px rgba(0, 0, 0, 0.15);
    border-radius: 7.93585px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const Header = styled.div`
    display: flex;
    justify-content: flex-start;
    padding: 10px;
    align-items: center;
`

const InfrastructureChart = ({ title, resources }: InfrastructureChartProps) => {
    const options = {
        chart: {
            toolbar: {
                show: false,
            }
        },
        stroke: {
            width: 1,
        },
        colors: ['#FF5DA0','#0066FF', '#FFDE54'],
        legend: {
            show: true,
            position: 'right',
            horizontalAlign: 'left',
            markers: {
                radius: 0,
            }
        },
        grid: {
            show: false,
        },
        xaxis: {
            type: 'datetime',
            tickPlacement: 'between',
            labels: {
                hideOverlappingLabels: true,
                rotate: 0,
            }
        },
        yaxis: {
            decimalsInFloat: 0,
        }
    }
    const series = resources.map((resource) => {
        return {
            type: 'line',
            name: resource.resource,
            data: resource.velocity
        }
    })

    return <ChartCard>
        <Header>
            <CpuChipLogo/>
            <span style={{padding: '5px'}}>{title}</span>
        </Header>
        <div>
            <Chart
                // The options throw a type error, but load correctly
                // @ts-ignore
                options={options}
                series={series}
                type="line"
                height="150px"
            />
        </div>
    </ChartCard>
}

export default InfrastructureChart;