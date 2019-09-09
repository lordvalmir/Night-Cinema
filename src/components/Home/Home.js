import React from "react";
import Navigation from "../Navigation/Navigation";
import FilmArray from "../FilmArray/FilmArray";
import "./Home.css";

class Home extends React.Component {
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

  renderFilms = () => {
    const {
      popular_movies,
      popular_series,
      family,
      documentary,
      loaded
    } = this.props;
    if (!loaded) return null;

    return (
      <div className="films">
        <div className="wrap">
          <div className="film-title">
            <h2> Popular movies </h2>
          </div>
          <div className="film">
            <FilmArray data={popular_movies} type={"Film"} />
          </div>

          <div className="film-title">
            <h2> Popular series </h2>
          </div>
          <div className="film">
            <FilmArray data={popular_series} type={"Series"} />
          </div>

          <div className="film-title">
            <h2> Family </h2>
          </div>
          <div className="film">
            <FilmArray data={family} type={"Film"} />
          </div>

          <div className="film-title">
            <h2> Documentary </h2>
          </div>
          <div className="film">
            <FilmArray data={documentary} type={"Film"} />
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="mainPageContainer">
        <div className="stars"></div>
        <div className="twinkling"></div>
        <Navigation />
        <div className="title">
          <div className="wrap">
            <h1>Night Cinema</h1>
          </div>
        </div>
        {this.renderFilms()}
      </div>
    );
  }
}

export default Home;
