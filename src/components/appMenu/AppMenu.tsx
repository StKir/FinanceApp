import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Link, Router } from 'react-router-dom';
import { routeNames } from '../../routes';
import { useAppSelector } from '../../store/store';
import { checkAuth } from '../../store/authSlice';
import { Button } from 'antd';
import logo from '../../assets/logo.png';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';

const { Header } = Layout;

function AppMenu() {
	const isAuth = useAppSelector(checkAuth);

	const items = routeNames
		.sort((el, el2) => el.id - el2.id)
		.filter((el) => (isAuth ? el : el.auth === isAuth))
		.map(({ name, route, id }) => ({
			key: id,
			label: (
				<Link
					to={route}
					style={{
						height: '70px',
						display: 'inline-flex',
						alignItems: 'center'
					}}
				>
					{name}
				</Link>
			)
		}));
	return (
		<Layout>
			<Header
				style={{
					position: 'sticky',
					top: 0,
					zIndex: 1,
					width: '100%',
					height: '70px',
					background: '#FFFFFF',
					boxShadow: '0px 4px 40px rgba(0, 0, 0, 0.15)'
				}}
			>
				<div
					className='left-side-menu'
					style={{
						display: 'flex',
						alignItems: 'center'
					}}
				>
					<Link to={'/'} style={{ display: 'flex', alignItems: 'center' }}>
						<img
							src={logo}
							alt='logo'
							className='logotype'
							style={{ width: '150px' }}
						/>
					</Link>
					<Menu
						theme='light'
						mode='horizontal'
						defaultSelectedKeys={['1']}
						style={{
							background: '#FFFFFF',
							// height: '70px',
							display: 'flex',
							alignItems: 'center',
							width: '100%'
						}}
						items={items}
					/>
					<Space>
						<Avatar
							size={40}
							style={{ backgroundColor: '#29B32E', marginRight: '20px' }}
							src={isAuth ? null : null}
							icon={<UserOutlined />}
						/>
					</Space>
					<div className='right-side-menu'>
						<Button>{isAuth ? 'Выйти' : 'Войти'}</Button>
					</div>
				</div>
			</Header>
		</Layout>
	);
}

export default AppMenu;
