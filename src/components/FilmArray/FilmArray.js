import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/missing.jpg";
import "./FilmArray.css";

const createLink = (film, type, picture) => {
  return (
    <Link key={film.id} to={`/${type}/${film.id}`}>
      <img
        src={picture}
        key={film.id}
        alt={film.title}
        title={film.title}
        height="120px"
        width="100px"
      />
    </Link>
  );
};

const createfilm = (data, type) => {
  return (
    <ul>
      {data.data.results.map((film, index) => {
        var picture = `https://image.tmdb.org/t/p/w342${film.poster_path}`;
        if (data.type === "Film") {
          if (film.poster_path) {
            return createLink(film, data.type, picture);
          } else {
            return createLink(film, data.type, Logo);
          }
        } else {
          if (film.poster_path) {
            return createLink(film, data.type, picture);
          } else {
            return createLink(film, data.type, Logo);
          }
        }
      })}
    </ul>
  );
};

class FilmArray extends React.PureComponent {
  constructor(film) {
    super();
    this.state = {
      movies: film
    };
  }

  render() {
    return <div className="film-border">{createfilm(this.state.movies)}</div>;
  }
}

export default FilmArray;
