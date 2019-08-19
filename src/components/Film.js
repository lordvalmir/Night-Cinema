import React from 'react';
import './Film.css';

class Film extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      film_id: [props], 
      film_info: [],
      film_image: '',
      film_title: '',
      film_description: '',
      film_metadata: '',
      loaded: 0,
    }
  }

  componentDidMount() { 
    // fetch popular films and save them into var
    console.log(`https://api.themoviedb.org/3/movie/${this.state.film_id[0].match.params.id}?api_key=526ca44fbbdbdd581bb4a6d9f1f87e15`);
    fetch(`https://api.themoviedb.org/3/movie/${this.state.film_id[0].match.params.id}?api_key=526ca44fbbdbdd581bb4a6d9f1f87e15`)
      .then(res => res.json())
      .then(json => {
        this.setState ({ film_info: json });
        this.setState ({ film_image: "http://image.tmdb.org/t/p/w342" + json.poster_path });
        this.setState ({ film_title: json.title });
        this.setState ({ film_description: json.overview });
        this.setState ({ film_metadata: json });
        this.setState ({ loaded: 1 });
      })
      .catch(console.log);

  }

	render(){
	  return(

	  	<div className="box">
	  	  <div className="stars">	</div>
        <div className="twinkling">	</div>
		    <div className="container">
			    <div className="body">
			    	<div className="body2">
					    <div className="info">
						    <div className="title">
							    {
							    	this.state.loaded 
							    	? 
							    	<h1>{this.state.film_title}</h1>
							    	: 
							    	null
									}
						    </div>
					    	<div className="description">
					    		<h2>Description</h2>
							    {
							    	this.state.loaded 
							    	? 
							    	<p>{this.state.film_description}</p>
							    	: 
							    	null
									}
									<hr/>
					    	</div>

					    	<div className="metadata">
					    		<h2>Metadata</h2>
					    	</div>
					    	<div className="play">
					    		<button className="watch" type="button">play</button>
					    	</div>
					    </div>
					    <div className="picture">
						    {
						    	this.state.loaded 
						    	? 
						    	<img src={this.state.film_image} alt={this.state.film_info.title} title={this.state.film_info.title} /> 
						    	: 
						    	null
								}
					    </div>
			    	</div>
			    </div>
		    </div>
	    </div>
	  );
	}
}

export default Film;