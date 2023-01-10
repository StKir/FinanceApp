import React, { useId, useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { login } from '../../store/authSlice';
import { useAppDispatch } from '../../store/store';
import { user } from '../../types/storeTypes';
function Login() {
	const [email, SetEmail] = useState<string>('');
	const [password, SetPassword] = useState<string>('');
	const [remember, SetRemember] = useState<boolean>(false);
	const dispatch = useAppDispatch();

	const id = useId(); //заглушка
	const onSubmitForm = (email: string, password: string, remember: boolean) => {
		const data: user = {
			id,
			email,
			password,
			remember
		};
		dispatch(login(data));
	};

	return (
		<>
			<h1 style={{ display: 'flex', justifyContent: 'center' }}>Вход</h1>
			<Form
				onFinish={() => onSubmitForm(email, password, remember)}
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
					rules={[{ required: true, message: 'Пожалуйста введите ваш email!' }]}
				>
					<Input value={email} onChange={(e) => SetEmail(e.target.value)} />
				</Form.Item>
				<Form.Item
					label='Пароль'
					name='password'
					rules={[
						{ required: true, message: 'Пожалуйста введите ваш пароль!' }
					]}
				>
					<Input.Password
						value={password}
						onChange={(e) => SetPassword(e.target.value)}
					/>
				</Form.Item>

				<Form.Item
					name='remember'
					valuePropName='checked'
					// wrapperCol={{ offset: 8, span: 16 }}
				>
					<Checkbox
						defaultChecked={remember}
						checked={remember}
						onChange={(e) => SetRemember(!remember)}
					>
						Запомнить меня
					</Checkbox>
				</Form.Item>

				<Form.Item style={{ display: 'flex' }}>
					<Button type='primary' htmlType='submit'>
						Войти
					</Button>
					<Button style={{ marginLeft: '10px' }} type='dashed'>
						Зарегистрироваться
					</Button>
				</Form.Item>
			</Form>
		</>
	);
}

export default Login;
