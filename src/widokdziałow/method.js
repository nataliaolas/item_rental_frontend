import apiClient from '../api/apiClient';

const getPrzedmiot = async (przedmiotid) => {
  const response = await apiClient.get(`http://127.0.0.1:8000/przedmiotyy/${przedmiotid}`);
  return response.data;
};
export default getPrzedmiot;


export const getUzytkownik = async (uzytkownikid) => {
  const response = await apiClient.get(`http://127.0.0.1:8000/wypozyczenia/${uzytkownikid}`);
  return response.data;
};
