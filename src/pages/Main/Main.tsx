import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { useCheckAuth } from '../../hooks/useAuth';
import { changeTypeModal, checkAuth, openModal } from '../../store/authSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import MainPageBtcImg from '../../assets/imgs/btcMainPage.png';
import './mainPage.scss';

function Main() {
	const logStatus = useAppSelector(checkAuth);
	useCheckAuth();

	return (
		<>
			<section className='mainOffer'>
				<div className='container'>
					<div className='MainOffer-wrp'>
						<div className='mainOffer__offer'>
							<h1>Обменивай крипту сколько хочешь и когда хочешь!</h1>
							<span className='offer_span'>
								Безлимитные обмены, с комиссией всего 0.05%
							</span>
							<div className='offer_btn-group'>
								{logStatus ? <LogBtnGroup /> : <RegBtnGroup />}
							</div>
						</div>
						<img
							src={MainPageBtcImg}
							className='MainOffer-imgs-img1'
							alt='MainPageBtcImg'
						/>
					</div>
				</div>
			</section>
			<section className='EducationBlock'>
				<div className='container'>
					<div className='EducationBlock--item'></div>
				</div>
			</section>
		</>
	);
}

const RegBtnGroup = () => {
	const dispatch = useAppDispatch();

	const handlReg = () => {
		dispatch(openModal(true));
		dispatch(changeTypeModal('reg'));
	};
	return (
		<>
			<Button type='primary' onClick={handlReg} size={'large'}>
				Регистрация
			</Button>
			<Button type='default' size={'large'}>
				Подробнее
			</Button>
		</>
	);
};

const LogBtnGroup = () => {
	return (
		<>
			<Button type='primary' size={'large'}>
				<Link to={'/exchanger'}>Обменник</Link>
			</Button>
			<Button type='default' size={'large'}>
				<Link to={'/board'}>Доска</Link>
			</Button>
		</>
	);
};

export default Main;
