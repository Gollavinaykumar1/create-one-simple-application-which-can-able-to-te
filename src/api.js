const BASE_URL = 'http://localhost:8000';

export const getQuestions = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/questions`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export { BASE_URL };