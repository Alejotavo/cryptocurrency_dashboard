
import { Link } from "react-router-dom";
import { useFavorites } from "../context/useFavorites";

function FavoritesPage() {
    const { favorites, removeFavorite } = useFavorites();
  return (
    <div className="container mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4">Favorites</h1>
        <ul>
            {favorites.length === 0 ? (
                <li>No favorites added yet.</li>
            ) : (
                favorites.map((fav) => (
                    <li key={fav.id} className="mb-2 p-2 border border-gray-200 rounded">
                        <div className="flex items-center">
                            <img src={fav.image} alt={fav.name} width={30} className="mr-4" />
                            <div>
                                <Link to={`/crypto/${fav.id}`}>
                                <div className="font-semibold">{fav.name} <span className="font-regular text-sm text-gray-400">{fav.symbol.toUpperCase()}</span></div>
                                </Link>
                                
                                <div>Current Price: {fav.current_price.toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                    maximumFractionDigits: 2,
                                })}</div>
                            </div>
                            <div className="ml-auto mr-4">
                                <button className="text-red-500 hover:underline" onClick={() => removeFavorite(fav.id)}>Remove</button>
                            </div>
                        </div>
                    </li>
                ))
            )}
        </ul>
    </div>
  );
}
export default FavoritesPage;