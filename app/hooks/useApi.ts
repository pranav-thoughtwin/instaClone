import axios, { AxiosResponse } from "axios";
import Cookie from 'js-cookie';

interface Props<T> {
    url: string
    method: 'GET' | 'POST' | 'PUT' | 'DELETE'
    data?: T
}

const useApi = <T>() => {
    const apiCall = async ({ url, method, data }: Props<T>): Promise<AxiosResponse> => {
        try {
            const token = Cookie.get("token");
            const response: AxiosResponse = await axios({
                url: `${process.env.NEXT_PUBLIC_BASE_URL}/${url}`,
                method,
                data,
                headers: {
                    'Authorization': `bearer ${token}`
                }
            });
            return response
        }
        catch (error) {
            console.log("Error in api call: ", error);
            throw error;
        }
    }
    return { apiCall }
}

export default useApi