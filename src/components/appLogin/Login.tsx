import { Button, Checkbox, Form, Input } from 'antd';
import { login, changeTypeModal } from '../../store/authSlice';
import { useAppDispatch } from '../../store/store';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { loginUser } from '../../types/storeTypes';
import { useEffect, useState } from 'react';
import { useCheckAuth } from '../../hooks/useAuth';

function Login() {
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [form] = Form.useForm();
	const dispatch = useAppDispatch();
	const onSubmitForm = (value: loginUser): void => {
		const auth = getAuth();
		console.log(auth);
		signInWithEmailAndPassword(auth, value.email, value.password)
			.then(({ user }) =>
				dispatch(
					login({
						email: user.email,
						token: user.email,
						id: user.uid,
						login: user.providerData[0].displayName
					})
				)
			)
			.then(() => setErrorMessage(''))
			.catch((err) => errorSwitch(err.code));
	};

	useEffect(() => {
		return () => setErrorMessage('');
	});

	const errorSwitch = (massage: string): void => {
		switch (massage) {
			case 'auth/user-not-found':
				form.resetFields();
				setErrorMessage('Пользователь не найден!');
				break;
			case 'auth/wrong-password':
				setErrorMessage('Неверный пароль!');
				break;
			case 'auth/too-many-requests':
				setErrorMessage('Слишком много запросов, попробуйте позже!');
				break;
			default:
				setErrorMessage('Что-то пошло не так, попробуйте позже!');
		}
	};
	return (
		<>
			<h1 style={{ display: 'flex', justifyContent: 'center' }}>Вход</h1>
			<Form
				form={form}
				onFinish={onSubmitForm}
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
					<Input.Password />
				</Form.Item>
				<Form.Item name='remember' valuePropName='checked'>
					<Checkbox>Запомнить меня</Checkbox>
				</Form.Item>
				{Boolean(errorMessage) ? (
					<Form.Item>
						<span
							style={{
								marginBottom: 20,
								color: 'red',
								fontSize: 18
							}}
							className='error'
						>
							{errorMessage}
						</span>
					</Form.Item>
				) : null}
				<Form.Item style={{ display: 'flex' }}>
					<Button type='primary' htmlType='submit'>
						Войти
					</Button>
					<Button
						style={{ marginLeft: '10px' }}
						type='dashed'
						onClick={() => dispatch(changeTypeModal('reg'))}
					>
						Зарегистрироваться
					</Button>
				</Form.Item>
			</Form>
		</>
	);
}

export default Login;
