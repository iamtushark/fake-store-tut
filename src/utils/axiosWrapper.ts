import axios from "axios";

// TODO: Handle API responses in a better way.
export async function fetchGet(url: string) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching API :", url, error);
    throw error;
  }
}
