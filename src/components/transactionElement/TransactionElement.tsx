import { Card, Steps } from 'antd';
import { useEffect } from 'react';
import { useAppDispatch } from '../../store/store';
import { updateTransaction } from '../../store/transactionSlice';
import { QRCode } from 'antd';
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
		dispatch(updateTransaction(id));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch]);

	const renderTcode = (status: string) => {
		switch (status) {
			case 'waiting':
				return DepositQR(addressDeposit);
			case 'success':
				return DepositFinish();
			case 'overdue' || 'error':
				return DepositError();
			case 'process':
				return DepositProcess();
		}
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
	const code = renderTcode(status);

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

function DepositQR(addressDeposit: string) {
	return (
		<div className='depositInfo'>
			<QRCode value={addressDeposit} />

			<span className='code'>{addressDeposit}</span>
			<h4>
				Отсканируйте QR-код или скопируйте адрес кошелька, чтобы отправить
				монеты
			</h4>
		</div>
	);
}

function DepositProcess() {
	return (
		<div className='depositInfo'>
			<LoadingOutlined
				twoToneColor='#29B22E'
				spin={true}
				style={{ fontSize: 100 }}
			/>
			<h4>Ожидание процесса обмена</h4>
		</div>
	);
}

function DepositFinish() {
	return (
		<div className='depositInfo'>
			<CheckCircleFilled twoToneColor='#29B22E' style={{ fontSize: 100 }} />
			<h4>Обмен успешно завершен</h4>
		</div>
	);
}

function DepositError() {
	return (
		<div className='depositInfo'>
			<CloseCircleFilled style={{ fontSize: 100 }} />
			<h4>Произошла ошибка, попробуйте снова!</h4>
		</div>
	);
}

function StepsTrans(stepCode: { step: number; status: stepCodeMod }) {
	return (
		<Steps
			current={stepCode.step}
			status={stepCode.status}
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
					description: 'Транзакция успешно выполнена!'
				}
			]}
		/>
	);
}

export default TransactionElement;
