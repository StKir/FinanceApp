import React, { useState, useEffect } from 'react';
import './exchangerInput.scss';
import { Button, Form, Input, InputNumber, Select } from 'antd';
import axios from 'axios';
import { exhangeTokens, exhangeType } from '../../types/typesApp';
import { useAppDispatch, useAppSelector } from '../../store/store';
import {
	changeData,
	fetchExhangeData,
	refreshData,
	selectAll
} from '../../store/exchangeSlice';
function ExchangerInput() {
	const [coins, SetCoins] = useState<{ value: string; label: string }[]>([]);
	const amount = useAppSelector(selectAll);
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(refreshData());
		getOptions();
	}, [dispatch]);

	const getOptions = async () => {
		return await axios({
			method: 'GET',
			headers: {
				'x-api-key': 'wqDOuFGv1'
			},
			url: 'https://api.swapzone.io/v1/exchange/currencies'
		}).then((data) =>
			SetCoins(
				data.data.map((el: exhangeTokens) => ({
					value: el.ticker,
					label: el.ticker
				}))
			)
		);
	};

	const onFinish = (value: exhangeType) => {
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
									options={coins}
								></Select>
							</Form.Item>
							<Form.Item
								name='amount'
								rules={[{ required: true, message: 'Обязательное поле' }]}
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
									options={coins}
								></Select>
							</Form.Item>
							<InputNumber
								readOnly
								value={amount[0]?.amountTo || 0}
								placeholder='Вы получите'
								style={{ width: 200 }}
							/>
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

export default ExchangerInput;
