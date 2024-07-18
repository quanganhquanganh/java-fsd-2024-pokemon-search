import React, { useState, useMemo, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Input,
} from "reactstrap";
import PokemonCard from "../components/PokemonCard";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store";
import { fetchPokemons } from "../store/pokemonSlice";
import { Pokemon } from "../types/pokemon";

const PokemonList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { pokemons, loading, error } = useSelector((state: RootState) => state.pokemon);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);
  
  const pokemonsPerPage = 12;

  const filteredPokemonList = useMemo(() => {
    if (!searchQuery.trim()) {
      return pokemons;
    }
    const lowerCaseQuery = searchQuery.toLowerCase();
    return pokemons.filter(
      (pokemon: Pokemon) =>
        pokemon.name.toLowerCase().includes(lowerCaseQuery)
    );
  }, [searchQuery, pokemons]);

  const totalPages = Math.ceil(filteredPokemonList.length / pokemonsPerPage);

  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = filteredPokemonList.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const renderPagination = () => {
    const paginationItems = [];
    const maxPagesToShow = 10;
    const halfWindow = Math.floor(maxPagesToShow / 2);

    let startPage = Math.max(1, currentPage - halfWindow);
    let endPage = Math.min(totalPages, currentPage + halfWindow);

    if (currentPage - halfWindow < 1) {
      endPage = Math.min(totalPages, endPage + (halfWindow - currentPage + 1));
    }

    if (currentPage + halfWindow > totalPages) {
      startPage = Math.max(
        1,
        startPage - (currentPage + halfWindow - totalPages)
      );
    }

    if (startPage > 1) {
      paginationItems.push(
        <PaginationItem key="1">
          <PaginationLink onClick={() => handleClick(1)}>1</PaginationLink>
        </PaginationItem>
      );
      if (startPage > 2) {
        paginationItems.push(
          <PaginationItem key="ellipsis1" disabled>
            <PaginationLink>...</PaginationLink>
          </PaginationItem>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      paginationItems.push(
        <PaginationItem active={i === currentPage} key={i}>
          <PaginationLink onClick={() => handleClick(i)}>{i}</PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        paginationItems.push(
          <PaginationItem key="ellipsis2" disabled>
            <PaginationLink>...</PaginationLink>
          </PaginationItem>
        );
      }
      paginationItems.push(
        <PaginationItem key={totalPages}>
          <PaginationLink onClick={() => handleClick(totalPages)}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return paginationItems;
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Input
              id="search"
              type="text"
              className="mt-4"
              placeholder="Search Porkemon..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Col>
        </Row>
        <Row>
          {currentPokemons.map((pokemon: Pokemon) => (
            <Col key={pokemon.id} sm="4">
              <PokemonCard pokemon={pokemon} />
            </Col>
          ))}
        </Row>
        <Row>
          <Col>
            <Pagination
              id="pagination"
              className="d-flex justify-content-center mt-4"
            >
              <PaginationItem disabled={currentPage <= 1}>
                <PaginationLink
                  id="previous"
                  onClick={() => handleClick(currentPage - 1)}
                  previous
                />
              </PaginationItem>
              {renderPagination()}
              <PaginationItem disabled={currentPage >= totalPages}>
                <PaginationLink
                  id="next"
                  onClick={() => handleClick(currentPage + 1)}
                  next
                />
              </PaginationItem>
            </Pagination>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PokemonList;