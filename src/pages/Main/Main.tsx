import React, { useEffect } from 'react';
import axios from 'axios';
import { useCheckAuth } from '../../hooks/useAuth';

function Main() {
	useCheckAuth();
	return <div>Main</div>;
}

export default Main;
