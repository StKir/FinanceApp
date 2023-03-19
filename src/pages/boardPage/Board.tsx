import AppAuthMassage from '../../components/appAuthMassage/AppAuthMassage';
import HelmetHead from '../../components/Helmet';
import TransactionElement from '../../components/transactionElement/TransactionElement';
import TransactionElementHistory from '../../components/transactionElement/TransactionElementHistory';
import { useCheckAuth } from '../../hooks/useAuth';
import { useAppSelector } from '../../store/store';
import { selectAll } from '../../store/transactionSlice';
import { TtranRes } from '../../types/storeTypes';

function Board() {
	const transactionList = useAppSelector(selectAll);
	const isAuth: boolean = useAppSelector((state) => state.auth.isAuth);
	useCheckAuth();

	const renderActiveList = (list: TtranRes[] = []) => {
		return list
			.filter((el) => el.status !== ('success' || 'error' || 'overdue'))
			.map((el) => {
				return <TransactionElement key={el.id} element={el} />;
			});
	};

	const renderHistoryList = (list: TtranRes[] = []) => {
		return list
			.filter((el) => el.status !== ('waiting' || 'process'))
			.map((el) => {
				return <TransactionElementHistory key={el.id} element={el} />;
			});
	};

	const active_list = renderActiveList(transactionList);
	const history_list = renderHistoryList(transactionList);

	function boardEmpty() {
		return (
			<>
				<HelmetHead title='Доска' content='transaction information' />

				<div
					className='emptyBoard'
					style={{
						alignItems: 'center',
						display: 'grid',
						justifyItems: 'center'
					}}
				>
					<h1>Пусто</h1>
					<span>Похоже что вы еще не совершали транзакций</span>
				</div>
			</>
		);
	}

	function boardNotEmpty() {
		return (
			<>
				<HelmetHead title='Доска' content='transaction information' />
				<div
					className='trans-active'
					style={{
						textAlign: 'center'
					}}
				>
					<h1>Активные транзакции</h1>
					<div className='active-list'>
						{active_list.length ? (
							active_list
						) : (
							<h3>Нет активных транзакций</h3>
						)}
					</div>
				</div>
				<div className='trans-history'>
					<h1>История транзакций</h1>
					<div
						className='history-list'
						style={{
							display: 'grid',
							gridTemplateColumns: '1fr 1fr 1fr',
							gridGap: 20
						}}
					>
						{history_list.length ? history_list : <h3>История пуста</h3>}
					</div>
				</div>
			</>
		);
	}

	if (!isAuth) {
		return <AppAuthMassage />;
	}

	return (
		<div className='container'>
			{active_list.length || history_list.length
				? boardNotEmpty()
				: boardEmpty()}
		</div>
	);
}

export default Board;
