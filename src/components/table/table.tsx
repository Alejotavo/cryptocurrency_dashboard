import { Link } from "react-router-dom";
import { useCrypto } from "../../context/useCrypto";
import ErrorComponent from "../error/error";
import Spinner from "../spinner/Spinner";
import useFilteredData from "./useFilteredData";
import { useFavorites } from "../../context/useFavorites";
import useSortedData from "./useSortedData";


interface TableProps {
  searchTerm: string;
}

function Table({ searchTerm }: TableProps) {

const { data, error, loading } = useCrypto();
const { favorites, addFavorite, removeFavorite } = useFavorites();
const filteredData = useFilteredData(data, searchTerm);
const { sortedData, asc, sortByPrice, sortByPriceChange } = useSortedData(filteredData);



  if (error) {
    return <ErrorComponent message={error} />;
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <table className="min-w-full">
      <thead>
        <tr>
          <th className="text-left p-4 text-sm">Coin</th>
          <th className="text-right p-4 text-sm">
            Price (USD)
            <button onClick={sortByPrice} className="ml-2 text-xs bg-gray-200 p-1 rounded">
              {asc ? "↑" : "↓"}
            </button>
          </th>
          <th className="text-right p-4 text-sm">
            Price Change (24h)
            <button onClick={sortByPriceChange} className="ml-2 text-xs bg-gray-200 p-1 rounded">
              {asc ? "↑" : "↓"}
            </button>
            </th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((item) => (
          <tr key={item.id} className="table-row hover:bg-gray-100 border-b border-gray-200">
            <td className="p-4 flex">
              <input type="checkbox"  className="mr-3" checked={favorites.some((fav) => fav.id === item.id)} onChange={(e) => {
                if (e.target.checked) {
                  addFavorite(item);
                } else {
                  removeFavorite(item.id);
                }
              }}/>
              <Link className="flex font-medium items-center" to={`/crypto/${item.id}`}>
                <img src={item.image} alt={item.name} width={20} className="inline mr-2" />
                <span>{item.name}</span>
                <span className=" ml-2 text-sm  text-gray-400">{item.symbol.toUpperCase()}</span>
              </Link>
            </td>
            <td className="p-4 text-right">{item.current_price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 2, 
                })}</td>
             <td className={ `p-4 ${item.price_change_percentage_24h < 0 ? 'text-red-500' : 'text-green-500'} text-right` }>
                {item.price_change_percentage_24h < 0 ? "↓" : "↑"}{" "}
                {Math.abs(item.price_change_percentage_24h).toFixed(1)}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
