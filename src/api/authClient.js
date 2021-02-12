import apiClient from '../api/apiClient';
 const authClient = async (data) => {
    await apiClient
      .post(`http://127.0.0.1:8000/api-auth/login/`, data)
      .then((response) => {
        const JWT = JSON.stringify(response.data);
        const token = JSON.parse(JWT);
        localStorage.setItem("token", token);
      })
      .catch((error) => {
        console.log(error);
      });
  
    const response = await apiClient.get(`http://127.0.0.1:8000/uzytkownik/`);
    return response.data;
  };
  export default authClient;