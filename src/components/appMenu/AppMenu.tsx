import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { routeNames } from '../../routes';
import { useAppSelector, useAppDispatch } from '../../store/store';
import { checkAuth, changeAuth, openModal } from '../../store/authSlice';
import { Button } from 'antd';
import logo from '../../assets/logo.png';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space, Typography } from 'antd';
import AppAuth from './AppAuth';
const { Header } = Layout;

function AppMenu() {
	const isAuth = useAppSelector(checkAuth);
	const name = useAppSelector((state) => state.auth._user?.login);
	const dispatch = useAppDispatch();
	const { Text } = Typography;

	const authHandle = (isAuth: boolean) => {
		if (isAuth) {
			dispatch(changeAuth(false));
		} else {
			dispatch(openModal(true));
		}
	};
	console.log(name);

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
			<AppAuth />
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
							style={
								isAuth
									? { backgroundColor: '#29B32E', marginRight: '10px' }
									: { backgroundColor: '#393939', marginRight: '20px' }
							}
							src={isAuth ? null : null}
							icon={<UserOutlined />}
						/>
					</Space>
					<Text style={{ wordBreak: 'normal', marginRight: '10px' }} strong>
						{name}
					</Text>
					<div className='right-side-menu'>
						<Button onClick={() => authHandle(isAuth)}>
							{isAuth ? 'Выйти' : 'Войти'}
						</Button>
					</div>
				</div>
			</Header>
		</Layout>
	);
}

export default AppMenu;
