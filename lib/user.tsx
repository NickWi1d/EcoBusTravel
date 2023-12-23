import axios from 'axios';


export async function POST(username: string, password: string) {
    try {
        const response = await axios.post('/api/auth', {
            username,
            password
        });
        if (response.status === 200) {
            console.log(response.data.addUser)
            return {
                message: 'SUCCESSFULLY',
                uid:response.data.addUser.insertedId
            };
        } else {
            console.log('Registration failed: ', response.data.message);
        }
    } catch (error) {
        console.error('An error occurred during process', error);
    }
}
export async function GET(username: string, type:string, password?: string ) {
    try {

        const params: Record<string, string | undefined> = { username, type };
        if (password !== undefined) {
            params.password = password;
        }

        console.log(params)
        const response = await axios.get(`/api/auth`, {
            params:params
        })
        if (response.status === 200) {
            return {
                message: 'SUCCESSFULLY',
                uid:  response.data.user._id,
                password: response.data.user.password
            };
        } else {
            console.log('Something went wrong:', response.data.message);
        }
    } catch (error) {
        console.error('An error occurred during process', error);
    }
}
