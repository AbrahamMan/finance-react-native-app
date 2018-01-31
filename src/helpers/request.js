import axios from 'axios';

const request = axios.create({
	baseURL: 'http://localhost:8000/api',
	//baseURL: 'https://api.github.com/users/',
	//baseURL: 'http://ridhwandaud.com/api',
	timeout: 10000, /* Timeout for 5 seconds */
});

export default request;
