
interface SearchProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

function Search({ searchTerm, setSearchTerm }: SearchProps) {

  return (
    <div>
      <input type="text" className="border border-gray-300 rounded-md p-2 min-w-[300px]"  name="search" placeholder="Search by Name or Symbol" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
    </div>
  );
}
export default Search;
