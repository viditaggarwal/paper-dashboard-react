import axios from 'axios';

const HOSTNAME = 'http://35.82.209.215';

export const fetchStockDetails = async (ticker) => {
  try {
    const response = await axios.get(`${HOSTNAME}/stock/details/${ticker}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stock details:', error);
  }
};


export const fetchStockSecSummary = async (ticker) => {
  try {
    const response = await axios.get(`${HOSTNAME}/stock/10k-summary/${ticker}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stock details:', error);
  }
};

export const fetchStockFundamentals = async (ticker) => {
  try {
    const response = await axios.get(`${HOSTNAME}/stock/fundamentals/${ticker}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stock details:', error);
  }
};