import React from 'react';
import { useCheckAuth } from '../../hooks/useAuth';

function News() {
	useCheckAuth();
	return <div>News</div>;
}

export default News;
