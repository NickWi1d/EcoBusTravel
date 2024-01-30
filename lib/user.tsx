import axios, { AxiosError } from 'axios';

export async function POST(username: string, password: string, email?: string) {
    try {
        const response = await axios.post('/api/auth', {
            username,
            password,
            email
        });
        if (response.status === 200) {
            console.log(response.data.addUser)
            return {
                message: 'SUCCESSFULLY',
                uid: response.data.addUser.insertedId
            };
        } else {
            console.log('Registration failed: ', response.data.message);
        }
    } catch (error: any) {
        const axiosError: AxiosError = error;
        return {
            message: (axiosError.response?.data as { message: string })?.message || 'Unknown error',
        }
    }
}
export async function GET(username: string, type: string, password?: string) {
    try {
        const params: Record<string, string | undefined> = { username, type, password };
        // if (password !== undefined) {
        //     params.password = password;
        // }

        console.log(params)
        const response = await axios.get(`/api/auth`, {
            params: params
        })
        if (response.status === 200) {
            return {
                message: 'SUCCESSFULLY',
                uid: response.data.user._id,
                password: response.data.user.password,
                email: response.data.user.email,
                username: response.data.user.username,
                surname: response.data.user.surname
            };
        }
    } catch (error: any) {
        const axiosError: AxiosError = error;
        return {
            message: (axiosError.response?.data as { message: string })?.message || 'Unknown errorq',
        }
    }
}

export async function DELETE(uid: string) {
    try {
        const response = await axios.delete(`/api/auth`, {
            params: { uid }
        });
        if (response.status === 200) {
            return {
                message: 'SUCCESSFULLY_DELETED'
            };
        } else {
            throw new Error(`Deletion failed: ${response.data.message}`);
        }
    } catch (error: any) {
        const axiosError: AxiosError = error;
        return {
            message: (axiosError.response?.data as { message: string })?.message || 'Unknown error',
        }
    }
}

export async function PUT(uid: string, username: string, surname: string, password: string, email: string) {
    try {
        const data: Record<string, string | undefined> = {
            uid,
            username,
            surname,
            password,
            email
        }
        const response = await axios.put(`/api/auth`, data)
        if (response.status === 200 && response.data.message === 'User successfully updated') {
            return {
                message: 'SUCCESSFULLY_UPDATED'
            };
        } else if(response.status === 200 && response.data.message === 'No changes made to the user'){
            return {
                message: 'NO_CHANGES'
            };
        } else {
            throw new Error(`Updation failed: ${response.data.message}`);
        }
    } catch (error: any) {
        const axiosError: AxiosError = error;
        return {
            message: (axiosError.response?.data as { message: string })?.message || 'Unknown error',
        }
    }
}
