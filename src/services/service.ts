
import axios from "axios";
import type { Cryptocurrency } from "../models/cryptocurrency";

const API_URL = "https://api.coingecko.com/api/v3/coins/markets";

export const getCryptocurrencies = async (): Promise<Cryptocurrency[]> => {

    const response = await axios.get(API_URL, {
      params: {
        vs_currency: "usd",
        per_page: 10,
        sparkline: true,
      },
    });
    console.log('response',response);
    return response.data;
};