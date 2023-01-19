import { Row, Col, Statistic, Button } from 'antd';
import './exchangeOffer.scss';
import CountUp from 'react-countup';
import { exchangeData } from '../../types/storeTypes';
import { useAppDispatch } from '../../store/store';
import { selectChanger } from '../../store/exchangeSlice';

const formatter = (value: number, token: string) => (
	<CountUp start={0.0001} end={value} decimals={6} prefix={token + ' '} />
);

function ExchangeOffer(props: { data: exchangeData; acent: boolean }) {
	const dispatch = useAppDispatch();
	const {
		adapter,
		fromNetwork,
		toNetwork,
		amountFrom,
		amountTo,
		offerReferenceId,
		offerExpirationTime,
		quotaId
	} = props.data;

	const openModal = () => dispatch(selectChanger(props.data));

	return (
		<div className={'exchangeOffer' + (props.acent ? ' acent' : ' ')}>
			<Row gutter={16} className='exchange_info'>
				<Col span={6}>
					<Statistic title={'Название обменника'} value={adapter} />
				</Col>
				<Col span={6}>
					<Statistic
						title={`Отдаете ${fromNetwork}`}
						value={amountFrom}
						precision={2}
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
				<Col span={6}>
					<Button
						size='large'
						style={{
							display: 'flex',
							justifyContent: 'center',
							width: '100%'
						}}
						type='default'
						onClick={openModal}
					>
						Обменять
					</Button>
				</Col>
			</Row>
		</div>
	);
}

export default ExchangeOffer;
