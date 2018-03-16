import axios from 'axios';

const request = axios.create({
	//baseURL: 'http://localhost:8000/api',
	//baseURL: 'https://api.github.com/users/',
	//baseURL: 'http://api.ridhwandaud.com/api',
	baseURL: 'http://10.0.3.2:8000/api',
	timeout: 10000, /* Timeout for 5 seconds */
});

export default request;
