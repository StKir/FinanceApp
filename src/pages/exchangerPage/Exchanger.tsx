import ExchangerInput from '../../components/exchangerInput/ExchangerInput';
import { Col, Row } from 'antd';
function Catalog() {
	return (
		<div className='container'>
			<h1>Обменник</h1>
			<Row>
				<Col span={8}>
					<div className='content-grid'></div>
					<span style={{ fontSize: 18 }}>Шаг 1. Выберете криптовалюты</span>
					<ExchangerInput />
				</Col>
				<Col span={16}>col-12</Col>
			</Row>
		</div>
	);
}

export default Catalog;
