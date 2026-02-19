import axios from "axios";

const API_URL = "http://localhost/api/albums";

export const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

export async function getAllAlbums() {
  const response = await axios.get(API_URL);
  return response.data["member"]; // 'hydra:member' permet de récup direct le tableau des albums quand on attends plusieurs éléments
}

export async function getAlbum(idAlbum) {
  const response = await axios.get(`${API_URL}/${idAlbum}`);
  return response.data;
}

export async function postAlbum(formData) {
  const config = getAuthHeader();
  config.headers['Content-Type'] = 'application/ld+json';
  const response = await axios.post(API_URL, formData, config);
  return response.data;
}

export async function modifyAlbum(idAlbum, data) {
  const config = getAuthHeader();
  config.headers["Content-Type"] = "application/merge-patch+json"; // pour modifier il faut généralement ce format spécifique
  const response = await axios.patch(`${API_URL}/${idAlbum}`, data, config);
  return response.data;
}

export async function deleteAlbum(idAlbum) {
  const response = await axios.delete(`${API_URL}/${idAlbum}`, getAuthHeader());
  return response.data;
}


