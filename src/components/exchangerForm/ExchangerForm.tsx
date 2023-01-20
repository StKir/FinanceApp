import { Button, Checkbox, Form, Input } from 'antd';
import axios from 'axios';
import { useAppSelector } from '../../store/store';
import { exchangeData } from '../../types/storeTypes';

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
	// const validataWallet = (infoTo, infoFrom) => {
	// 	const { walletTo, tokenTo } = infoTo;
	// 	const { walletFrom, tokenFrom } = infoFrom;
	// 	axios.get(
	// 		`https://api.swapzone.io/v1/exchange/validate/address?currency=${tokenTo}&address=${walletTo}`
	// 	);
	// };

	const { adapter, from, to, quotaId, amountFrom, amountTo } = selectedChanger;
	return (
		<div className='exchanger_modal'>
			<h2>Обменник - {adapter.toUpperCase()}</h2>
			<h3>
				{amountFrom + from.toUpperCase() + ' → ' + amountTo + to.toUpperCase()}
			</h3>
			<Form
				// onFinish={onSubmitForm}
				name='exhange-req'
				autoComplete='true'
				layout='vertical'
				initialValues={{ remember: false }}
			>
				<Form.Item
					label={`Адрес кошелька ${from.toUpperCase()}`}
					name='vallet1'
					rules={[
						{ required: true, message: 'Пожалуйста введите адрес кошелька' }
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label={`Адрес кошелька ${to.toUpperCase()}`}
					name='vallet2'
					rules={[
						{ required: true, message: 'Пожалуйста введите адрес кошелька' }
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name='remember'
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
					>
						Проверить кошельки
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default ExchangerForm;
