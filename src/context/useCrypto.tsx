import { createContext, useContext, useEffect, useState } from "react";
import type { Cryptocurrency } from "../models/cryptocurrency";
import { getCryptocurrencies } from "../services/service";

type UseCryptoType = {
  data: Cryptocurrency[];
  error: string | null;
  loading: boolean;
};

const CryptoContext = createContext<UseCryptoType | undefined>(undefined);

export const CryptoProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<Cryptocurrency[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

 useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCryptocurrencies();
        setData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <CryptoContext.Provider value={{ data, error, loading }}>
      {children}
    </CryptoContext.Provider>
  );
};

export const useCrypto = () => {
  const context = useContext(CryptoContext);
  if (!context) {
    throw new Error("useCrypto must be used within a CryptoProvider");
  }
  return context;
};