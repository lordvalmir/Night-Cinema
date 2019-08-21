import React from 'react';
import './Home.css';
import logo from './missing.jpg';
import { Link } from "react-router-dom";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      popular_movies: [], popular_movies_image: [], popular_movies_loaded: 0,
      popular_series: [], popular_series_image: [], popular_series_loaded: 0,
      family: [], family_image: [], family_loaded: 0,
      documentary: [], documentary_image: [], documentary_loaded: 0,
    }
  }

  componentDidMount() { 
    // fetch popular films and save them into var
    fetch('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc/550?api_key=526ca44fbbdbdd581bb4a6d9f1f87e15')
      .then(res => res.json())
      .then(json => {
        this.setState ({ popular_movies: json })
        this.setState ({ popular_movies_image: this.state.popular_movies.results.map(image =>
          {
            if(image.poster_path !== null) {
              return ("https://image.tmdb.org/t/p/w342" +  image.poster_path) 
            } else {
              return ("missing.jpg")
            }
          })
        })
        this.setState ({ popular_movies_loaded: 1 })
      })
      .catch(console.log);

    // fetch popular serials and save them into var
    fetch('https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc/550?api_key=526ca44fbbdbdd581bb4a6d9f1f87e15')
      .then(res => res.json())
      .then(json => {
        this.setState ({ popular_series: json })
        this.setState ({ popular_series_image: this.state.popular_series.results.map(image =>
          {
            if(image.poster_path !== null) {
              return ("https://image.tmdb.org/t/p/w342" +  image.poster_path) 
            } else {
              return ("missing.jpg")
            }
          })
        })
        this.setState ({ popular_series_loaded: 1 })
      })
      .catch(console.log);
    
    // fetch famyli films and save them into var
    fetch('https://api.themoviedb.org/3/discover/movie?with_genres=10751')
      .then(res => res.json())
      .then(json => {
        this.setState ({ family: json })
        this.setState ({ family_image: this.state.family.results.map(image =>
          {
            if(image.poster_path !== null) {
              return ("https://image.tmdb.org/t/p/w342" +  image.poster_path) 
            } else {
              return ("missing.jpg")
            }
          })
        })
        this.setState ({ family_loaded: 1 })
      })
      .catch(console.log);
    
    // fetch documentary films and save them into var
    fetch('https://api.themoviedb.org/3/discover/movie?with_genres=99')
      .then(res => res.json())
      .then(json => {
        this.setState ({ documentary: json })
        this.setState ({ documentary_image: this.state.documentary.results.map(image =>
          {
            if(image.poster_path !== null) {
              return ("https://image.tmdb.org/t/p/w342" +  image.poster_path) 
            } else {
              return ("missing.jpg")
            }
          })
        })
        this.setState ({ documentary_loaded: 1 })
      })
      .catch(console.log);
  }

  createFilm = ( informations, images ) => {
    return (
      <ul>
        { 
          images.map((value, index) => {
            if(value !== "missing.jpg") {
              return <Link to={`/Film/${informations.results[index].id.toString()}` }>
                       <img className="img-contend" 
                           src={value} 
                           key={informations.results[index].id} 
                           alt={informations.results[index].title} 
                           title={informations.results[index].title} 
                           height="120" 
                           width="100px"
                       />
                    </Link>
            } else {
              return <Link to={`/Film/${informations.results[index].id}`}>
                       <img className="img-contend" 
                          src={logo} 
                          key={informations.results[index].id} 
                          alt={informations.results[index].title} 
                          title={informations.results[index].title} 
                          height="120" 
                          width="100px"
                       />
                     </Link>
            }
          })
        }
      </ul>
    )
  }

  render() {
    const { popular_movies, popular_series, popular_movies_image, popular_series_image} = this.state;
    const { family, family_image, documentary, documentary_image} = this.state;
    const { popular_movies_loaded, popular_series_loaded, family_loaded, documentary_loaded} = this.state;

    return(
      <div className="Container">
        <div className="stars"></div>
        <div className="twinkling"></div>
        <div className="Title">
          <h1> Night Cinema </h1>
        </div>
        <div className='Search'>
          <Link to="/Search"><h1>Search</h1></Link>
        </div>
        <div className="films">
          <div className="film-title">
            <h2> Popular movies </h2>
          </div>
          <div className="film">
            { popular_movies_loaded ? this.createFilm( popular_movies, popular_movies_image) : "loading . . ." }
          </div>
            <div className="film-title">
              <h2> Popular series </h2>
            </div>
          <div className="film">
            { popular_series_loaded ? this.createFilm( popular_series, popular_series_image) : "loading . . ." }
          </div>
          <div className="film-title">
            <h2> Family </h2>
          </div>
          <div className="film">
            { family_loaded ? this.createFilm( family, family_image) : "loading . . ." }
          </div>
          <div className="film-title">
            <h2> Documentary </h2>
          </div>
          <div className="film">
            { documentary_loaded ? this.createFilm( documentary, documentary_image) : "loading . . ." }
          </div>
        </div>
      </div>
    );
  }
}

export default Home;