import React, { Component } from "react";
import CardList from "./components/CardList";
import { SearchBox } from "./components/SearchBox";
import "./App.css";
import { MDBContainer } from "mdb-react-ui-kit";

class App extends Component {
  constructor() {
    super();

    this.state = {
      pokemons: [],
      search: "",
      next: "",
      prev: "",
      url: "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20",
    };

    this.handleClickPrev = this.handleClickPrev.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
    this.handleFetch = this.handleFetch.bind(this);
  }

  handleClickNext() {
    this.setState({ url: this.state.next });
    console.log("1");
    this.handleFetch();
  }

  handleClickPrev() {
    this.setState({ url: this.state.prev });
    console.log("1");
    this.handleFetch();
  }

  componentDidMount() {
    this.handleFetch();
  }

  handleFetch = () => {
    fetch(this.state.url)
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          pokemons: data.results,
          next: data.next,
          prev: data.previous,
        })
      );
  };

  handleChange = (e) => {
    this.setState({ search: e.target.value });
  };

  render() {
    const { pokemons, search } = this.state;
    const fileteredPokemons = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
      <MDBContainer>
        <h1>Pokedox</h1>
        <SearchBox
          placeholder="Search Pokemon"
          handleChange={this.handleChange}
        />
        <CardList pokemons={fileteredPokemons}></CardList>
        {this.state.prev !== null && (
          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button class="btn btn-primary me-md-2" type="button">
              Prev
            </button>
          </div>
        )}
        {this.state.next !== undefined && (
          <button
            onClick={this.handleClickNext}
            type="button"
            class="btn btn-primary"
            className="btn btn-primary"
            type="button"
          >
            Next
          </button>
        )}
      </MDBContainer>
    );
  }
}

export default App;
