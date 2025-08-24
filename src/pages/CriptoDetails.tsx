import { Link, useParams } from "react-router-dom";
import Spinner from "../components/spinner/Spinner";
import { useCrypto } from "../context/useCrypto";
import { LineChart, Line, XAxis, YAxis, Legend, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

function CryptoDetailsPage() {

    const { id } = useParams();
    const { data, error, loading } = useCrypto();
    const crypto = data.find((item) => item.id === id);


    const chartData = crypto?.sparkline_in_7d.price.map((price: number, index: number) => {

      const day = Math.floor(index / 24) + 1;
      return {
        day: `Day ${day}`,
        price,
      };
    });

  if (loading) {
    return <Spinner />
  }

  if (!crypto) {
    return <div>No cryptocurrency found: <b className="text-red-500">{error}</b></div>;
  }

  return (
  <div className="container mx-auto mt-10">
    <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 p-4">
          <div className="border border-gray-200 p-4">
            <label className="block font-semibold">{crypto.name}</label>
            <p className="mb-4">{crypto.symbol.toUpperCase()}</p>
            <p>{crypto.current_price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 2, 
                })}</p>
            <img src={crypto.image} alt={crypto.name} width={40} />
          </div>
          <div className="flex flex-col items-center">
            
            <Link to="/" className="text-blue-600 underline mt-2">
              Back to home
            </Link>
          </div>
          </div>
          <div className="w-full p-4">
              <div className="h-[300px]"> 
                <h2>Price Variation from Last 7 Days</h2>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} />
                    <XAxis dataKey="day" interval={23} />
                    <YAxis />
                    <Tooltip formatter={(value) => value.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                        maximumFractionDigits: 2,
                    })} />
                    <Legend />
                  </LineChart>
                </ResponsiveContainer>
              </div>
          </div>
      </div>
    </div>

  );
}
export default CryptoDetailsPage;