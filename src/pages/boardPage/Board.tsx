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

	function boardEmpty() {
		return (
			<>
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
				<div className='trans-active'>
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
					<div className='history-list'>
						{history_list.length ? history_list : <h3>История пуста</h3>}
					</div>
				</div>
			</>
		);
	}

	console.log(active_list.length && history_list.length);
	console.log(active_list);

	return (
		<div className='container'>
			{active_list.length || history_list.length
				? boardNotEmpty()
				: boardEmpty()}
		</div>
	);
}

export default Board;
