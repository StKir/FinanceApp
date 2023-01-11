import { Button, Form, Input } from 'antd';
import { useAppDispatch } from '../../store/store';
import { login, changeTypeModal } from '../../store/authSlice';
import { user } from '../../types/storeTypes';

function Registration() {
	const dispatch = useAppDispatch();

	const onFinish = (value: user) => {
		console.log(value);
		dispatch(login(value));
	};
	return (
		<>
			<h1 style={{ display: 'flex', justifyContent: 'center' }}>Регистрация</h1>
			<Form
				onFinish={onFinish}
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
					label='Ваше имя'
					name='name'
					rules={[{ required: true, message: 'Пожалуйста введите ваше имя!' }]}
				>
					<Input />
				</Form.Item>
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
					name='password'
					label='Пароль'
					rules={[
						{
							required: true,
							message: 'Введите пароль'
						},
						{
							min: 6,
							message: 'Пароль должен содержать минимум 6 символов'
						}
					]}
					hasFeedback
				>
					<Input.Password />
				</Form.Item>

				<Form.Item
					name='confirm'
					label='Повторите пароль'
					dependencies={['password']}
					hasFeedback
					rules={[
						{
							required: true,
							message: 'Пожалуйста повторите ваш пароль'
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue('password') === value) {
									return Promise.resolve();
								}
								return Promise.reject(new Error('Пароли не совпадают'));
							}
						})
					]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item style={{ display: 'flex' }}>
					<Button
						type='dashed'
						onClick={() => dispatch(changeTypeModal('log'))}
					>
						Войти
					</Button>
					<Button
						style={{ marginLeft: '10px' }}
						type='primary'
						htmlType='submit'
						// onClick={() => dispatch(changeTypeModal('reg'))}
					>
						Зарегистрироваться
					</Button>
				</Form.Item>
			</Form>
		</>
	);
}

export default Registration;
