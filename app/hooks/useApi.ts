import axios, { AxiosResponse } from 'axios';
import Cookie from 'js-cookie';
import { useRouter } from 'next/navigation';

interface Props<T> {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    data?: T;
}

const useApi = <T>() => {
    const router = useRouter();

    axios.interceptors.response.use(
        response => response,
        error => {
            if (error.response && error.response.data && error.response.data.error) {
                const { name } = error.response.data.error;
                if (name === 'TokenExpiredError') {
                    Cookie.remove('token');
                    router.push('/accounts/login');
                }
            }
            return Promise.reject(error);
        }
    );

    const apiCall = async ({ url, method, data }: Props<T>): Promise<AxiosResponse> => {
        try {
            const token = Cookie.get('token');
            const response: AxiosResponse = await axios({
                url: `${process.env.NEXT_PUBLIC_BASE_URL}/${url}`,
                method,
                data,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response;
        } catch (error) {
            console.log('Error in api call: ', error);
            throw error;
        }
    };

    return { apiCall };
};

export default useApi;