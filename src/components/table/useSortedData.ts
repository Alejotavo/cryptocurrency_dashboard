import { useEffect, useState } from "react";
import type { Cryptocurrency } from "../../models/cryptocurrency";

function useSortedData(filteredData: Cryptocurrency[]) {

const [sortedData, setSortedData] = useState(filteredData);
const [asc, setAsc] = useState(true);

  useEffect(() => {
    setSortedData(filteredData);
  }, [filteredData]);

   const sortByKey = (key: keyof Cryptocurrency) => {
    const sorted = [...sortedData].sort((a, b) =>
      asc ? (a[key] as number) - (b[key] as number) : (b[key] as number) - (a[key] as number)
    );
    setSortedData(sorted);
    setAsc(!asc);
  };

  return {
    asc,
    sortedData,
    sortByPrice: () => sortByKey("current_price"),
    sortByPriceChange: () => sortByKey("price_change_percentage_24h"),
  };
}

export default useSortedData;
