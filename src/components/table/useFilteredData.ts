import { useMemo } from "react";
import type { Cryptocurrency } from "../../models/cryptocurrency";

function useFilteredData(data: Cryptocurrency[], searchTerm: string) {
  const filteredData = useMemo(() => data.filter(item => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(searchTermLower) || item.symbol.toLowerCase().includes(searchTermLower)
    );
  }), [data, searchTerm]);

  return filteredData;
}

export default useFilteredData;
