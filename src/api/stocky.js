import axios from 'axios';
import Cookies from 'js-cookie';

const HOSTNAME = 'https://api.trystocky.com';

export const fetchStockDetails = async (ticker) => {
  try {
    const response = await axios.get(`${HOSTNAME}/stock/details/${ticker}`);
    const allCookies = Cookies.get();
    Object.entries(allCookies).forEach(([key, value]) => {
      console.log(`${key}: ${value}`);
    });    
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

export const validateToken = async () => {
  try {
    const response = await axios.post(`${HOSTNAME}/validate-token`, {}, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error validating token:', error);
  }
};

export const getAllStocks = async () => {
  try {
    const response = await axios.get(`${HOSTNAME}/stock/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all stocks:', error);
  }
}

export const getUndervaluedStocks = async () => {
  try {
    const response = await axios.get(`${HOSTNAME}/stock/finder?criteria=undervalued&limit=6`);
    return response.data;
  } catch (error) {
    console.error('Error fetching undervalued stocks:', error);
  }
}

export const getStocksByScore = async () => {
  try {
    const response = await axios.get(`${HOSTNAME}/stock/finder?criteria=score&limit=6`);
    return response.data;
  } catch (error) {
    console.error('Error fetching undervalued stocks:', error);
  }
}
