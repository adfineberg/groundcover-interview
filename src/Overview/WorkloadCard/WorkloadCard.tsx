import React from 'react';
import styled from 'styled-components';
import { ReactComponent as HealthyLogo } from './healthy.svg';
import { ReactComponent as SickLogo } from './sick.svg';
import protocolSeparator from './protocol-separator.png'
import WorkloadVelocity from './WorkloadVelocity';


enum Status {
	Sick = 0, Healthy = 1
}

const Card = styled.div<{ status: Status }>`
	display: flex;
	border: 0.663583px solid rgba(51, 51, 51, 0.1);
	box-shadow: 0px 0.5px 0.5px rgba(0, 0, 0, 0.14);
	border-radius: 8px;
	justify-content: space-around;
	margin: 10px;
	height: 200px;
	background: ${(props) => props.status === Status.Healthy ? "#FFFFFF" : "#EDF6FF"}
`

const Left = styled.div`
	display: flex;
	flex-direction: column;
	font: Roboto;
	padding: 20px;
	justify-content: space-around;
`

const Issues = styled.div`
	font: 18px;
`

const CardDivider = styled.hr`
	border: 0.7963px solid rgba(64, 65, 69, 0.1);
	margin: 0 1rem 0 1rem;
`

const Right = styled.div`
	display: flex;
	flex-direction: column;
	padding: 20px;
	justify-content: center;
	align-items: flex-start;
	width: 200px;
`

const Protocols = styled.div`
	display: flex;
	align-items: center;
`

export interface WorkloadItemData {
	entityId: string, // workload's identifier
	issuesCount: number, // the amount of issues attached to the workload
	namespace: string, // workload's namespace. (namespace is an isolated group of workloads)
	workload: string, // the workload's readable name
	protocols: string[], // all protocols the workload communicates with
	status: Status // the workload's health status - 0 means that the workload is sick, 1 means its healthy
}

const WorkloadCard = ({ data }: { data: WorkloadItemData }) => {
	return <Card status={data.status}>
		<Left>
			<div>
				{data.status === Status.Healthy ? <HealthyLogo /> : <SickLogo />}
			</div>
			<Issues>
				{data.issuesCount}
			</Issues>
			<div style={{ font: '8px' }}>ISSUES</div>
		</Left>
		<CardDivider />
		<Right>
			<div style={{ font: 'Lato' }}>{data.workload}</div>
			<div>{data.namespace}</div>
			<WorkloadVelocity entityId={data.entityId} />
			<div>
				{data.protocols.map((protocol, index) => {
					return <>
						<span key={protocol}>{protocol}</span>
						{/* Add a separator only between the protocols */}
						{(index < data.protocols.length - 1) && (<img src={protocolSeparator} alt='separator' />)}
					</>
				}
				)}
			</div>
		</Right>
	</Card>;
};

export default WorkloadCard;