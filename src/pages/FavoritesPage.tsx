
import { useFavorites } from "../context/useFavorites";

function FavoritesPage() {
    const { favorites } = useFavorites();
  return (
    <div>
        <h1 className="text-2xl font-bold mb-4">Favorites</h1>
        <ul>
            {favorites.length === 0 ? (
                <li>No favorites added yet.</li>
            ) : (
                favorites.map((fav) => (
                    <li key={fav.id} className="mb-2 p-2 border border-gray-200 rounded">
                        {fav.name}
                        {fav.current_price}
                        {fav.symbol}
                    </li>
                ))
            )}
        </ul>
    </div>
  );
}
export default FavoritesPage;