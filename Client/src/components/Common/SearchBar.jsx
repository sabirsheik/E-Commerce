

import { useState } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";

const SearchBar = () => {
  const [searchItem, setSearchItem] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSearchToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search for:", searchItem);
    setIsOpen(false);
  };

  return (
    <div
      className={`flex items-center justify-center w-full overflow-x-hidden transition-all duration-300 ${
        isOpen ? "absolute top-0 left-0 w-full bg-white h-24 z-50" : "w-auto"
      }    `}
    >
      {isOpen ? (
        <form
          onSubmit={handleSearch}
          className="relative flex items-center justify-between w-3/4 sm:w-2/3 mx-auto"
        >
          <button
            type="button"
            onClick={handleSearchToggle}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-e-hover transition-all duration-200"
          >
            <HiMiniXMark className="h-7 w-7" />
          </button>
          <div className="relative w-full">
            <input
              type="text"
              value={searchItem}
              placeholder="Search for products..."
              onChange={(e) => setSearchItem(e.target.value)}
              className="bg-white text-gray-800 placeholder-gray-500 px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-black w-full transition duration-300 ease-in-out shadow-lg"
            />
            <button
              type="submit"
              className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-e-hover transition-all duration-200"
            >
              <HiMagnifyingGlass className="h-7 w-7 " />
            </button>
          </div>
          {/* Close Button  */}
          <button
            type="button"
            onClick={handleSearchToggle}
            className="absolute -left-12 top-[22px] transform -translate-y-1/2 text-e-black hover:text-[#ff1414] transition-all "
          >
            <HiMiniXMark className="h-8 w-8" onClick={handleSearchToggle} />
          </button>
        </form>
      ) : (
        <button
          onClick={handleSearchToggle}
          className=" text-e-black hover:text-e-hover transition-all duration-300 ease-in-out shadow-lg"
        >
          <HiMagnifyingGlass className="h-7 w-7" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
