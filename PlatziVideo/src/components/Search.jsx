import React from "react";
import { connect } from "react-redux";
import { search,searchRequest } from "../actions"

import "../assets/styles/components/Search.scss";

const Search = (props) => {
  const handleChange = (event) => {
    if (event.target.value.length > 0) {
      props.searchRequest(event.target.value);
    }else{
      props.searchRequest("")
    }
  };
  return (
    <section className="main">
      <h2 className="main__title">¿Qué quieres ver hoy?</h2>
      <input
        name="Search"
        type="text"
        className="input"
        placeholder="Buscar..."
        onChange={handleChange}
      />
    </section>
  );
};
const mapStateToProps = (state) => {
  return {
    search: state.search,
    searchResults: state.searchResults,
  };
};
const mapDispatchToProps = {
  searchRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
