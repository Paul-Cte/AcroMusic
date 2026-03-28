import axios from 'axios'

const API_URL = `${import.meta.env.VITE_API_URL}/compositeurs`;

export const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return {
        headers : {Authorization : `Bearer ${token}`}
    };
};

export async function getAllCompositeurs() {
    const response =  await axios.get(API_URL,getAuthHeader());
    return response.data['member']; // member' permet de récup direct le tableau des albums quand on attends plusieurs éléments
}

export async function getCompositeur(idCompositeur) {
    const response = await axios.get(`${API_URL}/${idCompositeur}`);
    return response.data;
}

export async function postCompositeur(data) {
    const config = getAuthHeader();
    config.headers['Content-Type'] = 'application/ld+json';
    config.headers['Accept'] = 'application/ld+json';
    const response = await axios.post(API_URL,data,config)
    return response.data;
}

export async function modifyCompositeur(idCompositeur,data) {
    const config = getAuthHeader();
    config.headers['Content-Type'] = 'application/merge-patch+json'; // pour modifier il faut généralement ce format spécifique
    const response = await axios.patch(`${API_URL}/${idCompositeur}`,data,config);
    return response.data;
}

export async function deleteCompositeur(idCompositeur) {
    const response = await  axios.delete(`${API_URL}/${idCompositeur}`,getAuthHeader());
    return response.data;
}

