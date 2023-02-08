import { Col, Row } from 'antd';
import React from 'react';
import TransactionElement from '../../components/transactionElement/TransactionElement';
import { useAppSelector } from '../../store/store';
import { selectAll } from '../../store/transactionSlice';

function Board() {
	const transactionList = useAppSelector(selectAll);

	const renderList = (list: any[]) => {
		return list.map((el) => {
			return <TransactionElement key={el.id} element={el} />;
		});
	};
	const list = renderList(transactionList);
	return <div className='container'>{list.length ? list : null}</div>;
}

export default Board;
