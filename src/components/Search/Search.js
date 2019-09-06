import React from 'react';
import Navigation from '../Navigation/Navigation'
import './Search.css';
import { Link } from 'react-router-dom';
import Logo from '../Assets/missing.jpg';

const createfilm = (props) => {
	return (
		<div className='Search_results'>
			{ 
				props
				?
				<h2>Search results</h2>
				:
				null
			}
			<ul>	
			{
				props.results.map((value, index) => {
					if(index < 8) {
						if(value.poster_path !== null) {
							return <Link key={value.id} to={`/Film/${value.id}` }>
										 <img className='img-contend' 
													 src={`https://image.tmdb.org/t/p/w342${value.poster_path}`} 
													 key={value.id} 
													 alt={value.title} 
													 title={value.title} 
													 height='120' 
													 width='100px'
											/>
											</Link>
						} else {
							return <Link key={value.id} to={`/Film/${value.id}`}>
										 <img className='img-contend' 
													 src={Logo} 
													 key={value.id} 
													 alt={value.title} 
													 title={value.title} 
													 height='120' 
													 width='100px'
										 />
										 </Link>
						}
					} else {
						return null
					}
				})
			}
			</ul>
		</div>
	)
}

class Search extends React.PureComponent {
	constructor(){
		super();
		this.state = {
			input: '',
			film: [],
			film_loaded: false,
		}
	}

	async getvalue(){
		if(!this.state.input){
			return;
		}
		const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=526ca44fbbdbdd581bb4a6d9f1f87e15&query=${this.state.input}`);
		const json = await response.json();
		this.setState ({ film: json })
		this.setState ({ film_loaded: true })
	}

	submitHandler = (e) => {
		e.preventDefault();
		this.getvalue();
	}

	changeHandler = (e) => { 
		this.setState({ [e.target.name]: e.target.value })
	}

	render(){
		return(
			<div className='searchContainer'>
				<div className='stars'></div>
				<div className='twinkling'></div>
				<Navigation/>
				<div className='title'>
					<div className='wrapSearch'>
						<h1>Search</h1>
					</div>
				</div>
				<div className='search'>
						<div className='search-box'>
							<form onSubmit={this.submitHandler}>
								<label htmlFor='username'></label>
								<input name='input' value={this.state.input} onChange={this.changeHandler} placeholder='Search for...'/>
								<div className='search-button'>
									<button type='submit'>Search!</button>
								</div>
							</form>
					</div>
				</div>
				<div className='films2'>
					<div className='film2'>
						{
							this.state.film_loaded
							?
							createfilm(this.state.film)
							:
							null
						}
					</div>
				</div>
		 </div>
		)
	}
}

export default Search;