import React from 'react';
import Logo from '../Assets/missing.jpg';
import Navigation from '../Navigation/Navigation';
import { Link } from 'react-router-dom';
import './Film.css';

class Film extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			film_data: [props], 
			film: [],
			film_image: '',
			film_bg: '',
			loaded: false,
		}
	}

	async componentDidMount() { 
		const response = await fetch(`https://api.themoviedb.org/3/movie/${this.state.film_data[0].match.params.id}?api_key=526ca44fbbdbdd581bb4a6d9f1f87e15&append_to_response=videos`);
		const json = await response.json();
		this.setState ({ film: json });
		console.log(json)
		if(json.poster_path) {
			this.setState ({ film_image: `https://image.tmdb.org/t/p/w342${json.poster_path}` });
		} else {
			this.setState ({ film_image: Logo });
		}

		if(json.backdrop_path) {
			this.setState ({ film_bg: `https://image.tmdb.org/t/p/w342${json.backdrop_path}` });
		} else {
			this.setState ({ film_bg: Logo });
		}

		this.setState ({ loaded: true });
	}

	componentWillUnmount(){
		this.setState ({ loaded: false });
	}

	render(){
		return(
			<div className='box'>
				<div className='stars'>	</div>
				<div className='twinkling'>	</div>
				<div className='container'>
					<Navigation/>
					<div className='body'>
						<div className='body2'>
							{
								this.state.loaded 
								? 
								<div className='info'>
									<div className='title'>
										<h1>{this.state.film.title}</h1>
									</div>
									<div className='description'>
										<h2>Description</h2>
										<p>{this.state.film.overview}</p>
									</div>
									<hr/>
									<div className='metadata'>
										<h2>Metadata</h2>
											{
												this.state.film.genres.map((value, index) => {
													return <p key={value.name}>{value.name}</p>
												})
											}
									</div>
									<Link className='title' to={{pathname: `/Watch/${this.state.film.id}`, type: 'Film', backgraund: this.state.film_bg}}>
										<button className='watch'>
											Watch Movie
										</button> 
									</Link>
								</div>
								: 
								null
							}
							<div className='picture'>
								<img src={this.state.film_image} alt={this.state.film.title} title={this.state.film.title} /> 
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Film;