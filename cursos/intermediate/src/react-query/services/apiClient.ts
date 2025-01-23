import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

class APIClient<T, R extends T> {
  constructor(public endpoint: string) {}

  getAll = () => {
    return axiosInstance.get<R[]>(this.endpoint).then((res) => res.data);
  };

  post = (data: T) => {
    return axiosInstance
      .post<T>(this.endpoint, data)
      .then((res) => res.data as R);
  };
}

export default APIClient;
