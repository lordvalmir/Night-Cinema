import React from "react";
import "./Series.css";
import Logo from "../../assets/missing.jpg";
import Navigation from "../Navigation/Navigation";
import { Link } from "react-router-dom";

class Series extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seriesData: [props],
      series: [],
      seriesImage: "",
      seriesBg: "",
      loaded: false
    };
  }

  async componentDidMount() {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${this.state.seriesData[0].match.params.id}?api_key=526ca44fbbdbdd581bb4a6d9f1f87e15&sort_by=popularity.desc`
    );
    const json = await response.json();
    this.setState({ series: json });

    if (json.poster_path) {
      this.setState({
        series_image: `https://image.tmdb.org/t/p/w342${json.poster_path}`
      });
    } else {
      this.setState({ series_image: Logo });
    }

    if (json.backdrop_path) {
      this.setState({
        series_bg: `https://image.tmdb.org/t/p/w342${json.backdrop_path}`
      });
    } else {
      this.setState({ series_bg: Logo });
    }

    this.setState({ series_watch: `/Watch/${json.id}` });

    this.setState({ loaded: true });
  }

  componentWillUnmount() {
    this.setState({ loaded: false });
  }

  render() {
    return (
      <div className="box">
        <div className="stars"> </div>
        <div className="twinkling"> </div>
        <div className="container">
          <Navigation />
          <div className="body">
            <div className="body2">
              {this.state.loaded ? (
                <div className="info">
                  <div className="title">
                    <h1>{this.state.series.name}</h1>
                  </div>
                  <div className="description">
                    <h2>Description</h2>
                    <p>{this.state.series.overview}</p>
                  </div>
                  <hr />
                  <div className="metadata">
                    <h2>Metadata</h2>
                    {this.state.series.genres.map(value => {
                      return <p key={value.name}>{value.name}</p>;
                    })}
                  </div>
                  <Link
                    className="title"
                    to={{
                      pathname: this.state.series_watch,
                      type: "Series",
                      backgraund: this.state.series_bg
                    }}
                  >
                    <button className="watch">Watch Movie</button>
                  </Link>
                </div>
              ) : null}
              <div className="picture">
                <img
                  src={this.state.series_image}
                  alt={this.state.series.name}
                  title={this.state.series.name}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Series;
