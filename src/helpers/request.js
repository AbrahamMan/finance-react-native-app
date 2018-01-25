import axios from 'axios';

const request = axios.create({
	baseURL: 'http://localhost:8000/api',
	//baseURL: 'https://api.github.com/users/',
	//baseURL: 'http://ridhwandaud.com',
	timeout: 3000, /* Timeout for 5 seconds */
});

export default request;
