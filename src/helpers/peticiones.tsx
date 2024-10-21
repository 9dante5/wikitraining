import axios from "axios";

export const getData = async (url: any) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const postData = async (url: string, obj: any) => {
  try {
    const result = await axios.post(url, obj);
    return result.status
  } catch (error) {
    console.log(error);
  }
};

export const putData = async (url: string, datos: any) => {
  try {
      await axios.put(url, datos)
  } catch (error) {
      console.error(error);
  }
};