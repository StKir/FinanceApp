import './appMenu.scss';
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
import { getAuth, signOut } from 'firebase/auth';

const { Header } = Layout;

function AppMenu() {
	const isAuth = useAppSelector(checkAuth);
	const name = useAppSelector((state) => state.auth._user);
	const dispatch = useAppDispatch();
	const { Text } = Typography;

	const authHandle = (isAuth: boolean) => {
		if (isAuth) {
			const auth = getAuth();
			signOut(auth)
				.then(() => {
					dispatch(changeAuth(false));
				})
				.catch((error) => {
					console.log(error);
				});
		} else {
			dispatch(openModal(true));
		}
	};
	const items = routeNames
		.sort((el, el2) => el.id - el2.id)
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
				className='header'
				style={{
					position: 'sticky',
					top: 0,
					zIndex: 1,
					width: '100%',
					height: '100%',
					background: '#FFFFFF',
					boxShadow: '0px 4px 40px rgba(0, 0, 0, 0.15)'
				}}
			>
				<div
					className='menu'
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						flexWrap: 'wrap'
					}}
				>
					<div
						className='left-sideHeader'
						style={{
							display: 'flex',
							alignItems: 'center',
							width: '410px'
							// flexWrap: 'wrap'
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
							className='menu'
							defaultSelectedKeys={['1']}
							style={{
								background: '#FFFFFF',
								display: 'flex',
								alignItems: 'center',
								width: '100%'
							}}
							items={items}
						/>
					</div>
					<div
						className='right-sideHeader'
						style={{
							display: 'flex',
							alignItems: 'center'
						}}
					>
						<Space>
							<Avatar
								className='avatar'
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
							{name?.login}
						</Text>
						<div className='right-side-menu'>
							<Button onClick={() => authHandle(isAuth)}>
								{isAuth ? 'Выйти' : 'Войти'}
							</Button>
						</div>
					</div>
				</div>
			</Header>
		</Layout>
	);
}

export default AppMenu;
