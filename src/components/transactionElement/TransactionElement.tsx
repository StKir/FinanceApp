import { Card, Spin } from 'antd';
import { useEffect } from 'react';
import { useAppDispatch } from '../../store/store';
import { updateTransaction } from '../../store/transactionSlice';

function TransactionElement({ element }: { element: any }) {
	const dispatch = useAppDispatch();
	const {
		fromNetwork,
		toNetwork,
		status,
		id,
		amountDeposit,
		amountEstimated,
		createdAt
	} = element;
	useEffect(() => {
		dispatch(updateTransaction(id));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch]);

	const renderStatus = () => {
		switch (status) {
			case 'waiting':
				return <Spin size='large' />;
			case 'success':
				return 'Выполненно!';
			case 'failed':
				return 'Транзакция не прошла';
		}
	};

	return (
		<Card title={createdAt.slice} bordered={false} style={{ width: 300 }}>
			<div
				style={{
					display: 'flex',
					alignItems: 'center'
				}}
			>
				{renderStatus()}
				<h3 style={{ marginLeft: '20px' }}>{status}</h3>
			</div>
			<div className='card-info'>
				<span className='amount'>
					{amountDeposit} {fromNetwork}
				</span>
				→
				<span className='amount'>
					{amountEstimated} {toNetwork}
				</span>
			</div>
		</Card>
	);
}

export default TransactionElement;
