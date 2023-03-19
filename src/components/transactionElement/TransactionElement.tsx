import { Card, Steps } from 'antd';
import { useEffect } from 'react';
import { useAppDispatch } from '../../store/store';
import {
	removeTransaction,
	updateTransaction
} from '../../store/transactionSlice';
import { QRCode, Button } from 'antd';
import { Telement } from '../../types/typesApp';

import './transactionElement.scss';
import {
	CheckCircleFilled,
	CloseCircleFilled,
	LoadingOutlined
} from '@ant-design/icons';

type stepCodeMod = 'process' | 'finish' | 'error' | 'wait' | undefined;

function TransactionElement({ element }: { element: any }) {
	const dispatch = useAppDispatch();
	const {
		fromNetwork,
		toNetwork,
		status,
		id,
		amountDeposit,
		amountEstimated,
		addressDeposit
	}: Telement = element;

	useEffect(() => {
		if (status === ('waiting' || 'process')) {
			const updateInterval = setInterval(() => {
				if (status === ('waiting' || 'process')) {
					//Дополнительная проверка необходима для обновления статуса внутри интервала
					dispatch(updateTransaction(id));
				}
			}, 5000);
			dispatch(updateTransaction(id));
			return () => clearInterval(updateInterval);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const deleteTransaction = () => {
		dispatch(removeTransaction(id));
	};

	const renderStepCode = (
		status: string
	): { step: number; status: stepCodeMod } => {
		switch (status) {
			case 'waiting':
				return {
					step: 0,
					status: 'process'
				};
			case 'success':
				return {
					step: 2,
					status: 'finish'
				};
			case 'overdue' || 'error':
				return {
					step: 2,
					status: 'error'
				};
			case 'process':
				return {
					step: 1,
					status: 'process'
				};
			default:
				return {
					step: 2,
					status: 'error'
				};
		}
	};
	const stepCode = renderStepCode(status);
	const code = renderTcode(status, addressDeposit, 100, deleteTransaction);

	return (
		<Card
			className='elementCard'
			title={
				'Обмен ' +
				amountDeposit +
				fromNetwork +
				' → ' +
				amountEstimated +
				toNetwork
			}
			bordered={false}
			style={{ width: '100%' }}
		>
			{StepsTrans(stepCode)}
			<div className='deposit-wrp'>{code}</div>
		</Card>
	);
}

function DepositQR(addressDeposit: string, deleteTransaction: () => void) {
	return (
		<div className='depositInfo'>
			<QRCode value={addressDeposit} />

			<span className='code'>{addressDeposit}</span>
			<h4>
				Отсканируйте QR-код или скопируйте адрес кошелька, чтобы отправить
				монеты
			</h4>
			<Button type='default' size={'large'} onClick={deleteTransaction}>
				Отмена
			</Button>
		</div>
	);
}

export const renderTcode = (
	status: string,
	addressDeposit: string,
	size: number,
	deleteTransaction: () => void = () => null
) => {
	switch (status) {
		case 'waiting':
			return DepositQR(addressDeposit, deleteTransaction);
		case 'success':
			return DepositFinish(size);
		case 'overdue' || 'error':
			return DepositError(size, deleteTransaction);
		case 'process':
			return DepositProcess(size);
	}
};

function DepositProcess(size: number) {
	return (
		<div className='depositInfo'>
			<LoadingOutlined
				twoToneColor='#29B22E'
				spin={true}
				style={{ fontSize: size }}
			/>
			<h4>Ожидание процесса обмена</h4>
		</div>
	);
}

function DepositFinish(size: number) {
	return (
		<div className='depositInfo'>
			<CheckCircleFilled style={{ fontSize: size }} />
			<h4>Обмен успешно завершен</h4>
		</div>
	);
}
function DepositError(size: number, deleteTransaction: () => void) {
	return (
		<div className='depositInfo'>
			<CloseCircleFilled style={{ fontSize: size }} />
			<h4>Произошла ошибка, попробуйте снова!</h4>
			<Button type='default' size={'large'} onClick={deleteTransaction}>
				Отмена
			</Button>
		</div>
	);
}

function StepsTrans(stepCode: { step: number; status: stepCodeMod }) {
	const { status, step } = stepCode;
	return (
		<Steps
			current={step}
			status={status}
			items={[
				{
					title: 'Ожидание оплаты',
					description: 'Ждем пока вы оплатите счет'
				},
				{
					title: 'В процессе обмена',
					description: 'Производится обмен'
				},
				{
					title: 'Финиш',
					description:
						status === 'error'
							? 'Произошла ошибка!'
							: 'Транзакция успешно выполнена!'
				}
			]}
		/>
	);
}

export default TransactionElement;
