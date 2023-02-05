import { Button, Checkbox, Form, Input } from 'antd';
import { useEffect } from 'react';
import {
	cancellationExchange,
	resetValidator,
	validateWallet
} from '../../store/exchangeSlice';
import { useAppSelector, useAppDispatch } from '../../store/store';
import { addTransaction } from '../../store/transactionSlice';
import { exchangeData, TvalidatorWallet } from '../../types/storeTypes';
import { Ttransactoin } from '../../types/typesApp';
function ExchangerForm() {
	const selectedChanger = useAppSelector(
		(state) => state.exchange.selectedChanger
	);
	return selectedChanger ? (
		<RenderFormEx selectedChanger={selectedChanger} />
	) : (
		<h1>Ошибка! попробуйте другой обменник</h1>
	);
}

const RenderFormEx = ({
	selectedChanger
}: {
	selectedChanger: exchangeData;
}): JSX.Element => {
	const { addres1, addres2 } = useAppSelector(
		(state) => state.exchange.validationWallets
	);
	const dispatch = useAppDispatch();
	const [form] = Form.useForm();
	const { adapter, from, to, amountFrom, amountTo } = selectedChanger;

	useEffect(() => {
		dispatch(resetValidator());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const ValidateAddres = () => {
		const wallet1: TvalidatorWallet = {
			token: from,
			addres: form.getFieldValue('vallet1'),
			input: 1
		};
		const wallet2: TvalidatorWallet = {
			token: to,
			addres: form.getFieldValue('vallet2'),
			input: 2
		};
		dispatch(resetValidator());
		dispatch(validateWallet(wallet1));
		dispatch(validateWallet(wallet2));
	};

	const renderIconValidate = (status: boolean | null) => {
		switch (status) {
			case false:
				return 'Не прошел проверку!';
			case true:
				return 'Проверенно';
		}
	};

	const onSubmitForm = (formInfo: Ttransactoin) => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		dispatch(addTransaction({ ...selectedChanger, ...formInfo }));
		dispatch(cancellationExchange());
	};

	return (
		<div className='exchanger_modal'>
			<h2>Обменник - {adapter.toUpperCase() || ''}</h2>
			<h3>
				{amountFrom +
					(from.toUpperCase() || '') +
					' → ' +
					amountTo +
					(to.toUpperCase() || '')}
			</h3>
			<Form
				form={form}
				onFinish={onSubmitForm}
				name='exhange-req'
				autoComplete='true'
				layout='vertical'
				initialValues={{ remember: false }}
			>
				<Form.Item
					label={
						`Адрес кошелька ${from.toUpperCase()}` +
						' ' +
						(addres1 ? renderIconValidate(addres1.status) : '')
					}
					name='vallet1'
					rules={[
						{ required: true, message: 'Пожалуйста введите адрес кошелька' }
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label={
						`Адрес кошелька ${to.toUpperCase()}` +
						' ' +
						(addres2 ? renderIconValidate(addres2.status) : '')
					}
					name='vallet2'
					rules={[
						{ required: true, message: 'Пожалуйста введите адрес кошелька' }
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name='accept'
					valuePropName='checked'
					rules={[
						{
							validator: (_, value) =>
								value
									? Promise.resolve()
									: Promise.reject(new Error('Необходимо поставить галочку!'))
						}
					]}
				>
					<Checkbox>Согласен с правилами площадки</Checkbox>
				</Form.Item>
				<Form.Item style={{ display: 'flex' }}>
					<Button type='primary' htmlType='submit'>
						Создать транзакцию
					</Button>
					<Button
						type='dashed'
						style={{ marginLeft: '10px' }}
						htmlType='button'
						onClick={ValidateAddres}
					>
						Проверить кошельки
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default ExchangerForm;
