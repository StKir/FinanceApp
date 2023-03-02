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
import change from '../../assets/imgs/change.svg';
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
			<Form name='basic' className='mainForm' onFinish={onFinish}>
				<div className='forms_wrp'>
					<div className='send ex-block'>
						<span className='title'>Отправить</span>
						<div className='send-form'>
							<Input.Group compact className='inputs_wrp'>
								<Form.Item
									name='send'
									rules={[{ required: true, message: 'Обязательное поле' }]}
									initialValue={selectedData.send}
									className='token-wrp'
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
										className='input_amount'
										min={0.0001}
										placeholder='Вы отправляете'
									/>
								</Form.Item>
							</Input.Group>
						</div>
					</div>
					<img src={change} alt='change' className='change-img' />
					<div className='receive ex-block'>
						<div className='send-form'>
							<Input.Group compact className='inputs_wrp'>
								<Form.Item
									name='receive'
									rules={[{ required: true, message: 'Обязательное поле' }]}
									initialValue={selectedData.receive}
									className='token-wrp'
								>
									<Select
										className='input_token'
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
						<span className='title'>Получить</span>
					</div>
				</div>
				<Button
					size='large'
					type='primary'
					htmlType='submit'
					style={{
						display: 'flex',
						justifyContent: 'center'
					}}
				>
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
			className='input_amount'
			readOnly
			value={amount[0]?.amountTo || null}
			placeholder='Вы получите'
		/>
	);
}

export default ExchangerInput;
