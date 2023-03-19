import { Button } from 'antd';
import { Link } from 'react-router-dom';
import emoji from '../../assets/imgs/notAuth.png';
import HelmetHead from '../../components/Helmet';

function Error404() {
	return (
		<>
			<HelmetHead title='404' content='error' />
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
						Ой, кажется такой страницы не существует!
					</h1>
					<div
						className='btnGroup'
						style={{ display: 'grid', justifyItems: 'center', gridGap: 10 }}
					>
						<Button type='primary' size={'large'}>
							<Link to={'/exchanger'}>Обменник</Link>
						</Button>
						<Button type='default' size={'large'}>
							<Link to={'/board'}>Доска</Link>
						</Button>
					</div>
				</div>
			</div>
		</>
	);
}

export default Error404;
