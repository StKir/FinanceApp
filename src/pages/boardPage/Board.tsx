import TransactionElement from '../../components/transactionElement/TransactionElement';
import TransactionElementHistory from '../../components/transactionElement/TransactionElementHistory';
import { useAppSelector } from '../../store/store';
import { selectAll } from '../../store/transactionSlice';

function Board() {
	const transactionList = useAppSelector(selectAll);

	const renderActiveList = (list: any[]) => {
		return list
			.filter((el) => el.status !== ('success' || 'error' || 'overdue'))
			.map((el) => {
				return <TransactionElement key={el.id} element={el} />;
			});
	};

	const renderHistoryList = (list: any[]) => {
		return list
			.filter((el) => el.status !== ('waiting' || 'process'))
			.map((el) => {
				return <TransactionElementHistory key={el.id} element={el} />;
			});
	};

	const active_list = renderActiveList(transactionList);
	const history_list = renderHistoryList(transactionList);
	return (
		<div className='container'>
			<div className='trans-active'>
				<h1>Активные транзакции</h1>
				<div className='active-list'>
					{active_list.length ? active_list : <h3>Нет активных транзакций</h3>}
				</div>
			</div>
			<div className='trans-history'>
				<h1>История транзакций</h1>
				<div className='history-list'>
					{history_list.length ? history_list : <h3>История пуста</h3>}
				</div>
			</div>
		</div>
	);
}

export default Board;
