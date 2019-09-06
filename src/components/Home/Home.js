import React from 'react';
import Navigation from '../Navigation/Navigation'
import FilmArray from '../FilmArray/FilmArray'
import './Home.css';

class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			popular_movies: [], 
			popular_series: [], 
			family: [], 
			documentary: [], 
			loaded: false,
		}
	}

	async componentDidMount() { 

		var response = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=526ca44fbbdbdd581bb4a6d9f1f87e15&sort_by=popularity.desc');
		var json = await response.json();
		this.setState ({ popular_movies: json })

		response = await fetch('https://api.themoviedb.org/3/discover/tv?api_key=526ca44fbbdbdd581bb4a6d9f1f87e15&sort_by=popularity.desc');
		json = await response.json();
		this.setState ({ popular_series: json })
		
		response = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=526ca44fbbdbdd581bb4a6d9f1f87e15&sort_by=popularity.desc&with_genres=10751');
		json = await response.json();
		this.setState ({ family: json })
		
		response = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=526ca44fbbdbdd581bb4a6d9f1f87e15&sort_by=popularity.desc&with_genres=99');
		json = await response.json();
		this.setState ({ documentary: json })

		this.setState ({ loaded: true })
	}

	render() {
		const { popular_movies, popular_series, family, documentary, loaded} = this.state;

		return(
			<div className='mainPageContainer'>
				<div className='stars'></div>
				<div className='twinkling'></div>
				<Navigation/>
				<div className='title'>
					<div className='wrap'>
						<h1>Night Cinema</h1>
					</div>
				</div>
				{
					loaded
					?
					<div className='films'>
						<div className='wrap'>
						
							<div className='film-title'>
								<h2> Popular movies </h2>
							</div>
							<div className='film'>
								<FilmArray data={popular_movies} type={'Film'}/>
							</div>

							<div className='film-title'>
								<h2> Popular series </h2>
							</div>
							<div className='film'>
								<FilmArray data={popular_series} type={'Series'}/>
							</div>

							<div className='film-title'>
								<h2> Family </h2>
							</div>
							<div className='film'>
								<FilmArray data={family} type={'Film'}/>
							</div>

							<div className='film-title'>
								<h2> Documentary </h2>
							</div>
							<div className='film'>
								<FilmArray data={documentary} type={'Film'}/>
							</div>

						</div>
					</div>
					: 
					null
				}
			</div>
		);
	}
}

export default Home;