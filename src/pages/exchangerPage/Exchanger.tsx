import ExchangerInput from '../../components/exchangerInput/ExchangerInput';
import { Col, message, Row } from 'antd';
import { useAppSelector, useAppDispatch } from '../../store/store';
import { exhangeType } from '../../types/typesApp';
import ExchangeLoader from '../../components/exchangeLoader/ExchangeLoader';
import ExchangeOffer from '../../components/exchangeOffer/ExchangeOffer';
import { cancellationExchange, selectAll } from '../../store/exchangeSlice';
import { exchangeData } from '../../types/storeTypes';
import Modal from 'antd/es/modal/Modal';
import ExchangerForm from '../../components/exchangerForm/ExchangerForm';
import { useEffect } from 'react';
import { resetStatus } from '../../store/transactionSlice';
import { useCheckAuth } from '../../hooks/useAuth';

function Catalog() {
	const dispatch = useAppDispatch();
	const data: exhangeType = useAppSelector((state) => state.exchange.data);
	const adapters: exchangeData[] = useAppSelector(selectAll);
	const transactionStatus: string = useAppSelector(
		(state) => state.transaction.LoadingStatus
	);
	const [messageApi, contextHolder] = message.useMessage();
	const isOpen: boolean = useAppSelector(
		(state) => state.exchange.exchangeMoadal
	);
	useCheckAuth();

	useEffect(() => {
		switch (transactionStatus) {
			case 'loading':
				warning();
				break;
			case 'error':
				error();
				break;
			case 'idle':
				success();
				break;
			default:
				return;
		}
		// eslint-disable-next-line
	}, [transactionStatus]);

	const success = () => {
		messageApi.open({
			type: 'success',
			content: 'Транзакция добавлена в доску!'
		});
		dispatch(resetStatus());
	};

	const error = () => {
		messageApi.open({
			type: 'error',
			content: 'Ошибка при обработке транзакции, попробуйте еще раз!'
		});
		dispatch(resetStatus());
	};

	const warning = () => {
		messageApi.open({
			type: 'warning',
			content: 'Ожидайте!'
		});
	};

	const renderAdapters = (adapters: exchangeData[]): JSX.Element[] => {
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
			{contextHolder}
			<Modal
				open={isOpen}
				footer={null}
				onCancel={() => dispatch(cancellationExchange())}
			>
				Шаг 3. Введите данные для перевода
				<ExchangerForm />
			</Modal>
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
