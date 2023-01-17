import Modal from 'antd/es/modal/Modal';
import { useAppSelector, useAppDispatch } from '../../store/store';
import { openModal } from '../../store/authSlice';
import Login from '../appLogin/Login';
import Registration from '../appRegistration/Registration';

function AppAuth() {
	const open = useAppSelector((state) => state.auth.modalOpen);
	const typeModal = useAppSelector((state) => state.auth.modalType);
	const dispatch = useAppDispatch();

	return (
		<Modal
			open={open}
			// placement='top'
			// width={900}
			onCancel={() => dispatch(openModal(false))}
			footer={null}
		>
			{typeModal === 'log' ? <Login /> : <Registration />}
		</Modal>
	);
}

export default AppAuth;
