import { useEffect } from 'react';
import './exchangerInput.scss';
import { Button, Form, Input, InputNumber, Select } from 'antd';
import { exhangeType } from '../../types/typesApp';
import { useAppDispatch, useAppSelector } from '../../store/store';
import {
	changeData,
	fetchExhangeData,
	getAllTokens,
	selectAll
} from '../../store/exchangeSlice';
function ExchangerInput() {
	const tokens = useAppSelector((state) => state.exchange.tokens);
	const selectedData = useAppSelector((state) => state.exchange.data);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (tokens.length === 1) {
			dispatch(getAllTokens());
		}
		if (selectedData.send) {
			onFinish(selectedData);
		}
		// eslint-disable-next-line
	}, [dispatch]);

	const onFinish = (value: exhangeType): void => {
		dispatch(changeData(value));
		dispatch(fetchExhangeData(value));
	};

	return (
		<div className='exhangerInput'>
			<Form name='basic' onFinish={onFinish}>
				<div className='send ex-block'>
					<span className='title'>Отправить</span>
					<div className='send-form'>
						<Input.Group compact>
							<Form.Item
								name='send'
								rules={[{ required: true, message: 'Обязательное поле' }]}
								initialValue={selectedData.send}
							>
								<Select
									showSearch
									optionFilterProp='children'
									style={{ width: 150 }}
									placeholder='Токен'
									filterOption={(input, option) =>
										(option?.label ?? '')
											.toLowerCase()
											.includes(input.toLowerCase())
									}
									options={tokens}
								></Select>
							</Form.Item>
							<Form.Item
								name='amount'
								rules={[{ required: true, message: 'Обязательное поле' }]}
								initialValue={selectedData.amount}
							>
								<InputNumber
									min={0.0001}
									placeholder='Кол-во'
									style={{ width: 200 }}
								/>
							</Form.Item>
						</Input.Group>
					</div>
				</div>
				<div className='receive ex-block'>
					<span className='title'>Получить</span>
					<div className='send-form'>
						<Input.Group compact>
							<Form.Item
								name='receive'
								rules={[{ required: true, message: 'Обязательное поле' }]}
								initialValue={selectedData.receive}
							>
								<Select
									showSearch
									optionFilterProp='children'
									style={{ width: 150 }}
									placeholder='Токен'
									filterOption={(input, option) =>
										(option?.label ?? '')
											.toLowerCase()
											.includes(input.toLowerCase())
									}
									options={tokens}
								></Select>
							</Form.Item>
							<AmountForm />
						</Input.Group>
					</div>
				</div>
				<Button size='large' type='primary' htmlType='submit'>
					Найти
				</Button>
			</Form>
		</div>
	);
}

function AmountForm() {
	const amount = useAppSelector(selectAll);
	return (
		<InputNumber
			readOnly
			value={amount[0]?.amountTo || null}
			placeholder='Вы получите'
			style={{ width: 200 }}
		/>
	);
}

export default ExchangerInput;
