import { Link, useParams } from "react-router-dom";
import Spinner from "../components/spinner/Spinner";
import { useCrypto } from "../context/useCrypto";
import { LineChart, Line, XAxis, YAxis, Legend, CartesianGrid, ResponsiveContainer, Tooltip, Area, AreaChart } from 'recharts';

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
  <div className="container mx-auto md:mt-10">
    <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 p-4 border-r border-gray-200">
            <div className="mt-3">
              <Link to="/" className="text-blue-600 text-sm">
                Back to List
              </Link>
            </div>
            <div className="flex flex-row items-center mb-4 mt-4 gap-2">
              <img src={crypto.image} alt={crypto.name} width={30} />
              <label className="block font-semibold">{crypto.name}</label>
              <label className="text-sm  text-gray-400">{crypto.symbol.toUpperCase()}</label>
            </div>
            <div className="flex flex-col ml-10 text-2xl">
              <p>{crypto.current_price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 2, 
                  })}{" "}USD
              </p>
              <div className={`mt-4 text-lg ${crypto.price_change_percentage_24h < 0 ? 'text-red-500' : 'text-green-500'}` }>
                {crypto.price_change_percentage_24h < 0 ? "↓" : "↑"}{" "}
                {Math.abs(crypto.price_change_percentage_24h).toFixed(1)}%
              </div>
            </div>          
          </div>
          <div className="w-full p-4">
              <div className="h-[300px]"> 
                <h2 className="text-lg font-semibold p-4">Price Variation from Last 7 Days</h2>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#e44141ff" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <Area type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2}  fill="url(#colorPrice)" />
                    <XAxis dataKey="day" interval={23} />
                    <YAxis />
                    <Tooltip formatter={(value) => value.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                        maximumFractionDigits: 2,
                    })} />
                    <Legend />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
          </div>
      </div>
    </div>

  );
}
export default CryptoDetailsPage;