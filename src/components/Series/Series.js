import React from 'react';
import './Series.css';
import Logo from '../Assets/missing.jpg';
import Navigation from '../Navigation/Navigation';

class Series extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      series_id: [props], 
      series_info: [],
      series_image: '',
      series_title: '',
      series_description: '',
      series_metadata: '',
      loaded: 0,
      showComponent: false,
    }
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() { 
  	console.log(this.state.series_id[0].match.params.id)
    const response = await fetch(`https://api.themoviedb.org/3/tv/${this.state.series_id[0].match.params.id}?api_key=526ca44fbbdbdd581bb4a6d9f1f87e15`);
    const json = await response.json();
    this.setState ({ series_info: json });
    if(`${json.poster_path}` !== "null") {
    	this.setState ({ series_image: `https://image.tmdb.org/t/p/w342${json.poster_path}` });
    } else {
    	this.setState ({ series_image: Logo });
    }
    this.setState ({ series_title: json.title });
    this.setState ({ series_description: json.overview });
    this.setState ({ series_metadata: json });
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
		   	 	<Navigation/>
			    <div className="body">
			    	<div className="body2">
					    <div className="info">
						    <div className="title">
							    {
							    	this.state.loaded 
							    	? 
							    	<h1>{this.state.series_title}</h1>
							    	: 
							    	null
									}
						    </div>
					    	<div className="description">
					    		<h2>Description</h2>
							    {
							    	this.state.loaded 
							    	? 
							    	<p>{this.state.series_description}</p>
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
									    <img src={this.state.series_image} alt={this.state.series_info.title} title={this.state.series_info.title} /> 
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

export default Series;