import React from 'react';
import './Film.css';
import Logo from '../Assets/missing.jpg';

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
      showComponent: false,
    }
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() { 
    const response = await fetch(`https://api.themoviedb.org/3/movie/${this.state.film_id[0].match.params.id}?api_key=526ca44fbbdbdd581bb4a6d9f1f87e15`);
    const json = await response.json();
    this.setState ({ film_info: json });
    if(`${json.poster_path}` !== "null") {
    	this.setState ({ film_image: `https://image.tmdb.org/t/p/w342${json.poster_path}` });
    } else {
    	this.setState ({ film_image: Logo });
    }
    this.setState ({ film_title: json.title });
    this.setState ({ film_description: json.overview });
    this.setState ({ film_metadata: json });
    this.setState ({ loaded: 1 });
  }

  handleClick() {
  	if(this.state.showComponent === false){
	    this.setState({
	      showComponent: true,
	    });
	   } else {
	    this.setState({
	      showComponent: false,
	    });
	   }


  }

	render(){
	  return(
	  	<div className="box">
	  	  <div className="stars">	</div>
        <div className="twinkling">	</div>
		    <script src="dist/shaka-player.compiled.js"></script>
		    <script src="myapp.js"></script>
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
					      <button className="watch" onClick={this.handleClick}>
					        Watch Movie
					      </button>
					    </div>
					    <div className="picture">
						    {
						    	this.state.showComponent 
						    	?
						    	null
						    	:
							  	<div> 
								  	{
									   	this.state.loaded 
									    ? 
									    <img src={this.state.film_image} alt={this.state.film_info.title} title={this.state.film_info.title} height="400px"/> 
									    : 
									    null
									  } 
								  </div>
									}
					      {
					      	this.state.showComponent 
					        ?
					        <div>
										<video id="video"
										       width="640"
										       poster="//shaka-player-demo.appspot.com/assets/poster.jpg"
										       controls autoPlay>
										</video>
									</div>
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