import ExchangerInput from '../../components/exchangerInput/ExchangerInput';
import { Col, Row } from 'antd';
import { useAppSelector } from '../../store/store';
import { exhangeType } from '../../types/typesApp';
import ExchangeLoader from '../../components/exchangeLoader/ExchangeLoader';
import ExchangeOffer from '../../components/exchangeOffer/ExchangeOffer';
import { selectAll } from '../../store/exchangeSlice';
import { exchangeData } from '../../types/storeTypes';

function Catalog() {
	const data: exhangeType = useAppSelector((state) => state.exchange.data);
	const adapters: exchangeData[] = useAppSelector(selectAll);

	const renderAdapters = (adapters: exchangeData[]) => {
		return adapters.map((el, i) => {
			if (i === 0) {
				return <ExchangeOffer data={el} acent={true} key={el.id} />;
			} else {
				return <ExchangeOffer data={el} acent={false} key={el.id} />;
			}
		});
	};

	const list = renderAdapters(adapters);
	return (
		<div className='container'>
			<h1>Обменник</h1>
			<Row>
				<Col span={8}>
					<div className='content-grid'></div>
					<span style={{ fontSize: 18 }}>Шаг 1. Выберете криптовалюты</span>
					<ExchangerInput />
				</Col>
				{data.send ? (
					<Col span={16}>
						<span style={{ fontSize: 18 }}>Шаг 2. Выберете условия обмена</span>
						<ExchangeLoader />
						{list}
					</Col>
				) : null}
			</Row>
		</div>
	);
}

export default Catalog;
