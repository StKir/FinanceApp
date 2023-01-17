import { useAppSelector } from '../../store/store';
import { Progress } from 'antd';

function ExchangeLoader() {
	const status = useAppSelector((state) => state.exchange.LoadingStatus);

	const switchControl = (status: string) => {
		switch (status) {
			case 'loading':
				return 'active';
			case 'error':
				return 'exception';
			default:
				return 'success';
		}
	};

	return (
		<>
			<Progress percent={100} status={switchControl(status)} />
		</>
	);
}

export default ExchangeLoader;
