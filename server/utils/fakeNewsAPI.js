import axios from "axios";

export const checkFakeNews = async (text) => {
  const response = await axios.post("http://127.0.0.1:8001/predict", {
    text: text
  });

  return response.data;
};
