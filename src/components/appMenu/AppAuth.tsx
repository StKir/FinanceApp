import React from 'react';
import { Drawer } from 'antd';
import Modal from 'antd/es/modal/Modal';
import { useAppSelector, useAppDispatch } from '../../store/store';
import { openModal } from '../../store/authSlice';
import Login from '../appLogin/Login';

function AppAuth() {
	const open = useAppSelector((state) => state.auth.modalOpen);
	const dispatch = useAppDispatch();

	return (
		<Modal
			open={open}
			// placement='top'
			// width={900}
			onCancel={() => dispatch(openModal(false))}
			footer={null}
		>
			<Login />
		</Modal>
	);
}

export default AppAuth;
