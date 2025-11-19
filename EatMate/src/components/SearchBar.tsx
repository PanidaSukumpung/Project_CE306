import Button from "./Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const SearchBar = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!keyword.trim()) return;

    if (!location.pathname.startsWith("/explore")) {
      navigate(`/explore?search=${encodeURIComponent(keyword.trim())}`);
    } else {
      navigate(`/explore?search=${encodeURIComponent(keyword.trim())}`);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="space-x-4 bg-white p-2 shadow-md rounded-md w-full  flex"
    >
      <input
        type="text"
        name="search"
        placeholder="Search"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="p-1 rounded-2xl ring-2 ring-red-300 pl-2 w-full focus:outline-none focus:ring-2 focus:ring-red-600 "
      />
      <Button>Search</Button>
    </form>
  );
};

export default SearchBar;
