import React from 'react';
import Navigation from '../Navigation/Navigation'
import FilmArray from '../FilmArray/FilmArray'
import './Home.css';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      popular_movies: [], popular_movies_image: [], popular_movies_loaded: false,
      popular_series: [], popular_series_image: [], popular_series_loaded: false,
      family: [], family_image: [], family_loaded: false,
      documentary: [], documentary_image: [], documentary_loaded: false,
    }
  }

  async componentDidMount() { 
    // fetch popular films and save them into var
    
    const response1 = await fetch('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc/550?api_key=526ca44fbbdbdd581bb4a6d9f1f87e15');
    const json1 = await response1.json();
    this.setState ({ popular_movies: json1 })
    this.setState ({ popular_movies_image: this.state.popular_movies.results.map(image => {
        if(image !== null){
          if(image.poster_path !== null) {
            return (`https://image.tmdb.org/t/p/w342${image.poster_path}`) 
          } else {
            return ("missing.jpg")
          }
        } else {
          return null
        }
      })
    })
    this.setState ({ popular_movies_loaded: true })

    // fetch popular serials and save them into var
    const response2 = await fetch('https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc/550?api_key=526ca44fbbdbdd581bb4a6d9f1f87e15');
    const json2 = await response2.json();
    this.setState ({ popular_series: json2 })
    this.setState ({ popular_series_image: this.state.popular_series.results.map(image => {
        if(image.poster_path !== null) {
          return (`https://image.tmdb.org/t/p/w342${image.poster_path}`) 
        } else {
          return ("missing.jpg")
        }
      })
    })
    this.setState ({ popular_series_loaded: true })
    
    // fetch famyli films and save them into var
    const response3 = await fetch('https://api.themoviedb.org/3/discover/movie?with_genres=10751');
    const json3 = await response3.json();
    this.setState ({ family: json3 })
    this.setState ({ family_image: this.state.family.results.map(image => {
        if(image.poster_path !== null) {
          return (`https://image.tmdb.org/t/p/w342${image.poster_path}`) 
        } else {
          return ("missing.jpg")
        }
      })
    })
    this.setState ({ family_loaded: true })
    
    // fetch documentary films and save them into var
    const response4 = await fetch('https://api.themoviedb.org/3/discover/movie?with_genres=99');
    const json4 = await response4.json();
    this.setState ({ documentary: json4 })
    this.setState ({ documentary_image: this.state.documentary.results.map(image => {
        if(image.poster_path !== null) {
          return (`https://image.tmdb.org/t/p/w342${image.poster_path}`) 
        } else {
          return ("missing.jpg")
        }
      })
    })
    this.setState ({ documentary_loaded: true })
  }

  render() {
    const { popular_movies, popular_series, popular_movies_image, popular_series_image} = this.state;
    const { family, family_image, documentary, documentary_image} = this.state;
    const { popular_movies_loaded, popular_series_loaded, family_loaded, documentary_loaded} = this.state;

    return(
      <div className="Container">
        <div className="stars"></div>
        <div className="twinkling"></div>
        <Navigation/>
        <div className="Title">
          <div className="wrap">
            <h1>Night Cinema</h1>
          </div>
        </div>
        <div className="films">
          <div className="wrap">
            <div className="film-title">
              <h2> Popular movies </h2>
            </div>
            <div className="film">
              { popular_movies_loaded ? <FilmArray informations={popular_movies} images={popular_movies_image} film={'Film'}/> : null }
            </div>
          </div>
          <div className="wrap">
            <div className="film-title">
              <h2> Popular series </h2>
            </div>
            <div className="film">
              { popular_series_loaded ? <FilmArray informations={popular_series} images={popular_series_image} film={'Series'}/> : null }
            </div>
          </div>
          <div className="wrap">
            <div className="film-title">
              <h2> Family </h2>
            </div>
            <div className="film">
              { family_loaded ? <FilmArray informations={family} images={family_image} film={'Film'}/> : null }
            </div>
          </div>
          <div className="wrap">
            <div className="film-title">
              <h2> Documentary </h2>
            </div>
            <div className="film">
              { documentary_loaded ? <FilmArray informations={documentary} images={documentary_image} film={'Film'}/> : null }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;