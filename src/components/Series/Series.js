import React from 'react';
import './Series.css';
import Logo from '../Assets/missing.jpg';
import Navigation from '../Navigation/Navigation';
import shaka from 'shaka-player';

class Series extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      series_id: [props], 
      series_info: [],
      series_image: '',
      series_title: '',
      series_bg: '',
      series_description: '',
      series_metadata: '',
      loaded: 0,
      showComponent: false,
    }
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() { 
    const response = await fetch(`https://api.themoviedb.org/3/tv/${this.state.series_id[0].match.params.id}?api_key=526ca44fbbdbdd581bb4a6d9f1f87e15`);
    const json = await response.json();
    this.setState ({ series_info: json });
    if(`${json.poster_path}` !== "null") {
    	this.setState ({ series_image: `https://image.tmdb.org/t/p/w342${json.poster_path}` });
    } else {
    	this.setState ({ series_image: Logo });
    }
    this.setState ({ series_bg: json.backdrop_path });
    this.setState ({ series_title: json.name });
    this.setState ({ series_description: json.overview });
    this.setState ({ series_metadata: json.genres });
    this.setState ({ loaded: 1 });
    shaka.polyfill.installAll();
    this.initPlayer()
  }

	initPlayer(){
		var manifestUri = '//storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd';
		const video = document.getElementById('film_video');
		var player = new shaka.Player(video);
		window.player = player;
		player.addEventListener('error', this.onErrorEvent);
		player.load(manifestUri).then(function() {
			console.log('The video has now been loaded!');
		}).catch(this.onError); 
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
		    <div className="container">
		   	 	<Navigation/>
			    <div className="body">
			    	<div className="body2">
					    {
					    	this.state.loaded 
					    	? 
					    	<div className="info">
						    	<div className="title">
						    		<h1>{this.state.series_title}</h1>
						    	</div>
						    	<div className="description">
				    		  	<h2>Description</h2>
						    		<p>{this.state.series_description}</p>
				    			</div>
				    			<hr/>
				    			<div className="metadata">
				    			  <h2>Metadata</h2>
					    			  {
								    		this.state.series_metadata.map((value, index) => {
			        						return <p key={value.name}>{value.name}</p>
			      						})
							    		}
				    			</div>
				      		<button className="watch" onClick={this.handleClick}>
				        		Watch Movie
				      		</button>
			      		</div>
			    			:
			    			null
			    		}
					    <div className="picture">
								<video id="film_video"
								       width="640"
								     	 poster={`https://image.tmdb.org/t/p/w342${this.state.film_bg}`}
								       controls autoPlay>
			       		</video>
					    </div>
			    	</div>
			    </div>
		    </div>
	    </div>
	  );
	}
}

export default Series;