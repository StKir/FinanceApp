import { useAppSelector } from '../../store/store';
import { Progress } from 'antd';
import { useEffect, useState } from 'react';

function ExchangeLoader() {
	const status = useAppSelector((state) => state.exchange.LoadingStatus);
	const [percent, setPercent] = useState<number>(0);

	useEffect(() => {
		return () => clearInterval(time);
	});
	console.log(percent);

	const increase = () => {
		setPercent((prevPercent) => {
			const newPercent = prevPercent + 10;
			if (newPercent > 80) {
				return 80;
			}
			return newPercent;
		});
	};

	const statusControl = (status: string) => {
		switch (status) {
			case 'loading':
				return 'active';
			case 'error':
				return 'exception';
			case 'idle':
				clearInterval(time);
				console.log(time);
				return 'success';
			default:
				return 'exception';
		}
	};

	const time = setTimeout(increase, 3000);

	return (
		<>
			<Progress
				percent={statusControl(status) === 'success' ? 100 : percent}
				status={statusControl(status)}
			/>
		</>
	);
}

export default ExchangeLoader;
