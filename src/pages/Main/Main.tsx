import React, { useEffect } from 'react';
import axios from 'axios';

function Main() {
	useEffect(() => {
		axios({
			method: 'GET',
			headers: {
				'x-api-key': 'wqDOuFGv1'
			},
			url: 'https://api.swapzone.io/v1/exchange/get-rate?from=btc&to=eth&amount=0.00421&rateType=all&availableInUSA=false&chooseRate=all&noRefundAddress=false'
		}).then((data) => console.log(data.data));
	});
	return <div>Main</div>;
}

export default Main;
