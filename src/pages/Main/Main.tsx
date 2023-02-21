import { Button } from 'antd';
import Title from 'antd/es/typography/Title';
import { Link } from 'react-router-dom';
import { useCheckAuth } from '../../hooks/useAuth';

function Main() {
	useCheckAuth();
	return (
		<>
			<section className='mainOffer'>
				<div className='container'>
					<div className='mainOffer__offer'>
						<h1>Обменивай крипту сколько хочешь и когда хочешь!</h1>
						<span className='offer_span'>
							Безлимитные обмены, с комиссией всего 0.05%
						</span>
						<div className='offer_btn-group'>
							<Button type='primary'>
								{/* <Link to={'/news'}>asdsad</Link> */}
							</Button>
							<Button type='default'>Подробнее</Button>
						</div>
					</div>
					<img src='' alt='' />
				</div>
			</section>
		</>
	);
}

export default Main;
