import React from 'react';
import { TtranRes } from '../../types/storeTypes';

function ExchangeTransStatus({
	amountDeposit,
	createdAt,
	from,
	to,
	status,
	id
}: TtranRes) {
	return (
		<div>
			{from} ' - ' {to}
		</div>
	);
}

export default ExchangeTransStatus;
