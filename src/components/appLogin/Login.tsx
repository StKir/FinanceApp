import { Button, Checkbox, Form, Input } from 'antd';
import { login, changeTypeModal } from '../../store/authSlice';
import { useAppDispatch } from '../../store/store';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { loginUser } from '../../types/storeTypes';

function Login() {
	const dispatch = useAppDispatch();
	const onSubmitForm = (value: loginUser): void => {
		const auth = getAuth();
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
			.catch((err) => console.log(err));
	};

	return (
		<>
			<h1 style={{ display: 'flex', justifyContent: 'center' }}>Вход</h1>
			<Form
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
