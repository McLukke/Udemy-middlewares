import { FETCH_USERS } from './types';
import axios from 'axios';

export const fetchUsers = () => {
	const request = axios.get('http://jsonplaceholder.typicode.com/users');

	return {
		type: FETCH_USERS,
		payload: request // a promise of status "pending", ajax not resolved; we need 'react-promise'
	};
};
