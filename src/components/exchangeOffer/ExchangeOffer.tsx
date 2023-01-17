import { Row, Col, Statistic } from 'antd';
import './exchangeOffer.scss';
import CountUp from 'react-countup';
import { exchangeData } from '../../types/storeTypes';

const formatter = (value: number, token: string) => (
	<CountUp start={0.0001} end={value} decimals={5} prefix={token + ' '} />
);

function ExchangeOffer({ data }: any) {
	const {
		adapter,
		fromNetwork,
		toNetwork,
		amountFrom,
		amountTo,
		offerReferenceId,
		offerExpirationTime,
		quotaId
	}: exchangeData = data;
	console.log(data);

	return (
		<div className='exchangeOffer'>
			<Row gutter={16}>
				<Col span={6}>
					Название обменника
					<h1 style={{ marginTop: 5 }}>{adapter}</h1>
				</Col>
				<Col span={6}>
					<Statistic
						title={`Отдаете ${fromNetwork}`}
						value={amountFrom}
						precision={5}
						formatter={() => formatter(amountFrom, fromNetwork)}
					/>
				</Col>
				<Col span={6}>
					<Statistic
						title={`Получаете ${toNetwork}`}
						value={amountTo}
						precision={2}
						formatter={() => formatter(Number(amountTo), toNetwork)}
					/>
				</Col>
			</Row>
		</div>
	);
}

export default ExchangeOffer;
