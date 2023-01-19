import { Button, Checkbox, Form, Input } from 'antd';
import { useAppSelector } from '../../store/store';

function ExchangerForm() {
	const selectedChanger = useAppSelector(
		(state) => state.exchange.selectedChanger
	);
	return (
		<>
			<h2>Обменник - {selectedChanger?.adapter.toUpperCase()}</h2>
			<h3>
				{selectedChanger
					? selectedChanger.amountFrom +
					  selectedChanger.from.toUpperCase() +
					  ' → ' +
					  selectedChanger.amountTo +
					  selectedChanger.to.toUpperCase()
					: null}
			</h3>
			<Form
				// onFinish={onSubmitForm}
				name='basic'
				initialValues={{ remember: true }}
				autoComplete='true'
				layout='vertical'
				style={{
					padding: '25px',
					paddingTop: '0'
				}}
			>
				<Form.Item
					label='Email'
					name='email'
					rules={[
						{ required: true, message: 'Пожалуйста введите ваш email!' },
						{
							type: 'email',
							message: 'Не правильная почта'
						}
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label='Пароль'
					name='password'
					rules={[
						{ required: true, message: 'Пожалуйста введите ваш пароль!' }
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item style={{ display: 'flex' }}>
					<Button type='primary' htmlType='submit'>
						Войти
					</Button>
				</Form.Item>
			</Form>
		</>
	);
}

export default ExchangerForm;
