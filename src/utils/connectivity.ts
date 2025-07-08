import axios, { AxiosRequestConfig } from 'axios';
import { Logger } from './logger';

const logger = new Logger("utils", "Connectivity");

export async function uploadData<T>(url: string, files: File[], extraData: Record<string, any> = {}, extraConfig: AxiosRequestConfig = {}): Promise<T> {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    Object.entries(extraData).forEach(([key, value]) => formData.append(key, value))
    return await axios.post<T>(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        ...extraConfig
    }) as unknown as T
}
export async function postData<T>(url: string, payload: any|undefined, config?: AxiosRequestConfig): Promise<T> {
    return await axios.post<T>(url, payload, config) as unknown as T
}
export async function getData<T>(url: string, params?: any): Promise<T> {
    return await axios.get<T>(url, params) as unknown as T
}
export async function putData<T>(url: string, payload?: any): Promise<T> {
    return await axios.put<T>(url, payload) as unknown as T
}
export async function patchData<T>(url: string, payload?: any): Promise<T> {
    return await axios.patch<T>(url, payload) as unknown as T
}
export async function deleteData<T>(url: string): Promise<T> {
    return await axios.delete<T>(url) as unknown as T
}
export const axiosSetup = () => {
    // Add a request interceptor
    axios.interceptors.request.use(function (config) {
        // Do something before request is sent
        logger.debug('Request intercepted:', config);
        axios.defaults.headers.common['Authorization'] = "FAKE_AUTH_TOKEN";
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    // Add a response interceptor
    axios.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        logger.debug('Response intercepted:', response);
        // All the response must return a data inside the body

        // logger.info("api headers", response.headers, response.headers['content-type'])

        // return response.data.data || response.data;


        if(response.headers['content-type'] === "application/json"){
            if (!response.data.data)
                logger.warn(`The API response must have a data inside the body`, response, response.config);
            return "data" in response.data ? response.data.data : response.data;
        }
        else{
            return response;
        }
    }, function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        logger.error('Request failed with', error.toJSON());
        return Promise.reject(error);
    });
    // Default information sent with all the requests
    axios.defaults.baseURL = `${location.protocol}//${location.host}/api`;
    // axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common['Accept'] = 'application/json';
    // Avoid redirect in XHR requests
    axios.defaults.maxRedirects = 0;

}