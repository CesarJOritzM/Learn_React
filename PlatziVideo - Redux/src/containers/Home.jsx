import React from "react";
import { connect } from "react-redux";

import Header from "../components/Header";
import Search from "../components/Search";
import Categories from "../components/Categories";
import Carousel from "../components/Carousel";
import CarouselItem from "../components/CarouselItem";

import "../assets/styles/App.scss";

const Home = ({ myList, trends, originals, search, searchResults }) => {
  const isSearch = search.length > 0;
  return isSearch ? (
    <>
      <Header />
      <Search />
      {Object.keys(searchResults).length > 0 ? (
        <Categories title="Resultado de busqueda ">
          <Carousel>
            {searchResults.map((item) => (
              <CarouselItem key={item.id} {...item} />
            ))}
          </Carousel>
        </Categories>
      ) : (
        <h2 className="Results">No se encotraron resultados </h2>
      )}
    </>
  ) : (
    <>
      <Header />
      <Search />
      {myList.length > 0 && (
        <Categories title="Mi Lista">
          <Carousel>
            {myList.map((item) => (
              <CarouselItem key={item.id} {...item} isList />
            ))}
          </Carousel>
        </Categories>
      )}
      <Categories title="Tendencias">
        <Carousel>
          {trends.map((item) => (
            <CarouselItem key={item.id} {...item} />
          ))}
        </Carousel>
      </Categories>
      <Categories title="Originales de Platzi video">
        <Carousel>
          {originals.map((item) => (
            <CarouselItem key={item.id} {...item} />
          ))}
        </Carousel>
      </Categories>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    myList: state.myList,
    trends: state.trends,
    originals: state.originals,
    searchResults: state.searchResults,
    search: state.search,
  };
};

export default connect(mapStateToProps, null)(Home);
