import { useState } from "react";
import Search from "../components/Search/Search"
import Table from "../components/table/Table";
import { Link } from "react-router-dom";

function Dashboard() {

  const [searchTerm, setSearchTerm] = useState("");
      
  return (
    <div className="container mx-auto mt-10">
      <div className="flex justify-between mb-4">
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Link to="/favorites" className="bg-blue-500 text-white px-4 py-2 rounded-md flex">
          Favorites
        </Link>
      </div>
      <Table searchTerm={searchTerm} />
    </div>
  )
}

export default Dashboard