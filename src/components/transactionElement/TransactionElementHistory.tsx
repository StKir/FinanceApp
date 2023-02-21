import { Card } from 'antd';
import React from 'react';
import { Telement } from '../../types/typesApp';
import { renderTcode } from './TransactionElement';

function TransactionElementHistory({ element }: { element: any }) {
	const {
		fromNetwork,
		toNetwork,
		status,
		amountDeposit,
		amountEstimated,
		addressDeposit
	}: Telement = element;

	const iconcode = renderTcode(status, addressDeposit, 50);
	return (
		<Card
			className='historyElementCard'
			title={
				'Обмен ' +
				amountDeposit +
				fromNetwork +
				' → ' +
				amountEstimated +
				toNetwork
			}
			style={{ width: '100%' }}
			bordered={false}
		>
			{iconcode}
		</Card>
	);
}

export default TransactionElementHistory;
