import Button from "./Button"
const SearchBar = () => {
    return(
        <form className="space-x-4 bg-white p-2 shadow-md rounded-md w-full  flex">
            <input 
            type="text" 
            name ="search"
            placeholder="Search"
            className="p-1 rounded-2xl ring-2 ring-red-300 pl-2 w-full focus:outline-none focus:ring-2 focus:ring-red-600 "
            />
            <Button>Search</Button>
        </form>
    )
}

export default SearchBar