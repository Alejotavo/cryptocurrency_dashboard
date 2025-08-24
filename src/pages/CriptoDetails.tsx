import { Link, useParams } from "react-router-dom";
import Spinner from "../components/spinner/Spinner";
import { useCrypto } from "../context/useCrypto";

function CryptoDetailsPage() {

    const { id } = useParams();
    const { data, error, loading } = useCrypto();
    const crypto = data.find((item) => item.id === id);

  if (loading) {
    return <Spinner />
  }

  if (!crypto) {
    return <div>No cryptocurrency found: <b className="text-red-500">{error}</b></div>;
  }

  return (
    <div className="container mx-auto mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full md:w-1/2 border-1 border-gray-200 p-4 rounded">
        <div>
          <label className="block font-semibold">{crypto.name}</label>
          <p className="mb-4">{crypto.symbol.toUpperCase()}</p>
          <p>{crypto.total_volume}</p>
        </div>
        <div className="flex flex-col items-center">
          <img src={crypto.image} alt={crypto.name} width={40} />
          <Link to="/" className="text-blue-600 underline mt-2">
            Back to Home
          </Link>
        </div>
      </div>
    </div>

  );
}
export default CryptoDetailsPage;