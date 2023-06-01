import axios from'axios';

const baseURL = 'http://localhost:3000/api';

export const creatUser = async({username, gender, phone, email, password, old, intro, score}) => {
    try {
        const res = await axios.post(`${baseURL}/posts`, {
            username, gender, phone, email, password, old, intro, score
        });
        return res.data;
    } catch (error) {
        throw error;
    }
}