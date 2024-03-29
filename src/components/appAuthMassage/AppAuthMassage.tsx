import { Button } from 'antd';
import emoji from '../../assets/imgs/notAuth.png';
import { changeTypeModal, openModal } from '../../store/authSlice';
import { useAppDispatch } from '../../store/store';
import HelmetHead from '../Helmet';

function AppAuthMassage() {
	const dispatch = useAppDispatch();
	const handlReg = (type: 'log' | 'reg') => {
		dispatch(openModal(true));
		dispatch(changeTypeModal(type));
	};
	return (
		<>
			<HelmetHead title='Ошибка' content='error not auth' />
			<div className='container'>
				<div
					className='notAuthMassage'
					style={{
						width: '100%',
						display: 'grid',
						justifyItems: 'center',
						marginTop: 30
					}}
				>
					<img src={emoji} alt='emoji' />
					<h1
						style={{
							textAlign: 'center'
						}}
					>
						Ой, кажется вы не зарегистрированны!
					</h1>
					<div
						className='btnGroup'
						style={{ display: 'grid', justifyItems: 'center', gridGap: 10 }}
					>
						<Button
							type='primary'
							onClick={() => handlReg('reg')}
							size={'large'}
						>
							Регистрация
						</Button>
						<Button
							type='default'
							onClick={() => handlReg('log')}
							size={'large'}
						>
							Войти
						</Button>
					</div>
				</div>
			</div>
		</>
	);
}

export default AppAuthMassage;
