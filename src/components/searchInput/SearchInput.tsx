import React, { useState } from "react";
import "./SearchInput.scss";

import searchIcon from "../../assets/images/navbar/search_icon.svg";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Called when the search button is clicked or Enter is pressed */
  onSearch?: (value: string) => void;
  /** Optional placeholder text */
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  placeholder = "Search for anything",
  ...rest
}) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (onSearch) onSearch(query.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-input">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="search-input__field"
        placeholder={placeholder}
        {...rest}
      />
      <button
        type="button"
        className="search-input__button"
        onClick={handleSearch}
      >
        <div>
          <img src={searchIcon} alt="search_icon" />
        </div>
      </button>
    </div>
  );
};

export default SearchInput;
