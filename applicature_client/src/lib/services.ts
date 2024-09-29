import axios from 'axios';

const HOST = import.meta.env.VITE_SERVER_URL;

const handleAxiosError = (error: unknown, message?: string) => {
    if (axios.isAxiosError(error) && error.response) {
        return error.response;
    } else {
        console.error(`${message || "Axios Error:"}`, error);
        return null;
    }
};

export const checkUserRegistered = async ({ email, username }: { email?: string, username?: string }) => {
    try {
        const res = await axios.get(`${HOST}/api/v1/auth`, { params: { email, username } });
        return res;
    } catch (error) {
        return handleAxiosError(error);
    }
}

export const registerUser = async ({ email, password, otp, username }: { email: string, password: string, otp: string, username: string }) => {
    try {
        const res = await axios.post(`${HOST}/api/v1/auth/register`, { email, password, otp, username });
        return res;
    } catch (error) {
        return handleAxiosError(error);
    }
}

export const loginUser = async ({ email, password, username }: { email?: string, username?: string, password: string }) => {
    try {
        const res = await axios.post(`${HOST}/api/v1/auth/login`, { email, password, username });
        return res;
    } catch (error) {
        return handleAxiosError(error);
    }
}