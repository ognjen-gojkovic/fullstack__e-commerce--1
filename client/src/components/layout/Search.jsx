import React from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
      setKeyword("");
    } else navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          id="search_field"
          className="form-control"
          placeholder="Enter Product Name ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <div className="input-group-append">
          <button type="submit" id="search_btn" className="btn">
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </form>
  );
};

export default Search;
