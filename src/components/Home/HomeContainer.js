import React from "react";
import Home from "./Home";

const HomeContainer = Component =>
  class extends React.Component {
    constructor() {
      super();
      this.state = {
        popular_movies: [],
        popular_series: [],
        family: [],
        documentary: [],
        loaded: false
      };
    }

    async componentDidMount() {
      let response = await fetch(
        "https://api.themoviedb.org/3/discover/movie?api_key=526ca44fbbdbdd581bb4a6d9f1f87e15&sort_by=popularity.desc"
      );
      let json = await response.json();
      this.setState({ popular_movies: json });

      response = await fetch(
        "https://api.themoviedb.org/3/discover/tv?api_key=526ca44fbbdbdd581bb4a6d9f1f87e15&sort_by=popularity.desc"
      );
      json = await response.json();
      this.setState({ popular_series: json });

      response = await fetch(
        "https://api.themoviedb.org/3/discover/movie?api_key=526ca44fbbdbdd581bb4a6d9f1f87e15&sort_by=popularity.desc&with_genres=10751"
      );
      json = await response.json();
      this.setState({ family: json });

      response = await fetch(
        "https://api.themoviedb.org/3/discover/movie?api_key=526ca44fbbdbdd581bb4a6d9f1f87e15&sort_by=popularity.desc&with_genres=99"
      );
      json = await response.json();
      this.setState({ documentary: json });

      this.setState({ loaded: true });
    }

    render() {
      const {
        popular_movies,
        popular_series,
        family,
        documentary,
        loaded
      } = this.state;
      return (
        <Component
          popular_movies={popular_movies}
          popular_series={popular_series}
          family={family}
          documentary={documentary}
          loaded={loaded}
        />
      );
    }
  };

export default HomeContainer(Home);
