import axios from 'axios';

// Create an instance of Axios
const axiosInstance = axios.create({
	// Set baseURL to whatever you want the default base URL to be
	baseURL: 'https://jsonplaceholder.typicode.com/',
});

export default axiosInstance;
